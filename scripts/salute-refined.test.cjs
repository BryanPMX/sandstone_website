const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

function load(file, requireModule) {
  const module = { exports: {} };
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require: requireModule, URLSearchParams });
  return module.exports;
}

function harness() {
  const properties = load("src/lib/properties.ts", require);
  const state = [], refs = [], pushed = [];
  let stateIndex = 0, refIndex = 0;
  const react = {
    useEffect() {},
    useTransition: () => [false, (fn) => fn()],
    useState(initial) {
      const index = stateIndex++;
      if (!(index in state)) state[index] = initial;
      return [state[index], (value) => { state[index] = typeof value === "function" ? value(state[index]) : value; }];
    },
    useRef(initial) {
      const index = refIndex++;
      if (!(index in refs)) refs[index] = { current: initial };
      return refs[index];
    },
  };
  const { HeroSection } = load("src/components/HeroSection.tsx", (id) => {
    if (id === "react") return react;
    if (id === "next/navigation") return { useRouter: () => ({ push: (href) => pushed.push(href) }) };
    if (id === "@/lib") return properties;
    if (id.endsWith(".module.css")) return { default: {} };
    return require(id);
  });
  return { pushed, render(veteransDay) { stateIndex = 0; refIndex = 0; return HeroSection({ veteransDay }); } };
}

function elements(node, predicate) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap((child) => elements(child, predicate));
  return [...(predicate(node) ? [node] : []), ...elements(node.props?.children, predicate)];
}

test("seasonal search submits a ZIP to the real map URL and prevents duplicate navigation", () => {
  const h = harness();
  const input = elements(h.render(true), (node) => node.type === "input")[0];
  input.props.onChange({ currentTarget: { value: " 79912 " } });
  const form = elements(h.render(true), (node) => node.type === "form")[0];
  let prevented = false;
  form.props.onSubmit({ preventDefault() { prevented = true; } });
  form.props.onSubmit({ preventDefault() {} });
  assert.equal(prevented, true);
  assert.equal(h.pushed.length, 1);
  const url = new URL(h.pushed[0], "https://sandstone.homes");
  assert.equal(url.pathname, "/listings/map");
  assert.equal(url.searchParams.get("search"), "79912");
  assert.equal(url.searchParams.get("market"), "el-paso");
});

test("the original hero and image return when the campaign is inactive", () => {
  const h = harness();
  const active = h.render(true);
  assert.equal(elements(active, (node) => node.type === "h1").length, 1);
  assert.equal(elements(active, (node) => node.type === "input").length, 1);
  assert.ok(elements(active, (node) => node.type === "img").some((node) => node.props.src.endsWith("flag-refined.webp")));
  const inactive = h.render(false);
  assert.ok(elements(inactive, (node) => node.type === "img").some((node) => node.props.src === "/hero-home.webp"));
  assert.equal(elements(inactive, (node) => node.type === "img").some((node) => node.props.src.includes("flag-refined")), false);
});
