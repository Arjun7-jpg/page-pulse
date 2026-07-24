import { motion } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';

const links = [
  { label: 'Overview', href: '#overview' },
  { label: 'Features', href: '#features' },
  { label: 'Results', href: '#results' },
];

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-white no-underline">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500/20 via-sky-400/15 to-cyan-300/10 text-slate-100 shadow-[0_25px_80px_-40px_rgba(56,189,248,0.9)] transition-transform duration-500 hover:-translate-y-0.5">
            <Sparkles size={20} className="text-cyan-300" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.45em] text-slate-300">Page Pulse</p>
            <p className="text-xs text-slate-500">Audit studio</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group text-sm font-medium text-slate-300 transition hover:text-white">
              {link.label}
              <span className="block h-[1px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Arjun7-jpg/page-pulse"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-slate-900"
          >
            <Layers size={16} /> Source
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
