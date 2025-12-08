import { NoiseTopography } from './NoiseTopography';
import { ArrowDown } from 'lucide-react';

export const Hero9 = () => {
    return (
        <section className="relative min-h-screen bg-black text-white flex flex-col items-center justify-end pb-12 overflow-hidden selection:bg-white selection:text-black">

            {/* The Void - Topography acts as distant waves */}
            <div className="absolute inset-0 z-0">
                {/* Extremely subtle, dark opacity */}
                <div className="absolute inset-0 opacity-30 filter invert mix-blend-screen pointer-events-none">
                    <NoiseTopography />
                </div>

                {/* Deep gradients to fade it further */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
            </div>

            {/* Content - Minimal, Fine Art Style */}
            <div className="relative z-10 w-full max-w-screen-2xl px-8 flex flex-col md:flex-row justify-between items-end gap-12">

                {/* Left: Title */}
                <div className="mb-0 md:mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif font-light tracking-wide leading-tight text-white/90">
                        <span className="block opacity-50 text-xl md:text-2xl font-sans mb-4 tracking-widest uppercase">Portfolio</span>
                        Form follows<br />
                        <span className="italic text-white">emotion.</span>
                    </h1>
                </div>

                {/* Center: Scroll Indicator (Absolute Centered) */}
                <div className="absolute left-1/2 bottom-12 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
                    <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
                    <ArrowDown size={14} className="animate-bounce" />
                </div>

                {/* Right: Info */}
                <div className="text-right mb-0 md:mb-12">
                    <p className="max-w-xs text-sm text-gray-500 font-light leading-relaxed">
                        Jon Doe &mdash; Staff Engineer.<br />
                        Crafting digital artifacts in <br />
                        San Francisco, CA.
                    </p>
                    <div className="mt-6 flex justify-end gap-8 text-xs uppercase tracking-widest text-gray-600">
                        <a href="#" className="hover:text-white transition-colors">Works</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>

            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        </section>
    );
};
