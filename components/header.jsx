"use client";

export default function Header({ setIsSidebarOpen, currentUrl, currentView }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 lg:px-6">
      <button
        type="button"
        aria-label="Open controls panel"
        aria-controls="control-sidebar"
        onClick={() => setIsSidebarOpen(true)}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 lg:hidden"
      >
        ☰ <span className="hidden sm:inline">Controls</span>
      </button>

      {/* Spacer so status bar stays right-aligned on lg where button is hidden */}
      <div className="hidden lg:block" />

      <p className="max-w-40 truncate rounded-md border border-slate-800 bg-slate-950/80 px-3 py-1 text-[11px] font-mono text-slate-400 sm:max-w-xs md:max-w-sm">
        {currentView === 'workspace' ? `Frame: ${currentUrl}` : 'Mode: WCAG Research'}
      </p>
    </header>
  )
}
