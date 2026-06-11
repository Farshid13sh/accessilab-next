"use client";

export default function Header({ 
  setIsSidebarOpen, 
  currentUrl, 
  currentView, 
  onRunAudit, 
  isLoading 
}) {
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

      {/* Right Aligned Controls Wrapper */}
      <div className="flex items-center gap-2">
        <p className="max-w-40 truncate rounded-md border border-slate-800 bg-slate-950/80 px-3 py-1 text-[11px] font-mono text-slate-400 sm:max-w-xs md:max-w-sm">
          {currentView === 'workspace' ? `Frame: ${currentUrl}` : 'Mode: WCAG Research'}
        </p>

        {/* Run AI Audit Button — Only visible when inside the active simulator view */}
        {currentView === 'workspace' && (
          <button
            type="button"
            onClick={onRunAudit}
            disabled={isLoading}
            aria-busy={isLoading}
            className={`
              flex h-7 items-center justify-center rounded-md px-3 text-[11px] font-bold transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900
              ${isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-yellow-500 text-slate-950 hover:bg-yellow-400 active:scale-[0.97]'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <svg className="h-3 w-3 animate-spin text-slate-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Auditing...
              </span>
            ) : (
              'Run AI Audit'
            )}
          </button>
        )}
      </div>
    </header>
  )
}