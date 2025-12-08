import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useState, useEffect } from 'react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      const offset = 100; // Account for fixed navigation
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Handle hash navigation (e.g., when coming from blog posts)
  useEffect(() => {
    // Prevent browser's default hash scroll behavior
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Longer delay to ensure page has fully navigated and rendered
        setTimeout(() => {
          scrollToSection(hash);
        }, 300);
      }
    };

    // Handle initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const sections = ['home', 'work', 'experiments', 'writing', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const { offsetTop } = section;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Run on mount and scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  );
}
