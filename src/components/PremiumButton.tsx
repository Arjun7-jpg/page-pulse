import { motion, type HTMLMotionProps } from 'framer-motion';

interface PremiumButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary';
}

const variants = {
  primary:
    'bg-gradient-to-r from-violet-500 to-sky-400 text-white shadow-[0_20px_50px_-30px_rgba(79,70,229,0.8)] hover:from-violet-400 hover:to-cyan-400',
  secondary:
    'border border-slate-700 bg-slate-950/75 text-slate-100 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.8)] hover:border-slate-500 hover:bg-slate-900/90',
};

const PremiumButton = ({ variant = 'primary', children, className = '', ...props }: PremiumButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    className={`inline-flex items-center justify-center rounded-3xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default PremiumButton;
