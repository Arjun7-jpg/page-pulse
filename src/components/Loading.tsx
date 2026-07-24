const Loading = () => {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300 shadow-lg shadow-slate-950/30">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 animate-bounce rounded-full bg-violet-400" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-sky-400 [animation-delay:120ms]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-emerald-400 [animation-delay:240ms]" />
        <span className="ml-2 text-sm font-medium">Auditing page…</span>
      </div>
    </div>
  );
};

export default Loading;
