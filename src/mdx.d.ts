declare module '*.mdx' {
  import { ComponentType } from 'react';

  export const frontmatter: {
    path: string;
    date: string;
    published: boolean;
    tags: string[];
    title: string;
    excerpt?: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
