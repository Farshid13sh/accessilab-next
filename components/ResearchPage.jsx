"use client"

import MetricCard from './MetricCard'

const visualMetrics = [
  {
    stat: '1.3 Billion',
    title: 'Global Population Impacted',
    description: 'About 16% of the global population experiences significant disability. Inaccessible digital environments inherently lock out this enormous consumer block from basic daily web tools.',
    footerLabel: 'Architecture Impact',
    footer: 'Establishes an undeniable legal and functional baseline requiring global programmatic layout accessibility.',
    source: 'https://www.who.int/news-room/fact-sheets/detail/disability-and-health',
    sourceLabel: 'WHO Disability',
  },
  {
    stat: '95.9%',
    title: 'The WCAG Failure Baseline',
    description: 'An exhaustive automated sweep across the top 1,000,000 homepages discovered that 95.9% had distinct, detectable WCAG 2 failures — overwhelmingly caused by low-contrast typography choices.',
    footerLabel: 'Engineering Remedy',
    footer: 'Integrating automated contrast checking engines directly into frontend component tests entirely breaks this failure rate down.',
    source: 'https://webaim.org/projects/million/',
    sourceLabel: 'WebAIM Million',
  },
  {
    stat: '2.2 Billion',
    title: 'Visual Impairments Matrix',
    description: 'Over 2.2 billion individuals globally manage near or distance vision complications. Unaddressed presbyopia (far-sightedness / focal blur) forms a massive baseline segment, encompassing over 826 million people.',
    footerLabel: 'Fluid Fix',
    footer: <span>Enforce fluid, scalable layout grids using relative responsive units (<code className="font-mono text-[10px] text-amber-400">rem/em</code>) instead of static pixels.</span>,
    source: 'https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment',
    sourceLabel: 'WHO Vision',
  },
]

const colorMetrics = [
  {
    stat: '1 in 12 Men',
    title: 'Congenital Color Vision Deficiencies',
    description: 'Congenital color vision deficiencies affect roughly 8% of male populations and 0.5% of female populations globally. This primarily encompasses Protanopia (red-blindness) and Deuteranopia (green-blindness).',
    footerLabel: 'Design System Standard',
    footer: 'Never rely solely on color shifts (e.g., green indicators vs red alerts) to convey structural system state information. Supplement states with icons or clear labels.',
    source: 'https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness',
    sourceLabel: 'NIH Eye Institute',
  },
  {
    stat: '1 in 30,000',
    title: 'Total Achromatopsia Prevalence',
    description: "Achromatopsia completely limits the eye's cone cell system network, leaving individuals to process interface elements exclusively through luminance variations. Standard color-blind fallback states fail to address this condition natively.",
    footerLabel: 'Verification Strategy',
    footer: 'Audit your compositions completely in pure grayscale mode to ensure user flows remain recognizable through contrast weighting and shape hierarchies alone.',
    source: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
    sourceLabel: 'W3C Color Analytics',
  },
]

const pourPrinciples = [
  {
    index: '01',
    label: 'Perceivable',
    body: "Information and UI components cannot be invisible to all of a user's senses. Digital assets must be translatable into forms they can notice (e.g., clear alt text, flexible color-contrast channels).",
  },
  {
    index: '02',
    label: 'Operable',
    body: 'The interactive interface cannot require movements or mechanical inputs that a human cannot physically execute. Navigation must support multiple input structures, including robust keyboard-only controls.',
  },
  {
    index: '03',
    label: 'Understandable',
    body: 'Content operations cannot expand beyond user comprehension. Both the user interface and operation processes must behave predictably, featuring informative error prevention matrices.',
  },
  {
    index: '04',
    label: 'Robust',
    body: 'Code architecture must be sound enough to stay stable across a broad spectrum of evolving digital user environments, including specialized assistive screen readers and hardware platforms.',
  },
]

export default function ResearchPage() {
  return (
    <div className="w-full bg-slate-950 p-4 text-slate-100 select-none sm:p-6 md:p-8">

      {/* Page header */}
      <div className="mb-8 space-y-2 border-b border-slate-900 pb-6">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
          <span>Database Version 2026.1</span>
          <span>•</span>
          <span>Verified Sources</span>
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
          Empirical Compliance Metrics
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
          Universal design is grounded in rigorous mathematical and medical observations. Review the core statistical baselines compiled by global research organizations to guide your UI design engineering choices.
        </p>
      </div>

      {/* Section 1: Visual spectrum */}
      <section className="mb-10 space-y-4">
        <h2 className="text-[11px] font-bold font-mono uppercase tracking-widest text-slate-400">
          Visual Spectrum Limitations & Metrics
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {visualMetrics.map((card) => (
            <MetricCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* Section 2: Color perception */}
      <section className="mb-10 space-y-4">
        <h2 className="text-[11px] font-bold font-mono uppercase tracking-widest text-slate-400">
          Atypical Color Perception Profiles
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {colorMetrics.map((card) => (
            <MetricCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* Section 3: POUR framework */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900 pb-2">
          <h2 className="text-[11px] font-bold font-mono uppercase tracking-widest text-slate-400">
            The P.O.U.R. Structural Framework
          </h2>
          <a
            href="https://www.w3.org/TR/WCAG22/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-slate-400 underline transition-colors hover:text-white"
          >
            Official Spec Schema ↗
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pourPrinciples.map(({ index, label, body }) => (
            <div key={label} className="space-y-2 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 md:p-5">
              <div className="text-xs font-mono font-black text-blue-400">{index}. {label}</div>
              <p className="text-xs leading-relaxed text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
