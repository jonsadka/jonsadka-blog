import { useEffect, useState } from 'react';
import { NoiseTopography } from './NoiseTopography';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-start lg:items-center pt-20 md:pt-32 lg:pt-0 pb-24 lg:pb-0 px-4 sm:px-6 overflow-hidden bg-white selection:bg-black selection:text-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full mb-20 flex-grow">
        {/* Mobile/Tablet: Side-by-side layout */}
        <div className="flex flex-col lg:hidden gap-8 sm:gap-12">
          <div className="w-full px-4 sm:px-6">
            <div
              className={`overflow-hidden transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center space-x-2 mb-6 sm:mb-8">
                <span className="h-px w-6 sm:w-8 bg-black"></span>
                <span className="text-xs sm:text-sm font-mono font-medium tracking-widest uppercase text-gray-500">
                  Staff Frontend Engineer
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans font-black text-5xl sm:text-7xl leading-[0.9] tracking-tighter mb-6 sm:mb-10 text-black">
              <div
                className={`transition-all duration-1000 delay-200 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                BUILDING
              </div>
              <div
                className={`transition-all duration-1000 delay-300 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                SCALABLE
              </div>
              <div
                className={`transition-all duration-1000 delay-400 ease-out bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-300% animate-gradient ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                INTERFACES.
              </div>
            </h1>

            {/* Description */}
            <p
              className={`text-lg sm:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light transition-all duration-1000 delay-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Specializing in{' '}
              <span className="font-medium text-black decoration-gray-300 decoration-1 underline-offset-4 underline">
                design systems
              </span>
              ,{' '}
              <span className="font-medium text-black decoration-gray-300 decoration-1 underline-offset-4 underline">
                performance
              </span>
              , and{' '}
              <span className="font-medium text-black decoration-gray-300 decoration-1 underline-offset-4 underline">
                visualizations
              </span>
              . Creating digital experiences that are as robust as they are beautiful.
            </p>
          </div>

          <div className="w-full px-4 sm:px-6">
            <div className="relative w-full">
              <div className="rounded-xl overflow-hidden border border-gray-300 shadow-2xl">
                <div className="text-xs text-gray-500 px-4 py-2 font-mono border-b border-gray-300 bg-white/50">
                  Generative.tsx
                </div>
                <div className="relative h-[300px] sm:h-[400px] w-full bg-white/80">
                  <NoiseTopography />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop (lg+): Overlapping layout */}
        <div className="hidden lg:block relative min-h-[700px] mt-24">
          {/* Visual Element - Background Layer */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-[55%] transition-all duration-1000 delay-400 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative w-full max-w-2xl ml-auto">
              <div className="rounded-xl overflow-hidden border border-gray-300 shadow-2xl">
                <div className="text-xs text-gray-500 px-4 py-2 font-mono border-b border-gray-300 bg-white/50">
                  Generative.tsx
                </div>
                <div className="relative h-[500px] w-full bg-white/80">
                  <NoiseTopography />
                </div>
              </div>

              {/* Decorative Elements behind the window */}
              <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Text Content - Overlapping Layer */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[60%] z-10 pr-8">
            <div
              className={`overflow-visible transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center space-x-2 mb-6 sm:mb-8">
                <span className="h-px w-8 bg-black"></span>
                <span className="text-xs sm:text-sm font-mono font-medium tracking-widest uppercase text-gray-500">
                  Staff Frontend Engineer
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans font-black text-8xl xl:text-9xl leading-[0.9] tracking-tighter mb-10 text-black">
              <div
                className={`transition-all duration-1000 delay-200 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                BUILDING
              </div>
              <div
                className={`transition-all duration-1000 delay-300 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                SCALABLE
              </div>
              <div
                className={`transition-all duration-1000 delay-400 ease-out bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-300% animate-gradient ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                INTERFACES
              </div>
            </h1>

            {/* Description */}
            <p
              className={`text-2xl text-gray-600 leading-relaxed max-w-xl font-light transition-all duration-1000 delay-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Specializing in{' '}
              <span className="font-medium text-black decoration-gray-300 decoration-1 underline-offset-4 underline">
                design systems
              </span>
              ,{' '}
              <span className="font-medium text-black decoration-gray-300 decoration-1 underline-offset-4 underline">
                performance
              </span>
              , and{' '}
              <span className="font-medium text-black decoration-gray-300 decoration-1 underline-offset-4 underline">
                visualizations
              </span>
              . Creating digital experiences that are as robust as they are beautiful.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div className="flex flex-col items-center space-y-4 animate-bounce-slow">
          <div className="text-[10px] font-mono font-bold text-gray-400 tracking-[0.2em] uppercase">
            Scroll
          </div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </div>
    </section>
  );
};
