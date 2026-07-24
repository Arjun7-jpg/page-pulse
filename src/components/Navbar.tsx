const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">Page Pulse</p>
          <p className="text-xs text-slate-400">Website audit studio</p>
        </div>
        <div className="rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-sm text-slate-300">
          React + Tailwind + Express
        </div>
      </div>
    </header>
  );
};

export default Navbar;
