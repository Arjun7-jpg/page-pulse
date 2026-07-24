import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from './components/Navbar';
import AuditForm from './components/AuditForm';
import Loading from './components/Loading';
import ResultCards from './components/ResultCards';
import PremiumBackground from './components/PremiumBackground';
import Footer from './components/Footer';
import type { AuditResponse } from './types';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);

  const handleSubmit = async (url: string) => {
    if (!url) {
      setError('Please provide a valid URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiBaseUrl = (import.meta.env.VITE_API_URL ?? 'https://page-pulse-h9zm.onrender.com').trim();
      const auditUrl = `${apiBaseUrl}/api/audit`;
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

  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <PremiumBackground />
      <Navbar />
      <main className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl lg:p-12"
          id="overview"
        >
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
                Audit engine
              </p>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Transform any page into a <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-sky-200 bg-clip-text text-transparent">high-impact audit snapshot</span>.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Analyze titles, metadata, visible text, and performance signals with a polished dashboard built for modern teams.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Start audit
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-950/75 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-slate-500 hover:bg-slate-900/90"
                >
                  View sample results
                </button>
              </div>
            </div>
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
              <div className="absolute left-4 top-4 h-3 w-16 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 opacity-70" />
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Live example</p>
              <div className="mt-6 space-y-4 rounded-[1.75rem] bg-slate-900/80 p-6 ring-1 ring-white/5">
                <div className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-slate-950/25">
                  <p className="text-sm text-slate-300">Live audit preview</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Example Domain</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Response</p>
                    <p className="mt-2 text-xl font-semibold text-white">200 OK</p>
                  </div>
                  <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Load</p>
                    <p className="mt-2 text-xl font-semibold text-white">120 ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section id="features" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">How it works</p>
              <h2 className="text-3xl font-semibold text-white">A modern workflow for page analysis.</h2>
              <p className="max-w-2xl text-slate-300">
                Enter a URL, click run audit, and receive a structured result summary that highlights page metadata, visibility, image count, and response time.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Fast audit', description: 'Instant page evaluation with minimal UI noise.' },
                { title: 'Premium visual design', description: 'Glassmorphism, motion, and elegant spacing.' },
                { title: 'Secure backend', description: 'Express-powered audit API with CORS protection.' },
                { title: 'Fully responsive', description: 'Designed for desktop, tablet, and mobile.' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div id="audit-form">
            <AuditForm onSubmit={handleSubmit} loading={loading} error={error} result={result} />
          </div>
        </section>

             {loading ? <Loading /> : null}

        {result?.data && (
          <section id="results" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
                  Results
                </p>
                <h2 className="text-3xl font-semibold text-white">
                  Your audit summary
                </h2>
              </div>

              <button
                type="button"
                onClick={copyJson}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-950/75 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-slate-500 hover:bg-slate-900/90"
              >
                Copy JSON
              </button>
            </div>

            <ResultCards data={result.data} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;