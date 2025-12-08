import { SiGithub, SiX } from '@icons-pack/react-simple-icons';

export const ContactSection18 = () => {
  return (
    <section id="contact" className="h-screen bg-black text-white flex items-center justify-center border-t border-white/10">
      <div className="text-center">
        <p className="text-4xl font-serif italic text-gray-500 mb-24">Say Hello.</p>

        <div className="flex items-center gap-16 sm:gap-32 justify-center">
          <a href="https://github.com/jonsadka" target="_blank" rel="noreferrer" className="group">
            <SiGithub
              size={56}
              className="text-white group-hover:text-gray-400 transition-colors duration-300 transform group-hover:scale-110"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/jonsadka"
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="text-white group-hover:text-gray-400 transition-colors duration-300 transform group-hover:scale-110"
            >
              <title>LinkedIn</title>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a href="https://x.com/jonsadka" target="_blank" rel="noreferrer" className="group">
            <SiX
              size={56}
              className="text-white group-hover:text-gray-400 transition-colors duration-300 transform group-hover:scale-110"
            />
          </a>
        </div>

        <div className="mt-24 w-px h-24 bg-gradient-to-b from-white to-transparent mx-auto" />
      </div>
    </section>
  );
};
