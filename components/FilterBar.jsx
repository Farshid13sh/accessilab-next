"use client";

import { useState } from 'react'

const FILTERS = [
  { key: 'blur',       label: 'Far-Sightedness', desc: 'Focal blur simulation'    },
  { key: 'protanopia', label: 'Protanopia',       desc: 'Red-cone deficiency'      },
  { key: 'tritanopia', label: 'Tritanopia',       desc: 'Blue-yellow deficiency'   },
  { key: 'contrast',   label: 'Contrast Loss',   desc: 'Low contrast sensitivity' },
  { key: 'tunnel',     label: 'Tunnel Vision',   desc: 'Peripheral vision loss'   },
  { key: 'mono',       label: 'Monochromacy',    desc: 'Total colour blindness'   },
]

export default function FilterBar({ activeFilters, onToggle }) {
  const [isOpen, setIsOpen] = useState(false)
  const activeCount = FILTERS.filter(({ key }) => activeFilters[key]).length

  return (
    <>
      {/* Tap-outside backdrop — only present when panel is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom sheet — mobile only, fixed so it clears any overflow:hidden parent */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >

        {/* ── Expandable filter grid ───────────────────────────────── */}
        <div
          id="mobile-filter-panel"
          role="region"
          aria-label="Impairment filter controls"
          className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-85' : 'max-h-0'}`}
        >
          <div className="bg-slate-950/98 px-3 pb-3 pt-4 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-2">
              {FILTERS.map(({ key, label, desc }) => {
                const isActive = activeFilters[key]
                return (
                  <button
                    key={key}
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    aria-label={`${label} — ${isActive ? 'on' : 'off'}`}
                    onClick={() => onToggle(key)}
                    className={`
                      flex min-h-18 flex-col justify-between rounded-2xl border p-3
                      text-left transition-all duration-150
                      active:scale-[0.97]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950
                      ${isActive
                        ? 'border-yellow-500/50 bg-yellow-500/10 shadow-lg shadow-yellow-500/10'
                        : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }
                    `}
                  >
                    {/* Top row: label + switch */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-bold leading-tight ${isActive ? 'text-yellow-400' : 'text-slate-200'}`}>
                        {label}
                      </span>
                      {/* Toggle switch — same visual as sidebar */}
                      <div
                        aria-hidden="true"
                        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${isActive ? 'bg-yellow-500' : 'bg-slate-700'}`}
                      >
                        <span className={`mt-0.5 ml-0.5 inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    {/* Bottom row: description */}
                    <span className={`text-[9px] font-mono uppercase tracking-wide ${isActive ? 'text-yellow-500/60' : 'text-slate-600'}`}>
                      {desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Persistent handle bar ────────────────────────────────── */}
        <div className="border-t border-slate-800 bg-slate-900">

          {/* Drag indicator pill */}
          <div className="flex justify-center pt-2" aria-hidden="true">
            <div className="h-1 w-10 rounded-full bg-slate-700" />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-filter-panel"
            aria-label={`${isOpen ? 'Close' : 'Open'} impairment filters`}
            className="flex min-h-11 w-full items-center justify-between px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200">Impairment Filters</span>

              {/* Active-count badge */}
              {activeCount > 0 ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-500 px-1.5 text-[9px] font-black text-slate-900">
                  {activeCount}
                </span>
              ) : (
                <span className="text-[10px] text-slate-600 font-mono">none active</span>
              )}
            </div>

            {/* Chevron — rotates when open */}
            <svg
              aria-hidden="true"
              className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>

      </div>
    </>
  )
}
