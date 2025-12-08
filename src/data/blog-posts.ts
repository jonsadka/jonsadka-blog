export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags: string[];
  published: boolean;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable React Applications in 2025',
    excerpt:
      'Exploring modern patterns for large-scale React applications with performance optimization and maintainability in mind.',
    date: 'February 2024',
    slug: 'building-scalable-react-applications',
    tags: ['React', 'TypeScript', 'Performance'],
    published: true,
  },
  {
    id: 2,
    title: 'How to deploy imgproxy to Google Cloud using Docker and Cloud Run',
    excerpt:
      'A step-by-step guide to hosting a production instance of imgproxy on Google Cloud within minutes.',
    date: 'May 2020',
    slug: 'how-to-deploy-imgproxy-to-google-cloud-using-docker-and-cloud-run',
    tags: ['Infrastructure', 'Docker', 'Google Cloud'],
    published: true,
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getPublishedBlogPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.published);
};
