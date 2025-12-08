import { NoiseTopography } from './NoiseTopography';
import { ArrowDown } from 'lucide-react';

export const Hero6 = () => {
  const scrollToWork = () => {
    const element = document.getElementById('work');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-[#E5E5E5] flex items-center justify-center p-6 sm:p-12 md:p-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* The Floating Card */}
      <div className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-white/50">
        {/* Left Side: Content */}
        <div className="flex-1 pt-6 pb-4 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 pr-6 pl-6 sm:pl-12 md:pl-16 flex flex-col justify-center items-start z-10 bg-white/80 backdrop-blur-sm">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full mb-3 sm:mb-8 flex items-center justify-center text-white font-serif italic text-xl">
            J
          </div>

          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-3 sm:mb-6 leading-tight">
            Engineering
            <br className="sm:hidden" />
            <span className="text-gray-400 font-serif italic sm:ml-2">beautiful</span>
            <br />
            interfaces.
          </h2>

          <p className="text-gray-500 max-w-sm leading-relaxed sm:mb-6">
            Building web experiences where technical excellence and visual refinement work in
            harmony.
          </p>

          <button
            onClick={scrollToWork}
            className="hidden sm:visible flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:gap-5 transition-all duration-300"
          >
            <span>View Selected Works</span>
            <ArrowDown size={16} />
          </button>
        </div>

        {/* Right Side: Visual Topography Window */}
        <div className="flex-1 relative min-h-[280px] md:min-h-auto bg-gray-50">
          <div className="absolute inset-4 md:inset-6 rounded-[2rem] overflow-hidden shadow-inner border border-black/5">
            <NoiseTopography />
          </div>
        </div>
      </div>
    </section>
  );
};
