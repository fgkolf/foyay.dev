import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      tags: z.array(z.string()),
      images: z.array(
        z.object({
          url: image(),
          alt: z.string(),
        }),
      ),
    }),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      author: z.string(),
      readingTime: z.string(),
      tags: z.array(z.string()),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

export const collections = {
  projects: projectsCollection,
  posts: postsCollection,
};
