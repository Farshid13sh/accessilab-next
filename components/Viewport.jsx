"use client";

import { useState, useEffect, useRef } from 'react'

export default function Viewport({
  currentUrl,
  urlInput,
  setUrlInput,
  onUrlSubmit,
  isBlurActive,
  isProtanopiaActive,
  isTritanopiaActive,
  isLowContrastActive,
  isTunnelVisionActive,
  isAchromatopsiaActive,
  auditReport, // Incoming AI state from page.js
  isLoading    // Incoming loading flag from page.js
}) {
  const [pos, setPos] = useState({ x: '50%', y: '50%' })
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isTunnelVisionActive) return

    const update = (clientX, clientY) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setPos({
        x: `${(((clientX - rect.left) / rect.width) * 100).toFixed(2)}%`,
        y: `${(((clientY - rect.top) / rect.height) * 100).toFixed(2)}%`,
      })
    }

    const onMouse = (e) => update(e.clientX, e.clientY)
    const onTouch = (e) => { const t = e.touches[0]; update(t.clientX, t.clientY) }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [isTunnelVisionActive])

  const iframeFilter = [
    isProtanopiaActive    && 'url(#protanopia-filter)',
    isTritanopiaActive    && 'url(#tritanopia-filter)',
    isAchromatopsiaActive && 'grayscale(100%)',
    isLowContrastActive   && 'contrast(45%) brightness(110%)',
    isBlurActive          && 'blur(4px)',
  ].filter(Boolean).join(' ')

  // Controls visibility toggle for the split panel
  const isPanelActive = isLoading || auditReport;

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col bg-slate-950">

      {/* URL bar — editable on mobile, display-only on desktop */}
      <div className="shrink-0 border-b border-slate-800 bg-slate-900">
        {/* Mobile: editable form */}
        <form
          onSubmit={onUrlSubmit}
          className="flex items-center gap-2 px-3 py-2 md:hidden"
        >
          <input
            type="url"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com"
            aria-label="Website URL"
            className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
          >
            Go
          </button>
        </form>

        {/* Desktop: static display */}
        <div className="hidden items-center justify-between px-4 py-2 text-xs font-mono text-slate-400 select-none md:flex">
          <span className="truncate min-w-0">
            Frame: <strong className="font-medium text-white">{currentUrl}</strong>
          </span>
          <span className="ml-2 shrink-0 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">
            SANDBOX
          </span>
        </div>
      </div>

      {/* Mobile notice */}
      <div className="shrink-0 border-b border-amber-900/40 bg-amber-950/30 px-3 py-1.5 text-[10px] text-amber-400/80 md:hidden">
        Some sites block iframes — open Controls to apply filters or switch to Research.
      </div>

      {/* Main Workspace Split Layout */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        
        {/* Webpage Sandbox Viewport */}
        <div className="relative flex-1 bg-white overflow-hidden h-full">
          {isTunnelVisionActive && (
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background: `radial-gradient(circle 100px at ${pos.x} ${pos.y}, transparent 0%, rgba(15,23,42,0.98) 100%)`
              }}
            />
          )}

          <iframe
            src={currentUrl}
            title="Accessibility Target Viewport"
            style={{ filter: iframeFilter || undefined }}
            className={`h-full w-full border-none bg-white ${isTunnelVisionActive ? 'pointer-events-none' : 'pointer-events-auto'}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>

        {/* Split Panel: AI Audit Dashboard */}
        {isPanelActive && (
          <div className="flex h-2/5 w-full flex-col border-t border-slate-800 bg-slate-950 md:h-full md:w-[380px] md:border-t-0 md:border-l lg:w-[440px] shrink-0 overflow-hidden">
            
            {/* Panel Tab Header */}
            <div className="flex h-10 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/40 px-4">
              <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase font-mono">
                ⚡ AccessiLab AI Engine
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-mono text-slate-500">{isLoading ? 'ANALYZING' : 'READY'}</span>
              </div>
            </div>

            {/* Panel Sheet Body */}
            <div className="flex-1 overflow-y-auto p-4 font-sans text-xs text-slate-300 custom-scrollbar selection:bg-yellow-500 selection:text-slate-950">
              {isLoading ? (
                /* Bauhaus Minimalist Skeleton Pulse Loader */
                <div className="space-y-4 animate-pulse pt-2">
                  <div className="h-4 w-1/3 rounded bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-slate-800" />
                    <div className="h-3 w-5/6 rounded bg-slate-800" />
                    <div className="h-3 w-4/5 rounded bg-slate-800" />
                  </div>
                  <div className="h-px bg-slate-800 my-4" />
                  <div className="h-4 w-1/4 rounded bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-slate-800" />
                    <div className="h-3 w-11/12 rounded bg-slate-800" />
                  </div>
                </div>
              ) : (
                /* Audit Report Markdown Text Render Sheet */
                <div className="prose prose-invert max-w-none text-slate-300 selection:bg-yellow-400">
                  <p className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed tracking-normal">
                    {auditReport}
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* SVG color-blindness filter definitions */}
      <svg className="absolute h-0 w-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
          </filter>
        </defs>
      </svg>

    </div>
  )
}