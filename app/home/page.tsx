import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FinVest Pro — AI Investment Intelligence for India',
  description: 'AI-powered financial planning: risk profiling, goal planning, retirement calculator, stock analysis for Indian investors.',
}

const FEATURES = [
  { icon:'◐', title:'Risk Profiler',      badge:'Free',    color:'var(--gold)',   desc:'10-question AI quiz maps your exact risk tolerance. Conservative to Ultra-Aggressive profile with allocation.' },
  { icon:'◎', title:'Goal Planner',       badge:'Basic+',  color:'var(--green)',  desc:'SIP calculations with milestone tracking. Home, education, wedding, retirement — any goal, any timeline.' },
  { icon:'◑', title:'Retirement Planner', badge:'Basic+',  color:'var(--purple)', desc:'Inflation-adjusted corpus calculation with interactive growth charts and monthly milestone tracking.' },
  { icon:'△', title:'Stock Analysis',     badge:'Pro+',    color:'var(--gold)',   desc:'Fundamental + technical AI analysis for NSE/BSE stocks. F&O data, sector comparison, AI verdict.' },
  { icon:'◇', title:'Portfolio Optimizer',badge:'Pro+',    color:'var(--blue)',   desc:'Modern Portfolio Theory allocation with India-specific NPT weightings and rebalancing alerts.' },
  { icon:'◈', title:'Global Events',      badge:'Pro+',    color:'var(--cyan)',   desc:'RBI policy, Budget, Fed decisions mapped to your portfolio impact. Real-time macro intelligence.' },
  { icon:'◉', title:'Market News',        badge:'Free',    color:'var(--text-2)', desc:'AI-curated financial news from 50+ Indian and global sources, updated every 5 minutes.' },
]

