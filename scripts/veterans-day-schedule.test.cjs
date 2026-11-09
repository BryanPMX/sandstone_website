const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

function harness() {
  let now = Date.parse("2026-11-09T12:00:00-07:00");
  let serial = 0;
  const timers = new Map();
  const events = new Map();
  class Clock extends Date { static now() { return now; } }
  function load(file, requireModule, extraSource = "") {
    const module = { exports: {} };
    const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8") + extraSource;
    const code = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const eventTarget = (target) => ({
      addEventListener(name, callback) { events.set(`${target}:${name}`, callback); },
      removeEventListener(name) { events.delete(`${target}:${name}`); },
    });
    vm.runInNewContext(code, {
      module, exports: module.exports, require: requireModule, Date: Clock,
      document: eventTarget("document"), window: eventTarget("window"),
      setTimeout(callback, delay) { const id = ++serial; timers.set(id, { callback, at: now + delay }); return id; },
      clearTimeout(id) { timers.delete(id); },
    });
    return module.exports;
  }
  const config = load("src/config/veterans-day.ts", require);
  let useServerSnapshot = false;
  const component = () => null;
  const client = load("src/components/VeteransDaySchedule.tsx", (id) => {
    if (id === "@/config/veterans-day") return config;
    if (id === "react") return { useSyncExternalStore: (_subscribe, snapshot, serverSnapshot) => useServerSnapshot ? serverSnapshot() : snapshot() };
    if (id === "@/components/SiteHeader") return { SiteHeader: component };
    if (id === "@/components/HeroSection") return { HeroSection: component };
    if (id === "@/components/VeteransDayTribute") return { VeteransDayAnnouncement: component };
    return require(id);
  }, "\nexport { subscribe };\n");
  return { config, client, events, timers,
    setNow(value) { now = typeof value === "number" ? value : Date.parse(value); },
    server(value) { useServerSnapshot = value; },
    fireNext() {
      const [id, timer] = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
      timers.delete(id); now = timer.at; timer.callback();
    },
  };
}

test("uses the configured El Paso times, with an inclusive start and exclusive end", () => {
  const { config } = harness();
  const start = Date.parse(config.VETERANS_DAY_SCHEDULE.startsAt);
  const end = Date.parse(config.VETERANS_DAY_SCHEDULE.endsAt);
  assert.ok(end > start);
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Denver", timeStyle: "short" });
  assert.equal(fmt.format(new Date(start)), "8:00 PM");
  assert.equal(fmt.format(new Date(end)), "8:00 AM");
  for (const [time, expected] of [
    [start - 1, false], [start, true], [(start + end) / 2, true],
    [end - 1, true], [end, false], [end + 365 * 86400000, false],
  ]) assert.equal(config.isVeteransDayActive(time), expected, String(time));
});

test("open tabs switch at both boundaries and release timers/listeners", () => {
  const h = harness();
  h.setNow(Date.parse(h.config.VETERANS_DAY_SCHEDULE.startsAt) - 3600000);
  const seen = [];
  const cleanup = h.client.subscribe(() => seen.push(h.config.isVeteransDayActive()));
  assert.equal(h.timers.size, 1);
  h.fireNext();
  h.fireNext();
  assert.deepEqual(seen, [false, true, false]);
  assert.equal(h.timers.size, 0);
  cleanup();
  assert.equal(h.events.size, 0);
});

test("returning to a suspended tab checks the current time immediately", () => {
  const h = harness();
  h.setNow(Date.parse(h.config.VETERANS_DAY_SCHEDULE.startsAt) + 3600000);
  let active;
  const cleanup = h.client.subscribe(() => { active = h.config.isVeteransDayActive(); });
  assert.equal(active, true);
  h.setNow(Date.parse(h.config.VETERANS_DAY_SCHEDULE.endsAt) + 60000);
  h.events.get("document:visibilitychange")();
  assert.equal(active, false);
  assert.equal(h.timers.size, 0);
  cleanup();
});

test("both content and header restore outside the window; static HTML stays hydration safe", () => {
  const h = harness();
  for (const [date, active] of [
    [Date.parse(h.config.VETERANS_DAY_SCHEDULE.startsAt) - 1, false],
    [Date.parse(h.config.VETERANS_DAY_SCHEDULE.startsAt) + 1, true],
    [Date.parse(h.config.VETERANS_DAY_SCHEDULE.endsAt), false],
  ]) {
    h.setNow(date);
    assert.equal(h.client.VeteransDayOnly({ children: "tribute" }), active ? "tribute" : null);
    const [announcement, header] = h.client.VeteransDayHomeHeader().props.children;
    assert.equal(!!announcement, active);
    assert.equal(h.client.VeteransDayHomeHero().props.veteransDay, active);
    assert.equal(header.props.overlayDesktop, !active);
  }
  h.setNow(Date.parse(h.config.VETERANS_DAY_SCHEDULE.startsAt) + 3600000);
  h.server(true);
  assert.equal(h.client.VeteransDayOnly({ children: "tribute" }), null);
  assert.equal(h.client.VeteransDayHomeHeader().props.children[1].props.overlayDesktop, true);
});

test("master disable hides the campaign and cancels future transitions", () => {
  const h = harness();
  h.setNow(Date.parse(h.config.VETERANS_DAY_SCHEDULE.startsAt) + 3600000);
  h.config.VETERANS_DAY_SCHEDULE.enabled = false;
  assert.equal(h.config.isVeteransDayActive(), false);
  assert.equal(h.config.nextVeteransDayTransition(), null);
});
