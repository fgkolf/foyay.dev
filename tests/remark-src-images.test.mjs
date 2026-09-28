import { test } from "node:test";
import assert from "node:assert/strict";
import remarkSrcImages, {
  toRelativeImagePath,
} from "../src/lib/remark-src-images.mjs";

const root = "/repo";
const post = "/repo/src/content/posts/foo.md";
const project = "/repo/src/content/projects/tabzie.md";

test("rewrites /src/ paths relative to the markdown file", () => {
  assert.equal(
    toRelativeImagePath("/src/assets/posts/a.png", post, root),
    "../../assets/posts/a.png",
  );
});

test("keeps nested folders", () => {
  assert.equal(
    toRelativeImagePath("/src/assets/projects/tabzie/logo.png", project, root),
    "../../assets/projects/tabzie/logo.png",
  );
});

test("prefixes ./ when the image sits next to the file", () => {
  assert.equal(
    toRelativeImagePath("/src/content/posts/a.png", post, root),
    "./a.png",
  );
});

test("accepts a root with a trailing slash", () => {
  assert.equal(
    toRelativeImagePath("/src/assets/posts/a.png", post, "/repo/"),
    "../../assets/posts/a.png",
  );
});

test("leaves non-/src/ urls untouched", () => {
  for (const url of [
    "https://example.com/a.png",
    "/images/a.png",
    "./a.png",
    "../a.png",
    "a.png",
  ]) {
    assert.equal(toRelativeImagePath(url, post, root), url);
  }
});

test("plugin rewrites image nodes only", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          { type: "image", url: "/src/assets/posts/a.png" },
          { type: "link", url: "/src/assets/posts/a.png", children: [] },
        ],
      },
    ],
  };
  remarkSrcImages({ root })(tree, { path: post });
  assert.equal(tree.children[0].children[0].url, "../../assets/posts/a.png");
  assert.equal(tree.children[0].children[1].url, "/src/assets/posts/a.png");
});

test("plugin skips files without a path", () => {
  const tree = {
    type: "root",
    children: [{ type: "image", url: "/src/assets/posts/a.png" }],
  };
  remarkSrcImages({ root })(tree, {});
  assert.equal(tree.children[0].url, "/src/assets/posts/a.png");
});
