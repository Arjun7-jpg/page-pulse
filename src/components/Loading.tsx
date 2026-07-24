import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
          <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
          Auditing page…
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-3xl bg-slate-900/80 p-4 shadow-inner shadow-slate-950/20">
              <div className="mb-3 h-4 w-1/2 animate-pulse rounded-full bg-slate-800" />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="h-10 animate-pulse rounded-2xl bg-slate-800" />
                <div className="h-10 animate-pulse rounded-2xl bg-slate-800" />
                <div className="h-10 animate-pulse rounded-2xl bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loading;
