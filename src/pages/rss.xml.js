import rss from '@astrojs/rss';
import { getPosts } from '../lib/content.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'foyay | Blog',
    description: 'Articles on web development, JavaScript, and software engineering by fgkolf.',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
  });
}
