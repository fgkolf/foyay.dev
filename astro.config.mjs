// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkSrcImages from "./src/lib/remark-src-images.mjs";
import rehypeExternalLinks from "./src/lib/rehype-external-links.mjs";

const site = "https://foyay.dev";

export default defineConfig({
  site,
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [
      [remarkSrcImages, { root: fileURLToPath(new URL(".", import.meta.url)) }],
    ],
    rehypePlugins: [[rehypeExternalLinks, { site }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
