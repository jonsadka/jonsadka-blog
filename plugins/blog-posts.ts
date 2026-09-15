import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import type { Plugin, ResolvedConfig } from 'vite';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, postTitle } from '../src/data/site';

// Reads blog post frontmatter at build time and:
// - serves it to the app as `virtual:blog-posts`, so the home page doesn't bundle the posts
// - fills the <!-- seo --> block in index.html with the page title and share tags
// - writes dist/blog/<slug>.html per post (GitHub Pages serves it for /blog/<slug>)
//   and dist/404.html, so direct links and refreshes load the app instead of a 404

const VIRTUAL_ID = 'virtual:blog-posts';
const RESOLVED_ID = '\0' + VIRTUAL_ID;
const SEO_BLOCK = /<!-- seo -->[\s\S]*?<!-- \/seo -->/;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Frontmatter {
  path: string;
  date: string;
  published: boolean;
  tags: string[];
  title: string;
  excerpt?: string;
  // Optional meta description; otherwise the excerpt or first paragraph is used
  description?: string;
}

export interface BlogPostMeta extends Frontmatter {
  slug: string;
  description: string;
}

interface Page {
  title: string;
  shareTitle: string;
  description: string;
  url: string;
  type: 'website' | 'article';
}

function readPosts(dir: string): BlogPostMeta[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = fs.readFileSync(path.join(dir, file), 'utf8');
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const frontmatter: Frontmatter = parseYaml(match?.[1] ?? '') ?? {};
      const body = match ? source.slice(match[0].length) : source;
      return {
        ...frontmatter,
        tags: frontmatter.tags ?? [],
        slug: frontmatter.path?.split('/').pop() ?? '',
        description:
          frontmatter.description ??
          frontmatter.excerpt ??
          firstParagraph(body) ??
          `${frontmatter.title}, an article by ${SITE_NAME}.`,
      };
    });
}

// The first prose paragraph, as plain text, for the meta description
function firstParagraph(body: string): string | undefined {
  for (const block of body.split(/\n\s*\n/)) {
    const text = block.trim();
    // Skip headings, HTML/JSX, code, images, lists, and tables
    if (!text || /^(#|<|\{|`|!\[|[-*+] |\d+\. |\||import |export )/.test(text)) continue;
    const plain = text
      .replace(/<[^>]+>/g, '')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[`*]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    // Skip "NOTE:"-style asides, dated update notes, and lead-ins to a list
    if (/^[A-Z]{2,}:/.test(plain) || /^[\d/.-]*\s*update:/i.test(plain) || plain.endsWith(':')) {
      continue;
    }
    if (plain.length >= 40) return truncate(plain, 155);
  }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:.]$/, '') + '…';
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function seoBlock(page: Page): string {
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<link rel="canonical" href="${page.url}" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(page.shareTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${page.url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  return `<!-- seo -->\n    ${tags.join('\n    ')}\n    <!-- /seo -->`;
}

export function blogPosts(): Plugin {
  let config: ResolvedConfig;
  const blogDir = () => path.join(config.root, 'src/content/blog');

  return {
    name: 'blog-posts',
    configResolved(resolved) {
      config = resolved;
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const dir = blogDir();
      for (const file of fs.readdirSync(dir)) this.addWatchFile(path.join(dir, file));
      return `export default ${JSON.stringify(readPosts(dir))};`;
    },
    transformIndexHtml(html) {
      return html.replace(
        SEO_BLOCK,
        seoBlock({
          title: SITE_TITLE,
          shareTitle: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: `${SITE_URL}/`,
          type: 'website',
        })
      );
    },
    closeBundle() {
      if (config.command !== 'build') return;
      const outDir = path.resolve(config.root, config.build.outDir);
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      fs.writeFileSync(path.join(outDir, '404.html'), template);

      for (const post of readPosts(blogDir()).filter((p) => p.published)) {
        const file = path.join(outDir, `${post.path.replace(/^\//, '')}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(
          file,
          template.replace(
            SEO_BLOCK,
            seoBlock({
              title: postTitle(post.title),
              shareTitle: post.title,
              description: post.description,
              url: `${SITE_URL}${post.path}`,
              type: 'article',
            })
          )
        );
      }
    },
  };
}