const STATS = [
  { value: '7',    label: 'AI Engines',      icon: '◈' },
  { value: '₹0',   label: 'To Start',        icon: '◯' },
  { value: '50+',  label: 'News Sources',    icon: '◉' },
  { value: 'SEBI', label: 'Compliant',       icon: '◐' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma',  role: 'Software Engineer, Bangalore', avatar: 'PS', plan: 'Pro',   text: 'Finally an app that explains risk in plain terms. My SIP is now goal-based, not random. The milestone tracker keeps me on track.' },
  { name: 'Rahul Gupta',   role: 'CA, Mumbai',                   avatar: 'RG', plan: 'Elite', text: 'The retirement calculator is more accurate than what I calculate manually. Inflation adjustment is spot-on.' },
  { name: 'Anita Verma',   role: 'Teacher, Delhi',               avatar: 'AV', plan: 'Basic', text: 'Used the goal planner for my daughter education fund. Got a clear SIP plan with monthly milestones instantly.' },
]

const NAV_LINKS = [
  ['Features', '#features'],
  ['Pricing', '/pricing'],
  ['Reviews', '/testimonials'],
  ['About', '/about'],
]

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-1)', minHeight: '100vh' }}>

      {/* ── Navbar ─────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'rgba(10,10,11,0.85)', backdropFilter: 'blur(20px) saturate(1.8)', borderBottom: '1px solid var(--border-1)' }}
      >
        <div className="page-container flex items-center justify-between h-14">
          <Link href="/home" className="flex items-center gap-2.5 select-none">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>F</div>
            <span className="font-semibold text-[15px]" style={{ fontFamily: 'var(--font-display)' }}>
              Finvest<span style={{ color: 'var(--gold)' }}>Pro</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(([label, href]) => (
              <Link key={label} href={href} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ color: 'var(--text-2)' }}

              >{label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="btn btn-ghost btn-sm hide-mobile">Sign in</Link>
            <Link href="/auth/signup" className="btn btn-primary btn-sm">Get started free</Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.07) 0%, transparent 70%)'
        }}/>
        <div className="dot-bg absolute inset-0 pointer-events-none opacity-40"/>

        <div className="page-container relative text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-gold)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" style={{ animation: 'pulse-gold 2s infinite' }}/>
            <span className="text-xs font-semibold" style={{ color: 'var(--gold-light)', letterSpacing: '0.06em' }}>
              SEBI-COMPLIANT AI INVESTMENT PLATFORM
            </span>
          </div>

          {/* Headline */}
          <h1 className="display-xl mb-6 max-w-4xl mx-auto">
            India&apos;s Most Complete<br/>
            <span className="gradient-gold">AI Investment Platform</span>
          </h1>

          <p className="body-lg max-w-2xl mx-auto mb-10" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
            7 AI engines for risk profiling, goal planning, retirement, stock analysis, portfolio optimization and global event intelligence — built for Indian investors.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href="/auth/signup" className="btn btn-primary btn-xl">
              Start free — no credit card
            </Link>
            <Link href="/pricing" className="btn btn-outline btn-xl">
              View pricing
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto stagger">
            {STATS.map(s => (
              <div key={s.label} className="surface-sm p-4 text-center fade-up">
                <p className="text-2xl font-bold mono mb-0.5" style={{ color: 'var(--gold)' }}>{s.value}</p>
                <p className="caption">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="py-20 md:py-28" style={{ borderTop: '1px solid var(--border-1)' }}>
        <div className="page-container">
          <div className="text-center mb-14">
            <p className="label mb-3">What you get</p>
            <h2 className="display-md mb-4">7 Powerful AI Engines</h2>
            <p className="body-md max-w-xl mx-auto">Everything you need for intelligent investing in one unified platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {FEATURES.map(f => (
              <div key={f.title} className="surface-sm p-6 fade-up group" style={{ transition: 'border-color 0.2s, background 0.2s' }}>
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-xl font-bold"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}25`, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <span className={`badge ${f.badge === 'Free' ? 'badge-green' : 'badge-gold'}`}>{f.badge}</span>
                </div>
                <h3 className="title-sm mb-2">{f.title}</h3>
                <p className="body-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border-1)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-container">
          <div className="text-center mb-14">
            <p className="label mb-3">Social proof</p>
            <h2 className="display-md mb-4">Trusted by Indian Investors</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} style={{ color: 'var(--gold)', fontSize: '1.25rem' }}>{s}</span>
              ))}
              <span className="body-sm ml-2">4.9 / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="surface p-6 flex flex-col fade-up">
                <div className="flex gap-1 mb-4">
                  {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>{s}</span>)}
                </div>
                <p className="body-sm leading-relaxed flex-1 mb-6" style={{ fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{t.name}</p>
                      <p className="caption">{t.role}</p>
                    </div>
                  </div>
                  <span className="badge badge-gold">{t.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="page-container text-center">
          <div
            className="relative max-w-2xl mx-auto rounded-2xl p-10 md:p-14 overflow-hidden"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-gold)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.06), transparent 70%)' }}/>
            <p className="label mb-4 relative">Get started today</p>
            <h2 className="display-md mb-4 relative">Ready to invest smarter?</h2>
            <p className="body-md mb-8 relative max-w-md mx-auto">Join thousands of Indian investors using AI for better financial decisions. Free to start, no credit card needed.</p>
            <Link href="/auth/signup" className="btn btn-primary btn-xl relative inline-flex">
              Create free account →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border-1)' }}>
        <div className="page-container py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>F</div>
                <span className="font-semibold text-[15px]">Finvest<span style={{ color: 'var(--gold)' }}>Pro</span></span>
              </div>
              <p className="caption leading-relaxed max-w-[180px]">AI-powered investment intelligence for Indian investors.</p>
            </div>
            {[
              { title: 'Product',  links: [['Pricing','/pricing'],['About','/about'],['Reviews','/testimonials'],['Contact','/contact']] },
              { title: 'Engines',  links: [['Risk Profiler','/engines/risk-profile'],['Goal Planner','/engines/goal-planner'],['Retirement','/engines/retirement'],['Stock Analysis','/engines/stock-analysis']] },
              { title: 'Legal',    links: [['Privacy Policy','/legal/privacy'],['Terms of Service','/legal/terms'],['Refund Policy','/legal/refund'],['Support','/legal/support']] },
            ].map(col => (
              <div key={col.title}>
                <p className="label mb-4">{col.title}</p>
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} className="block text-sm mb-2.5 transition-colors" style={{ color: 'var(--text-3)' }}
                  >{label}</Link>
                ))}
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid var(--border-1)' }}>
            <p className="caption">© {new Date().getFullYear()} FinVest Pro. All rights reserved. SEBI-compliant platform.</p>
            <p className="caption text-center">Investments are subject to market risks. Please read all documents carefully.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}