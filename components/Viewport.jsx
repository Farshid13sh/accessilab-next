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
  isAchromatopsiaActive
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

  // Build the CSS filter string applied directly to the iframe element.
  // Applying filter to the iframe itself composites the effect onto its
  // rendered bitmap, which is the only reliable way to affect iframe content.
  const iframeFilter = [
    isProtanopiaActive    && 'url(#protanopia-filter)',
    isTritanopiaActive    && 'url(#tritanopia-filter)',
    isAchromatopsiaActive && 'grayscale(100%)',
    isLowContrastActive   && 'contrast(45%) brightness(110%)',
    isBlurActive          && 'blur(4px)',
  ].filter(Boolean).join(' ')

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

      {/* Canvas */}
      <div className="relative flex-1 overflow-hidden bg-white">

        {/* Tunnel vision overlay — radial gradient that follows cursor/touch */}
        {isTunnelVisionActive && (
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background: `radial-gradient(circle 100px at ${pos.x} ${pos.y}, transparent 0%, rgba(15,23,42,0.98) 100%)`
            }}
          />
        )}

        {/* Live site — all visual filters applied directly to the iframe element */}
        <iframe
          src={currentUrl}
          title="Accessibility Target Viewport"
          style={{ filter: iframeFilter || undefined }}
          className={`h-full w-full border-none bg-white ${isTunnelVisionActive ? 'pointer-events-none' : 'pointer-events-auto'}`}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>

      {/* SVG color-blindness filter definitions (must live in the host document) */}
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
