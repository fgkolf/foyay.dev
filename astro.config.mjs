// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkSrcImages from "./src/lib/remark-src-images.mjs";

export default defineConfig({
  site: "https://foyay.dev",
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [
      [remarkSrcImages, { root: fileURLToPath(new URL(".", import.meta.url)) }],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
