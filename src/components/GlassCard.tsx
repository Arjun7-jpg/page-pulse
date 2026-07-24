import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = '' }: GlassCardProps) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.005 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className={`rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
