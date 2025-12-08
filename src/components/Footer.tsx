export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="font-mono text-xs text-gray-500 tracking-widest uppercase">
            {new Date().getFullYear()} Jon Sadka
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-xs font-mono text-gray-500 tracking-widest uppercase">
              Based in Los Angeles
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
