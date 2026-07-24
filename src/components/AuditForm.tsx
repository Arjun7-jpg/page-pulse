import { useState } from 'react';
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
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">Audit form</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Analyze any public web page</h2>
          </div>
          <label className="text-sm text-slate-300" htmlFor="url">
            URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none ring-0 transition focus:border-violet-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Auditing…' : 'Run audit'}
          </button>
        </div>
        {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
      </form>

      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl shadow-slate-950/30">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-400">Quick glance</p>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li>• Fetches the page content through the backend</li>
          <li>• Extracts metadata, visible text, and image count</li>
          <li>• Returns response time and a compact summary</li>
        </ul>
        {result?.data ? (
          <div className="mt-6 rounded-2xl border border-emerald-800/50 bg-emerald-950/20 p-4 text-sm text-emerald-300">
            Audit completed for <span className="font-semibold">{result.data.url}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AuditForm;
