import { useEffect, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';

// Navigation Component
export const Navigation = ({
  activeSection = 'home',
  scrollToSection,
}: {
  activeSection?: string;
  scrollToSection?: (section: string) => void;
}) => {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine if we're on the home page
  const isHomePage = routerState.location.pathname === '/';

  // Helper function to handle navigation - either scroll to section or route to home page
  const handleNavigation = (section: string) => {
    if (isHomePage && scrollToSection) {
      // On home page: scroll to section
      scrollToSection(section);
    } else {
      // On other pages: navigate to home page with hash
      navigate({ to: '/', hash: section });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'writing', label: 'Writing' },
  ];

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 transition-all duration-500 ease-out px-4">
        <div
          className={`mx-auto transition-all duration-500 rounded-full ease-out ${
            isScrolled
              ? 'max-w-5xl bg-black/90 backdrop-blur-md border border-white/10 shadow-2xl py-2 md:py-4 px-6'
              : 'max-w-7xl bg-black/0 backdrop-blur-sm border border-transparent py-1 md:py-5 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className={`font-bold text-xl tracking-tighter transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-black'
              }`}
              onClick={() => handleNavigation('home')}
            >
              JON SADKA
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group overflow-hidden ${
                    activeSection === link.id
                      ? isScrolled
                        ? 'text-black bg-white'
                        : 'text-white bg-black'
                      : isScrolled
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {activeSection !== link.id && (
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                        isScrolled ? 'bg-white' : 'bg-black'
                      }`}
                    />
                  )}
                </button>
              ))}

              <button
                onClick={() => handleNavigation('contact')}
                className={`ml-4 px-6 py-2 text-sm font-bold tracking-wide uppercase border-2 transition-all duration-300 rounded-full hover:scale-105 active:scale-95 ${
                  isScrolled
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                Connect
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'
                }`}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? 'rotate-45 translate-y-2 bg-white'
                        : isScrolled
                          ? 'bg-white'
                          : 'bg-black'
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : isScrolled ? 'bg-white' : 'bg-black'
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? '-rotate-45 -translate-y-2.5 bg-white'
                        : isScrolled
                          ? 'bg-white'
                          : 'bg-black'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                handleNavigation(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-4xl font-bold tracking-tight text-white transition-all duration-300 hover:text-gray-400 ${
                activeSection === link.id ? 'opacity-100' : 'opacity-60'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              handleNavigation('contact');
              setIsMobileMenuOpen(false);
            }}
            className="mt-8 px-8 py-3 text-lg font-bold tracking-wide uppercase border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
};
