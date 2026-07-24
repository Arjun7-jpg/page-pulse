import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import AuditForm from './components/AuditForm';
import Loading from './components/Loading';
import ResultCards from './components/ResultCards';
import type { AuditResponse } from './types';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = async (url: string) => {
    if (!url) {
      setError('Please provide a valid URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiBaseUrl = (import.meta.env.VITE_API_URL ?? '').trim();
      const auditUrl = apiBaseUrl ? `${apiBaseUrl}/api/audit` : '/api/audit';
      const response = await fetch(auditUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const payload = (await response.json()) as AuditResponse;
      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.message ?? 'The audit request failed.');
      }

      setResult(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const copyJson = async () => {
    if (!result?.data) {
      return;
    }

    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  };

  const themeClass = useMemo(() => (darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'), [darkMode]);

  return (
    <div className={`min-h-screen transition-colors ${themeClass}`}>
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="flex flex-col gap-4 rounded-[2rem] border border-slate-800/70 bg-gradient-to-br from-violet-600/20 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-slate-950/30 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">Take-home assignment</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Turn any page into a quick audit snapshot.</h1>
            <p className="mt-4 text-lg text-slate-300">
              Inspect titles, metadata, visible text, and page health from one simple experience.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400"
          >
            {darkMode ? 'Switch to light' : 'Switch to dark'}
          </button>
        </section>

        <AuditForm onSubmit={handleSubmit} loading={loading} error={error} result={result} />

        {loading ? <Loading /> : null}

        {result?.data ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Results</h2>
              <button
                type="button"
                onClick={copyJson}
                className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400"
              >
                Copy JSON
              </button>
            </div>
            <ResultCards data={result.data} />
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default App;
