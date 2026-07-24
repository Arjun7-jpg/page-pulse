import { motion } from 'framer-motion';
import { BarChart3, Clock3, Image, MessageCircle, Zap } from 'lucide-react';
import type { AuditData } from '../types';

interface ResultCardsProps {
  data: AuditData;
}

const statCards = [
  { icon: BarChart3, label: 'Word count', value: 'wordCount' },
  { icon: Image, label: 'Images', value: 'imageCount' },
  { icon: Clock3, label: 'Response time', value: 'responseTime' },
];

const formatValue = (key: string, value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }
  if (key === 'responseTime') {
    return `${value} ms`;
  }
  return String(value);
};

const ResultCards = ({ data }: ResultCardsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="md:col-span-2 xl:col-span-3 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            <Zap size={18} />
            <span>Audit summary</span>
          </div>
          <h3 className="text-3xl font-semibold text-white">{data.title ?? 'Untitled page'}</h3>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">{data.metaDescription ?? 'No meta description found.'}</p>
        </div>
      </motion.div>

      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.45, ease: 'easeOut' }}
            className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30"
          >
            <div className="flex items-center gap-3 text-slate-300">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatValue(card.value, data[card.value as keyof AuditData])}</p>
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 md:col-span-2"
      >
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
          <MessageCircle size={18} />
          Visible text preview
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300 line-clamp-5">{data.visibleText || 'No visible text found.'}</p>
      </motion.div>
    </div>
  );
};

export default ResultCards;
