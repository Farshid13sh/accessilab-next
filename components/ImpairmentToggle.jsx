"use client";

export default function ImpairmentToggle({ label, isActive, onToggle, onInfo }) {
  return (
    <div className="flex min-h-[48px] items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/50 px-3 py-2">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-semibold text-slate-200">{label}</span>
        <button
          type="button"
          onClick={onInfo}
          aria-label={`Info about ${label}`}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:text-blue-400 transition-colors cursor-pointer text-xs"
        >
          ⓘ
        </button>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        aria-label={`Toggle ${label}`}
        onClick={onToggle}
        className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive ? 'bg-yellow-500' : 'bg-slate-700'}`}
      >
        <span
          className={`mt-0.5 ml-0.5 inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  )
}
