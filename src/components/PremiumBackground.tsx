import { motion } from 'framer-motion';

const PremiumBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(94,64,255,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.08),_transparent_30%)]" />
      <motion.div
        className="absolute left-[-20%] top-[-15%] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-18%] top-[20%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[-18%] h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"
        animate={{ x: [0, 12, 0], y: [0, -16, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_40%)] opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.02),_transparent_15%,_rgba(255,255,255,0.03))]" />
    </div>
  );
};

export default PremiumBackground;
