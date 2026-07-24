import type { AuditData } from '../types';

interface ResultCardsProps {
  data: AuditData;
}

const statCards = [
  { label: 'Title', value: 'title' },
  { label: 'Meta description', value: 'metaDescription' },
  { label: 'Word count', value: 'wordCount' },
  { label: 'Images', value: 'imageCount' },
  { label: 'Response time', value: 'responseTime' },
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
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="md:col-span-2 xl:col-span-3 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">Audit summary</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{data.title ?? 'Untitled page'}</h3>
        <p className="mt-3 break-words text-sm text-slate-300">{data.metaDescription ?? 'No meta description found.'}</p>
      </div>
      {statCards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
          <p className="text-sm text-slate-400">{card.label}</p>
          <p className="mt-2 text-lg font-semibold text-white">{formatValue(card.value, data[card.value as keyof AuditData])}</p>
        </div>
      ))}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30 md:col-span-2">
        <p className="text-sm text-slate-400">Visible text preview</p>
        <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-300">{data.visibleText || 'No visible text found.'}</p>
      </div>
    </div>
  );
};

export default ResultCards;
