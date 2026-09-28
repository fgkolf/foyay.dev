import { getCollection } from "astro:content";
import { readingTime } from "./reading-time.mjs";

const isVisible = (entry) => !import.meta.env.PROD || !entry.data.draft;
const byDateDesc = (a, b) => b.data.date - a.data.date;

export async function getPosts() {
  const posts = await getCollection("posts", isVisible);
  return posts
    .map((post) => ({
      ...post,
      data: { ...post.data, readingTime: readingTime(post.body) },
    }))
    .sort(byDateDesc);
}

export async function getProjects() {
  const projects = await getCollection("projects", isVisible);
  return projects.sort(byDateDesc);
}
