import { motion, type HTMLMotionProps } from 'framer-motion';

const PremiumInput = ({ className = '', ...props }: HTMLMotionProps<'input'>) => (
  <motion.input
    whileFocus={{ scale: 1.005 }}
    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    className={`w-full rounded-3xl border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.8)] outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400/20 ${className}`}
    {...props}
  />
);

export default PremiumInput;
