import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { formatBlogDate } from '../utils/getBlogPosts';

export const Route = createFileRoute('/blog/$path')({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { path } = Route.useParams();
  const navigate = useNavigate();

  // Scroll to top when the blog post loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // Dynamically import the MDX file based on the path parameter
  const BlogContent = lazy(() =>
    import(`../content/blog/${path}.mdx`).catch(() => {
      // If the file doesn't exist, redirect to home
      navigate({ to: '/', search: { scrollTo: undefined } });
      return Promise.resolve({
        default: () => <div className="text-center py-20">Blog post not found</div>,
        frontmatter: { title: 'Not Found', date: '', tags: [], path: '' },
      });
    })
  );

  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent
        BlogContent={BlogContent}
        onBack={() => navigate({ to: '/', search: { scrollTo: 'writing' } })}
      />
    </Suspense>
  );
}

function BlogPostContent({
  BlogContent,
  onBack,
}: {
  BlogContent: React.LazyExoticComponent<any>;
  onBack: () => void;
}) {
  const { path } = Route.useParams();
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    // Load the frontmatter from the MDX file asynchronously
    import(`../content/blog/${path}.mdx`)
      .then((module: any) => {
        if (module?.frontmatter) {
          setMetadata(module.frontmatter);
        }
      })
      .catch(() => {
        // Ignore errors, metadata will stay null
      });
  }, [path]);

  return (
    <article className="min-h-screen bg-white">
      {/* Back to writing button */}
      <nav className="pt-32 pb-6 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to writing</span>
          </button>
        </div>
      </nav>

      {/* Article Header */}
      {metadata && (
        <header className="pt-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-6 text-sm font-mono text-gray-500 mb-12 uppercase tracking-widest">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatBlogDate(metadata.date)}</span>
              </div>
              {metadata.tags && metadata.tags.length > 0 && (
                <>
                  <span className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center space-x-2">
                    {metadata.tags.map((tag: string, index: number) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-12 text-black">
              {metadata.title}
            </h1>
          </div>
        </header>
      )}

      {/* Article Content */}
      <div className="px-6 pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <BlogContent />
          </div>
        </div>
      </div>

      {/* Article Footer */}
      <footer className="bg-gray-50 py-32 px-6 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Thanks for reading</h3>
          <p className="text-gray-600 mb-12 text-lg leading-relaxed">
            If you found this article helpful, feel free to share it or reach out to discuss more
            about frontend engineering.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold tracking-wide">Return to Overview</span>
          </button>
        </div>
      </footer>
    </article>
  );
}

function BlogPostSkeleton() {
  return (
    <article className="min-h-screen bg-white">
      {/* Navigation skeleton */}
      <nav className="pt-32 pb-6 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </nav>

      {/* Header skeleton */}
      <header className="pt-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-48 bg-gray-200 rounded mb-12 animate-pulse" />
          <div className="h-16 bg-gray-200 rounded w-3/4 animate-pulse mb-12" />
        </div>
      </header>

      {/* Content skeleton */}
      <div className="px-6 pb-32">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        </div>
      </div>
    </article>
  );
}
