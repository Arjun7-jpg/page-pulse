import { ExternalLink, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-950/90 py-10 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
      <div className="space-y-3 text-slate-300">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Digital Heroes Training Task</p>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Built as a premium audit experience with modern motion, glass UI, and subtle performance-focused interactions.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <motion.a
          whileHover={{ y: -2 }}
          href="https://github.com/Arjun7-jpg/page-pulse"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-400/40 hover:bg-slate-950/90"
        >
          <GitBranch size={16} /> GitHub Repo
        </motion.a>
        <motion.a
          whileHover={{ y: -2 }}
          href="https://page-pulse-h9zm.onrender.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:border-violet-400/40 hover:bg-slate-950/90"
        >
          <ExternalLink size={16} /> Live Demo
        </motion.a>
      </div>
      <p className="text-xs text-slate-500">© {new Date().getFullYear()} Page Pulse. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
