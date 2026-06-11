"use client";

export default function MetricCard({ stat, title, description, footerLabel, footer, source, sourceLabel }) {
  return (
    <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:p-6 shadow-xl">
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-3xl font-black font-mono text-amber-500 tracking-tight md:text-4xl">
            {stat}
          </span>
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[9px] font-mono text-blue-400 underline transition-colors hover:text-blue-300"
          >
            {sourceLabel} ↗
          </a>
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-white">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-300">{description}</p>
      </div>
      <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-400">
        <span className="mb-1 block text-[10px] font-bold font-mono uppercase text-blue-400">
          {footerLabel}
        </span>
        {footer}
      </div>
    </div>
  )
}
