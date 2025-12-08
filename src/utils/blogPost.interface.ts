export interface BlogPost {
  path: string;
  date: string;
  published: boolean;
  tags: string[];
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
}
