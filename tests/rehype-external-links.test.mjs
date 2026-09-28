import { test } from "node:test";
import assert from "node:assert/strict";
import rehypeExternalLinks from "../src/lib/rehype-external-links.mjs";

const site = "https://foyay.dev";
const link = (href) => ({ type: "element", tagName: "a", properties: { href }, children: [] });
const run = (...nodes) => {
  const tree = { type: "root", children: [{ type: "element", tagName: "p", properties: {}, children: nodes }] };
  rehypeExternalLinks({ site })(tree);
  return nodes.map((n) => n.properties);
};

test("opens external links in a new tab with nofollow", () => {
  const [http, https] = run(link("http://example.com"), link("https://developer.mozilla.org/x"));
  for (const props of [http, https]) {
    assert.equal(props.target, "_blank");
    assert.deepEqual(props.rel, ["noopener", "nofollow"]);
  }
});

test("leaves internal, relative, anchor and mailto links untouched", () => {
  const results = run(
    link("https://foyay.dev/posts/a"),
    link("/posts/a"),
    link("#section"),
    link("mailto:me@example.com"),
  );
  for (const props of results) {
    assert.equal(props.target, undefined);
    assert.equal(props.rel, undefined);
  }
});

test("ignores anchors without an href", () => {
  const tree = { type: "root", children: [{ type: "element", tagName: "a", properties: {}, children: [] }] };
  rehypeExternalLinks({ site })(tree);
  assert.deepEqual(tree.children[0].properties, {});
});
