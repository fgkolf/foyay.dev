import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

const collections = ["src/content/posts", "src/content/projects"];

// Pages CMS fills a missing `draft` with its default (true) on edit, so an
// entry without the key would be unpublished by its first CMS save.
test("every content entry sets draft explicitly", () => {
  for (const dir of collections) {
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const frontmatter = readFileSync(`${dir}/${file}`, "utf8").split(/^---$/m)[1];
      assert.match(frontmatter, /^draft: (true|false)$/m, `${dir}/${file}`);
    }
  }
});
