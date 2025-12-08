import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Hero6 } from '../components/Hero6';
import { LargerWorksSection } from '../components/LargerWorksSection';
import { ExperimentsSection } from '../components/ExperimentsSection';
import { WritingSection } from '../components/WritingSection';
import { ContactSection18 } from '../components/ContactSection18';
import { getBlogPosts } from '../utils/getBlogPosts';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      scrollTo: search.scrollTo as string | undefined,
    };
  },
  loader: () => {
    const blogPosts = getBlogPosts();
    return { blogPosts };
  },
  component: HomePage,
});

function HomePage() {
  const { blogPosts } = Route.useLoaderData();
  const navigate = useNavigate();
  const { scrollTo } = Route.useSearch();

  useEffect(() => {
    if (scrollTo) {
      // Clear the search param
      navigate({ to: '/', search: { scrollTo: undefined }, replace: true });

      // Scroll to the section after a short delay
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY;
          const offset = 100;
          window.scrollTo({
            top: offsetTop - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [scrollTo, navigate]);

  return (
    <>
      <Hero6 />
      <LargerWorksSection />
      <ExperimentsSection />
      <WritingSection blogPosts={blogPosts} />
      <ContactSection18 />
    </>
  );
}
