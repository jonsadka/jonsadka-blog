import posts from 'virtual:blog-posts';
import type { BlogPost } from './blogPost.interface';

// Frontmatter is read at build time (plugins/blog-posts.ts), so listing posts
// doesn't pull every post's content into the main bundle.
export function getBlogPosts(): BlogPost[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => parseInt(b.date) - parseInt(a.date));
}

export function formatBlogDate(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
