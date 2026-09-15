import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { SITE_NAME } from '../data/site';

export const NotFound = () => {
  useEffect(() => {
    document.title = `Page not found | ${SITE_NAME}`;
  }, []);

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-40 pb-24 text-center">
      <h1 className="text-4xl md:text-6xl font-serif italic text-gray-900 mb-4">Page not found</h1>
      <p className="text-gray-600 text-lg mb-10">
        There's no page at this address. The link may be old or mistyped.
      </p>
      <Link
        to="/"
        search={{ scrollTo: undefined }}
        className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        Go to the home page
      </Link>
    </section>
  );
};
