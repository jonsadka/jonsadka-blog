// Site-wide identity, shared by the app and the build (plugins/blog-posts.ts).
export const SITE_URL = 'https://jonsadka.com';
export const SITE_NAME = 'Jon Sadka';
export const SITE_TITLE = `${SITE_NAME} | Portfolio and Blog`;
export const SITE_DESCRIPTION =
  'Portfolio and blog of Jon Sadka: selected work, creative coding experiments, and writing on frontend engineering and data visualization.';

export const postTitle = (title: string) => `${title} | ${SITE_NAME}`;
