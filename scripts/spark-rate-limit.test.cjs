const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Exercise the real TS modules with controlled HTTP, clock and Next boundaries.
function load(file, modules = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, {
    exports, require: name => name === 'server-only' ? {} : modules[name] ?? require(name),
    Response, URL, Error, console: { error() {}, warn() {}, info() {} }, process, ...globals,
  });
  return exports;
}

function limiter(fetcher, now = () => Date.now()) {
  class Clock extends Date { static now() { return now(); } }
  return load('src/lib/spark-rate-limit.ts', {}, { fetch: fetcher, Date: Clock });
}

test('429 pauses all endpoints for the account until Retry-After expires', async () => {
  let calls = 0, clock = 1_000_000;
  const api = limiter(async () => ++calls === 1
    ? new Response('', { status: 429, headers: { 'Retry-After': '120' } })
    : Response.json({ ok: true }), () => clock);
  await assert.rejects(api.fetchWithSparkBackoff('https://spark.test/active', {}, 'account'), /120 seconds/);
  await assert.rejects(api.fetchWithSparkBackoff('https://spark.test/rental', {}, 'account'), /429/);
  assert.equal(calls, 1);
  assert.equal(api.getSparkRetryAfterSeconds(), 120);
  clock += 120_001;
  assert.equal((await api.fetchWithSparkBackoff('https://spark.test/active', {}, 'account')).status, 200);
  assert.equal(calls, 2);
});

test('HTTP-date Retry-After is honored and other accounts remain independent', async () => {
  let calls = 0;
  const clock = 1_000_000;
  const api = limiter(async () => ++calls === 1
    ? new Response('', { status: 429, headers: { 'Retry-After': new Date(clock + 90_000).toUTCString() } })
    : Response.json({ ok: true }), () => clock);
  await assert.rejects(api.fetchWithSparkBackoff('https://spark.test/a', {}, 'a'), /90 seconds/);
  assert.equal((await api.fetchWithSparkBackoff('https://spark.test/a', {}, 'b')).status, 200);
});

test('missing or malformed Retry-After uses a cooldown rather than a retry loop', async () => {
  for (const value of ['', 'invalid']) {
    let calls = 0;
    const api = limiter(async () => { calls++; return new Response('', { status: 429, headers: { 'Retry-After': value } }); });
    await assert.rejects(api.fetchWithSparkBackoff('https://spark.test/a', {}, 'a'), /60 seconds/);
    await assert.rejects(api.fetchWithSparkBackoff('https://spark.test/a', {}, 'a'), /429/);
    assert.equal(calls, 1);
  }
});

test('concurrent identical requests share one fetch with separately readable bodies', async () => {
  let calls = 0, release;
  const wait = new Promise(resolve => release = resolve);
  const api = limiter(async () => { calls++; await wait; return Response.json({ id: 'listing' }); });
  const a = api.fetchWithSparkBackoff('https://spark.test/a', {}, 'a');
  const b = api.fetchWithSparkBackoff('https://spark.test/a', {}, 'a');
  release();
  const responses = await Promise.all([a, b]);
  assert.equal(calls, 1);
  for (const response of responses) assert.deepEqual(await response.json(), { id: 'listing' });
});

function listingsModule(spark) {
  return load('src/services/listings.service.ts', {
    react: { cache: fn => fn },
    '@/config': { hasSparkAccessToken: () => true, getMslFeedUrl: () => '', getSparkListingsPageSize: () => 25 },
    '@/services/spark.service': spark,
    '@/services/msl.service': {},
    '@/lib/spark-rate-limit': { SparkRateLimitError: class SparkRateLimitError extends Error {} },
  });
}

test('map rejects demo fallbacks but accepts a legitimate empty inventory', async () => {
  const outage = listingsModule({ fetchAllActiveSparkPropertyCards: async () => { throw Error('429'); } });
  await assert.rejects(outage.fetchVerifiedMapPropertyCards('active'), /temporarily unavailable/);
  const empty = listingsModule({ fetchAllActiveSparkPropertyCards: async () => [] });
  assert.equal((await empty.fetchVerifiedMapPropertyCards('active')).length, 0);
});

test('paged rate limit does not trigger another full inventory scan', async () => {
  let scans = 0;
  const api = listingsModule({
    fetchActiveSparkPropertyCardsPage: async () => { throw Error('Collection request failed (429)'); },
    fetchAllActiveSparkPropertyCards: async () => { scans++; return []; },
  });
  await api.fetchActivePropertyCardsPage(1);
  assert.equal(scans, 0);
});

test('map serves partial real inventory and rejects total outages', async () => {
  let down = false;
  const api = load('src/lib/map-listings-cache.ts', {
    'next/cache': { unstable_cache: fn => fn },
    '@/lib/properties': { resolvePropertyListingType: () => 'active' },
    '@/services/listings.service': { fetchVerifiedMapPropertyCards: async target => {
      if (down || target === 'active') throw Error('upstream unavailable');
      return [{ id: 'company', routeId: 'company', sparkSource: 'my' }];
    } },
  });
  const result = await api.getMapListingsForInitialLoad('active');
  assert.equal(result.partial, true);
  assert.equal(result.properties[0].id, 'company');
  down = true;
  await assert.rejects(api.getMapListingsForInitialLoad('active'), /temporarily unavailable/);
});

test('successful listing pages are reused across module loads and expired errors preserve real data', async () => {
  const entries = new Map();
  let calls = 0, fail = false, now = 0;
  const modules = {
    'next/cache': { unstable_cache: (fn, parts) => async (...args) => {
      const key = JSON.stringify([parts, args]);
      const saved = entries.get(key);
      if (saved && now - saved.at < 3_600_000) return saved.value;
      try {
        const value = await fn(...args);
        entries.set(key, { at: now, value });
        return value;
      } catch (error) {
        if (saved) return saved.value;
        throw error;
      }
    } },
    '@/config': {
      getSparkAccessToken: () => 'test-account', getSparkApiBaseUrl: () => 'https://spark.test',
      getSparkListingsPath: () => '/v1/listings', getSparkActiveListingsFilter: () => 'active',
      getSparkListingsPageSize: () => 25,
    },
    '@/lib/spark-rate-limit': { fetchWithSparkBackoff: async () => {
      calls++;
      if (fail) throw Error('upstream 429');
      return Response.json({ D: { Results: [{ Id: 'real-listing', StandardFields: { ListPrice: 250000, City: 'El Paso' } }], Pagination: { TotalPages: 1, TotalRows: 1 } } });
    } },
  };
  const first = await load('src/services/spark.service.ts', modules).fetchAllActiveSparkPropertyCards();
  assert.equal(first.length, 1);
  await load('src/services/spark.service.ts', modules).fetchAllActiveSparkPropertyCards();
  assert.equal(calls, 1, 'cached page reused by a new module instance');
  fail = true; now += 3_600_001;
  const stale = await load('src/services/spark.service.ts', modules).fetchAllActiveSparkPropertyCards();
  assert.equal(stale[0].id, first[0].id);
  assert.equal(entries.size, 1);
  entries.clear();
  await assert.rejects(load('src/services/spark.service.ts', modules).fetchAllActiveSparkPropertyCards(), /429/);
  assert.equal(entries.size, 0, 'failed cold requests do not seed a fallback cache');
});
