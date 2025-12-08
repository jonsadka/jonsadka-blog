import { ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { BlogPost } from '../utils/blogPost.interface';
import { formatBlogDate } from '../utils/getBlogPosts';

export const WritingSection = ({ blogPosts }: { blogPosts: BlogPost[] }) => {
  return (
    <section id="writing" className="py-32 px-6 bg-[#030303] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 px-2">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif italic text-white">Writing</h2>
            <p className="text-gray-500 text-lg">
              Thoughts on frontend development, engineering practices, and web technologies.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="block text-4xl font-light text-white/20">
              {blogPosts.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="space-y-0">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              to="/blog/$path"
              params={{ path: post.slug }}
              resetScroll={true}
              className="group relative block py-11 px-5 cursor-pointer transition-colors duration-500 hover:bg-white/5 rounded-[2rem]"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8 px-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4 text-sm font-serif text-white/50">
                    <span className="text-lg">0{index + 1}</span>
                    <span className="h-px w-12 bg-white/10" />
                    <span className="font-mono text-xs tracking-wider text-gray-600 uppercase">
                      {formatBlogDate(post.date)}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-light leading-tight tracking-tight group-hover:text-white transition-all duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-lg text-gray-500 max-w-2xl font-light">{post.excerpt}</p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono bg-white/5 rounded-full text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center self-end md:self-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
