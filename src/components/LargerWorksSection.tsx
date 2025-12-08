import { ArrowRight } from 'lucide-react';
import { LARGER_WORKS } from '../data/larger-works';

export const LargerWorksSection = () => {
  return (
    <section id="work" className="py-32 bg-[#F3F3F3]">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-serif italic text-gray-900 mb-4">Selected Works</h2>
          <p className="text-gray-500 text-lg">
            Where curiosity meets craft. Building ambitious projects from concept to completion.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 lg:gap-12">
          {LARGER_WORKS.map((work, index) => (
            <a
              key={work.title}
              href={work.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-white/50 h-full flex flex-col">
                <div className="relative aspect-[16/9] rounded-[1.5rem] overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                  {work.thumbnail ? (
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="px-5 pb-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-medium text-gray-900 leading-tight">
                        {work.title}
                      </h3>
                      <div className="flex gap-3 text-sm text-gray-400 font-mono items-center">
                        <span>0{index + 1}</span>
                        <span>/</span>
                        <div className="flex flex-wrap gap-1">
                          {work.tags?.[0] && <span className="uppercase">{work.tags[0]}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  <p className="text-gray-500 leading-relaxed text-sm mb-4 line-clamp-3">
                    {work.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
