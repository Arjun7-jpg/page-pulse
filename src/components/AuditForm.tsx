import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import PremiumButton from './PremiumButton';
import PremiumInput from './PremiumInput';
import type { AuditResponse } from '../types';

interface AuditFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  result: AuditResponse | null;
}

const AuditForm = ({ onSubmit, loading, error, result }: AuditFormProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(url.trim());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/90">Audit form</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Analyze any public web page</h2>
          </div>
          <label className="text-sm text-slate-300" htmlFor="url">
            URL
          </label>
          <PremiumInput
            id="url"
            type="url"
            value={url}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PremiumButton type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Auditing…' : 'Run audit'}
            </PremiumButton>
            <PremiumButton type="button" variant="secondary" disabled className="w-full sm:w-auto">
              Premium analysis
            </PremiumButton>
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
      </motion.form>

      <motion.div
        className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">Quick glance</p>
          <ArrowRight size={18} className="text-slate-400" />
        </div>
        <ul className="mt-6 space-y-4 text-sm text-slate-300">
          <li>• Fetches the page content through the backend</li>
          <li>• Extracts metadata, visible text, and image count</li>
          <li>• Returns response time and a compact summary</li>
        </ul>
        {result?.data ? (
          <div className="mt-6 rounded-[1.75rem] border border-emerald-500/10 bg-emerald-500/5 p-5 text-sm text-emerald-200">
            Audit completed for <span className="font-semibold text-white">{result.data.url}</span>
          </div>
        ) : (
          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-400">
            Enter a page URL to view a premium audit summary with instant feedback and polished results.
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default AuditForm;
