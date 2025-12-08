import { NoiseTopography } from './NoiseTopography';
import { MousePointer2 } from 'lucide-react';

export const Hero3 = () => {
  return (
    <section className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-center overflow-hidden">
      {/* Background with Inverted Topography for White Lines */}
      <div className="absolute inset-0 opacity-40 z-0 mix-blend-screen filter invert select-none">
        <NoiseTopography />
      </div>

      {/* Radial Gradient vignettes to focus center */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#050505] z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-start space-y-8">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
              System Online
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-600">
            Engineering the
            <br />
            invisible web.
          </h1>

          <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">
            Designing interfaces that feel organic, alive, and responsive to user intent. Blurring
            the line between data and art.
          </p>

          <button className="group relative inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-medium transition-transform active:scale-95 hover:bg-gray-100">
            <span>Initiate Protocol</span>
            <MousePointer2 className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Foreground decorative blurs */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
