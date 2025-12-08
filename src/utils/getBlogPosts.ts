import type { BlogPost } from './blogPost.interface';

// Import all MDX files from the blog directory with frontmatter
const blogModules = import.meta.glob<{ frontmatter: any }>('/src/content/blog/*.mdx', {
  eager: true,
});

export function getBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [, module] of Object.entries(blogModules)) {
    // Extract frontmatter from the MDX module
    const frontmatter = module.frontmatter || {};

    // Extract slug from path
    const slug = frontmatter.path?.split('/').pop() || '';

    // Only include published posts
    if (frontmatter.published) {
      posts.push({
        path: frontmatter.path || '',
        date: frontmatter.date || '',
        published: frontmatter.published || false,
        tags: frontmatter.tags || [],
        title: frontmatter.title || '',
        slug,
        excerpt: frontmatter.excerpt,
      });
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = parseInt(a.date);
    const dateB = parseInt(b.date);
    return dateB - dateA;
  });

  return posts;
}

export function formatBlogDate(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
