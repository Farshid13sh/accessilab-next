"use client";

import React, { useState, useRef, useEffect } from 'react'; 
import ImpairmentToggle from './ImpairmentToggle';

export default function Sidebar({
  isOpen,
  setIsOpen,
  isBlurActive,
  setIsBlurActive,
  isProtanopiaActive,
  setIsProtanopiaActive,
  isTritanopiaActive,
  setIsTritanopiaActive,
  isLowContrastActive,
  setIsLowContrastActive,
  isTunnelVisionActive,
  setIsTunnelVisionActive,
  isAchromatopsiaActive,
  setIsAchromatopsiaActive,
  urlInput,
  setUrlInput,
  onUrlSubmit,
  currentView,
  setCurrentView
}) {
  const [modalData, setModalData] = useState(null)
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  const [textColor, setTextColor] = useState('#3B82F6')
  const [bgColor, setBgColor] = useState('#0F172A')

  const infoProfiles = {
    blur: {
      title: "Far-Sightedness (Presbyopia / Focal Blur)",
      description: "An age-related condition where the eye's lens hardens and loses the flexibility needed to focus on close objects. Small text, dense UI labels, and fine detail become progressively blurry — especially on high-DPI or small screens.",
      stats: "Over 826 million people globally are affected by unaddressed presbyopia (WHO). It impacts nearly everyone over the age of 45, making it one of the most widespread visual conditions on the planet.",
      remedy: "Use relative font units (rem/em) instead of fixed pixels. Set a minimum body font size of 16px. Ensure all text and UI scales correctly with browser zoom up to 200% without overflow or content loss.",
      link: "https://www.who.int/publications/i/item/9789241516570"
    },
    protanopia: {
      title: "Protanopia (Red-Cone Deficiency)",
      description: "A form of red-green color blindness where the red-sensitive cone cells are absent or non-functional. Reds appear dark brown or black, and any distinction between red and green becomes invisible — affecting traffic lights, status indicators, and form error states.",
      stats: "Affects approximately 1% of males globally. Combined with Deuteranopia (green-blindness), red-green color blindness impacts around 8% of men and 0.5% of women worldwide — roughly 300 million people.",
      remedy: "Never use red vs. green alone to convey state (e.g. error vs. success). Always pair color with a distinct icon, label, or pattern. Use shapes and text to communicate meaning independently of hue.",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/general/G14"
    },
    tritanopia: {
      title: "Tritanopia (Blue-Yellow Deficiency)",
      description: "A rare form of color blindness caused by absent or non-functional blue cone cells. Blues appear green, yellows shift to pink or violet, and blue-yellow contrasts become completely indistinguishable. Unlike red-green blindness, it can also be acquired through aging or eye disease.",
      stats: "Tritanopia occurs in fewer than 1 in 10,000 people worldwide, making it significantly rarer than red-green color blindness. Acquired forms are more common and increase with age.",
      remedy: "Avoid relying on blue vs. yellow or blue vs. green contrast alone to communicate information. Supplement all color-coded UI with labels, icons, or luminance differences that remain distinguishable in greyscale.",
      link: "https://www.nih.gov/"
    },
    contrast: {
      title: "Low Contrast Sensitivity",
      description: "A reduced ability to distinguish between elements when the luminance difference between foreground and background is low. Caused by cataracts, glaucoma, diabetic retinopathy, and normal aging. Also triggered situationally — bright sunlight on a phone screen, low-quality displays, or eye fatigue.",
      stats: "Over 253 million people globally live with vision impairment, with contrast sensitivity loss as a major component. Billions more experience situational contrast issues daily on mobile devices in poor lighting conditions.",
      remedy: "Meet the WCAG AA minimum of 4.5:1 contrast ratio for standard body text, and 3:1 for large text (18px+ bold or 24px+). Use the Luminance Calculator in this panel to verify color pairs before shipping.",
      link: "https://webaim.org/articles/contrast/"
    },
    tunnel: {
      title: "Tunnel Vision (Peripheral Vision Loss)",
      description: "A condition where only the central field of vision remains intact, eliminating all peripheral awareness. Users can only see a narrow area at a time, making navigation, scanning layouts, and locating off-screen UI elements extremely difficult. Caused by glaucoma, retinitis pigmentosa, or stroke.",
      stats: "Glaucoma alone affects over 80 million people worldwide (WHO) and is the leading cause of irreversible blindness. Retinitis pigmentosa affects approximately 1 in 4,000 individuals globally.",
      remedy: "Place error messages, alerts, and key actions close to the triggering element — never in a distant corner. Avoid relying on sidebar or header UI for critical feedback. Use inline validation and contextual popups near user focus points.",
      link: "https://www.w3.org/WAI/people-use-web/abilities/#vision"
    },
    achromatopsia: {
      title: "Total Achromatopsia (Complete Monochromacy)",
      description: "A rare congenital condition where all cone cells are absent or non-functional. The person perceives the world entirely in shades of grey, with no ability to distinguish any color frequency. It is often accompanied by severe light sensitivity (photophobia) and reduced visual acuity.",
      stats: "Total achromatopsia affects approximately 1 in 30,000 people worldwide. Partial forms affecting some cone types are more common. For those affected, any color-only UI convention is completely invisible.",
      remedy: "Design so all information is conveyed through luminance, shape, hierarchy, and labels alone — never color. Test your entire UI in full greyscale mode. Icons and visual weight must carry all meaning color would otherwise provide.",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
    }
  }

  const getRelativeLuminance = (hex) => {
    const cleanHex = hex.replace('#', '')
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255
    const transform = (val) => val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b)
  }

  const calculateContrastRatio = (color1, color2) => {
    const lum1 = getRelativeLuminance(color1)
    const lum2 = getRelativeLuminance(color2)
    return ((Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)).toFixed(2)
  }

  const contrastRatio = calculateContrastRatio(textColor, bgColor)

  const openModal = (type, e) => {
    triggerRef.current = e.currentTarget
    setModalData(infoProfiles[type])
  }

  const closeModal = () => {
    setModalData(null)
    if (triggerRef.current) triggerRef.current.focus()
  }

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') closeModal() }
    if (modalData) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalData])

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="control-sidebar"
        aria-label="Application Control Panel"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-800 bg-slate-900 transition-transform duration-300 ease-in-out lg:static lg:max-w-none lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Branding + close button */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h1 className="text-sm font-black italic uppercase tracking-widest text-yellow-500">
              AccessiLab 2D
            </h1>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-400">
              {currentView === 'workspace' ? 'Workspace Mode' : 'Analytics Mode'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close controls panel"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <nav aria-label="Workspace Views" className="shrink-0 px-5 pt-4">
          <div
            role="tablist"
            className="grid grid-cols-2 gap-1 rounded-lg border border-slate-800/80 bg-slate-950 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={currentView === 'workspace'}
              onClick={() => setCurrentView('workspace')}
              className={`cursor-pointer rounded-md py-2 text-xs font-medium transition-colors focus-visible:outline-none ${currentView === 'workspace' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Sandbox
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={currentView === 'research'}
              onClick={() => setCurrentView('research')}
              className={`cursor-pointer rounded-md py-2 text-xs font-medium transition-colors focus-visible:outline-none ${currentView === 'research' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Research
            </button>
          </div>
        </nav>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-5 scrollbar-none select-none">
          {currentView === 'workspace' ? (
            <div className="space-y-5">

              {/* URL input */}
              <form onSubmit={onUrlSubmit} className="space-y-1.5">
                <label
                  htmlFor="url-sandbox-input"
                  className="block text-[10px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Test Live Site
                </label>
                <div className="flex gap-2">
                  <input
                    id="url-sandbox-input"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., example.com"
                  />
                  <button
                    type="submit"
                    className="shrink-0 cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium transition-colors hover:bg-blue-500"
                  >
                    Go
                  </button>
                </div>
              </form>

              {/* Impairment toggles */}
              <section aria-label="Impairment Simulators" className="space-y-2">
                <h2 className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Impairment Modifiers
                </h2>
                <ImpairmentToggle label="Far-Sightedness"  isActive={isBlurActive}          onToggle={() => setIsBlurActive(!isBlurActive)}                   onInfo={(e) => openModal('blur', e)} />
                <ImpairmentToggle label="Protanopia"       isActive={isProtanopiaActive}     onToggle={() => setIsProtanopiaActive(!isProtanopiaActive)}       onInfo={(e) => openModal('protanopia', e)} />
                <ImpairmentToggle label="Tritanopia"       isActive={isTritanopiaActive}     onToggle={() => setIsTritanopiaActive(!isTritanopiaActive)}       onInfo={(e) => openModal('tritanopia', e)} />
                <ImpairmentToggle label="Contrast Loss"    isActive={isLowContrastActive}    onToggle={() => setIsLowContrastActive(!isLowContrastActive)}    onInfo={(e) => openModal('contrast', e)} />
                <ImpairmentToggle label="Tunnel Vision"    isActive={isTunnelVisionActive}   onToggle={() => setIsTunnelVisionActive(!isTunnelVisionActive)}  onInfo={(e) => openModal('tunnel', e)} />
                <ImpairmentToggle label="Monochromacy"     isActive={isAchromatopsiaActive}  onToggle={() => setIsAchromatopsiaActive(!isAchromatopsiaActive)} onInfo={(e) => openModal('achromatopsia', e)} />
              </section>

              {/* Contrast calculator */}
              <section
                aria-label="Contrast Ratio Calculator"
                className="space-y-2 border-t border-slate-800/80 pt-4"
              >
                <h2 className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Luminance Calculator
                </h2>
                <div className="space-y-3 rounded-xl border border-slate-800/60 bg-slate-950 p-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="block text-[9px] font-mono uppercase text-slate-400">Text (FG)</span>
                      <div className="flex items-center gap-1.5 rounded-md border border-slate-700/60 bg-slate-900 px-1.5 py-1.5">
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="h-5 w-5 shrink-0 cursor-pointer rounded border-none bg-transparent"
                        />
                        <span className="truncate text-[10px] font-mono uppercase text-white">{textColor}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[9px] font-mono uppercase text-slate-400">Back (BG)</span>
                      <div className="flex items-center gap-1.5 rounded-md border border-slate-700/60 bg-slate-900 px-1.5 py-1.5">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="h-5 w-5 shrink-0 cursor-pointer rounded border-none bg-transparent"
                        />
                        <span className="truncate text-[10px] font-mono uppercase text-white">{bgColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Ratio</span>
                    <span className={`font-mono text-sm font-black ${contrastRatio >= 4.5 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {contrastRatio} : 1
                    </span>
                  </div>

                  <div className="space-y-1.5 border-t border-slate-900 pt-2 text-[10px] leading-normal text-slate-400">
                    <p><strong>What it measures:</strong> Relative luminance determines how bright a color feels to human photoreceptors.</p>
                    <p>
                      Because our eyes are biologically more sensitive to green wavelengths, the math weights channels explicitly:
                      <code className="mt-1 block rounded border border-slate-800 bg-slate-900 p-1 text-[9px] font-mono text-amber-500">
                        Y = 0.2126R + 0.7152G + 0.0722B
                      </code>
                    </p>
                    <p className="text-[9px] italic text-slate-500">
                      💡 Aim for a minimum baseline target of 4.5:1 for standard text layout compliance.
                    </p>
                  </div>
                </div>
              </section>

            </div>
          ) : (
            <div className="space-y-4" role="status">
              <h2 className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Research Index
              </h2>
              <div className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-950 p-4 text-xs leading-relaxed">
                <p className="text-slate-300">
                  You are exploring the{' '}
                  <strong className="font-medium text-yellow-500">Empirical Compliance Metrics</strong> grid.
                </p>
                <p className="text-[11px] text-slate-400">
                  The interactive simulation modifiers are hidden in this view because you are looking at compliance documentation rather than an active website sandbox viewport iframe.
                </p>
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-[11px] font-mono text-slate-400">
                  💡 Toggle back to <strong className="font-medium text-white">Sandbox</strong> above to audit a live website layout.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-800 px-5 py-3 text-[10px] font-mono text-slate-500">
          system.status: tracking
        </div>
      </aside>

      {/* Info modal — bottom sheet on mobile, centered dialog on sm+ */}
      {modalData && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalRef}
            tabIndex="-1"
            className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl focus:outline-none sm:max-w-lg sm:rounded-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-bold leading-snug text-white">{modalData.title}</h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-400">What it is</span>
                <p className="text-xs leading-relaxed text-slate-300">{modalData.description}</p>
              </div>
              <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400">Who it affects</span>
                <p className="text-xs leading-relaxed text-slate-300">{modalData.stats}</p>
              </div>
              <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400">How to design around it</span>
                <p className="text-xs leading-relaxed text-slate-300">{modalData.remedy}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <a
                href={modalData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-blue-400 underline transition-colors hover:text-blue-300"
              >
                Source ↗
              </a>
              <button
                type="button"
                onClick={closeModal}
                className="min-h-11 rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
