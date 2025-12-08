import { ArrowUpRight } from 'lucide-react';
import { useExperiments } from '../hooks/useExperiments';
import { useState } from 'react';

export const ExperimentsSection = () => {
  const { experiments, loading } = useExperiments();
  const [showAll, setShowAll] = useState(false);

  if (loading)
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center bg-white gap-12 py-24">
        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-8">
          Loading Explorations
        </p>

        <div className="flex gap-1 h-8 items-end">
          <div className="w-1 h-4 bg-gray-900 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-8 bg-gray-900 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-6 bg-gray-900 animate-bounce" style={{ animationDelay: '300ms' }} />
          <div className="w-1 h-3 bg-gray-900 animate-bounce" style={{ animationDelay: '75ms' }} />
        </div>
      </div>
    );

  const displayedExperiments = showAll ? experiments : experiments.slice(0, 12);

  return (
    <section id="experiments" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 px-2">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif italic text-gray-900">Experiments</h2>
            <p className="text-gray-500 text-lg">
              Small explorations of raw ideas and creative coding sketches.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="block text-4xl font-light text-gray-300">
              {experiments.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-3 xl:gap-x-3 xl:gap-y-4 mb-16">
          {displayedExperiments.map((exp) => (
            <a
              key={exp.id}
              href={exp.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 sm:gap-3 xl:gap-4 p-2 sm:p-3 lg:p-4 rounded-[2rem] hover:bg-gray-50 transition-colors duration-300  sm:border-red-300"
            >
              <div className="relative aspect-[315/200] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                {exp.image ? (
                  <img
                    src={exp.image}
                    alt={exp.title || 'Experiment'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    No Preview
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={20} className="text-gray-900" />
                </div>
              </div>

              <h3 className="px-2 text-sm sm:text-base font-medium text-gray-900 leading-snug group-hover:underline group-hover:decoration-gray-300 decoration-1 underline-offset-4">
                {exp.title}
              </h3>
            </a>
          ))}
        </div>

        {experiments.length > 10 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              {showAll ? 'Show Less' : 'View All Experiments'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
