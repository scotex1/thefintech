import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'

export const metadata: Metadata = {
  title: 'FinVest Pro — AI Investment Intelligence for India',
  description: 'AI-powered financial planning: risk profiling, goal planning, retirement calculator, stock analysis for Indian investors.',
}

const FEATURES = [
  { icon:'◐', title:'Risk Profiler',      badge:'Free',    color:'var(--primary-light)', desc:'10-question AI quiz maps your exact risk tolerance. Conservative to Ultra-Aggressive profile with allocation.' },
  { icon:'◎', title:'Goal Planner',       badge:'Basic+',  color:'#22C55E',  desc:'SIP calculations with milestone tracking. Home, education, wedding, retirement — any goal, any timeline.' },
  { icon:'◑', title:'Retirement Planner', badge:'Basic+',  color:'#A78BFA', desc:'Inflation-adjusted corpus calculation with interactive growth charts and monthly milestone tracking.' },
  { icon:'△', title:'Stock Analysis',     badge:'Pro+',    color:'#F59E0B',   desc:'Fundamental + technical AI analysis for NSE/BSE stocks. F&O data, sector comparison, AI verdict.' },
  { icon:'◇', title:'Portfolio Optimizer',badge:'Pro+',    color:'#60A5FA', desc:'Modern Portfolio Theory allocation with India-specific NPT weightings and rebalancing alerts.' },
  { icon:'◈', title:'Global Events',      badge:'Pro+',    color:'#22D3EE',  desc:'RBI policy, Budget, Fed decisions mapped to your portfolio impact. Real-time macro intelligence.' },
  { icon:'◉', title:'Market News',        badge:'Free',    color:'var(--text-2)', desc:'AI-curated financial news from 50+ Indian and global sources, updated every 5 minutes.' },
]

const STATS = [
  { value: '7',    label: 'AI Engines'  },
  { value: '₹0',   label: 'To Start'    },
  { value: '50+',  label: 'News Sources'},
  { value: 'SEBI', label: 'Compliant'   },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma',  role: 'Software Engineer, Bangalore', avatar: 'PS', plan: 'Pro',   text: 'Finally an app that explains risk in plain terms. My SIP is now goal-based, not random. The milestone tracker keeps me on track.' },
  { name: 'Rahul Gupta',   role: 'CA, Mumbai',                   avatar: 'RG', plan: 'Elite', text: 'The retirement calculator is more accurate than what I calculate manually. Inflation adjustment is spot-on.' },
  { name: 'Anita Verma',   role: 'Teacher, Delhi',               avatar: 'AV', plan: 'Basic', text: 'Used the goal planner for my daughter education fund. Got a clear SIP plan with monthly milestones instantly.' },
]

const TICKER_ITEMS = ['NIFTY 50 ▲ 24,812', 'SENSEX ▲ 81,240', 'RBI REPO 6.50%', 'USD/INR ₹86.20', 'GOLD ₹71,450', 'BANK NIFTY ▲ 52,140', 'BTC $ 68,120', 'CRUDE $ 82.10']

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-1)', minHeight: '100vh' }}>
      <MarketingNav/>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 md:pt-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(23,185,120,0.08) 0%, transparent 70%)'
        }}/>
        <div className="dot-bg absolute inset-0 pointer-events-none opacity-40"/>

        <div className="page-container relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-primary)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)', animation: 'pulse-primary 2s infinite' }}/>
            <span className="text-xs font-semibold" style={{ color: 'var(--primary-light)', letterSpacing: '0.06em' }}>
              SEBI-COMPLIANT AI INVESTMENT PLATFORM
            </span>
          </div>

          <h1 className="display-xl mb-6 max-w-4xl mx-auto">
            India&apos;s Most Complete<br/>
            <span className="gradient-primary">AI Investment Platform</span>
          </h1>

          <p className="body-lg max-w-2xl mx-auto mb-10" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
            7 AI engines for risk profiling, goal planning, retirement, stock analysis, portfolio optimization and global event intelligence — built for Indian investors.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link href="/auth/signup" className="btn btn-primary btn-xl">Start free — no credit card</Link>
            <Link href="/pricing" className="btn btn-outline btn-xl">View pricing</Link>
          </div>

          {/* Signature: animated ascending line chart */}
          <div className="ticker-line-wrap max-w-3xl mx-auto mb-14" style={{ height: 140 }} aria-hidden="true">
            <svg viewBox="0 0 900 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tickerGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#17B978" stopOpacity="0.15"/>
                  <stop offset="55%" stopColor="#17B978"/>
                  <stop offset="100%" stopColor="#5EEAB0"/>
                </linearGradient>
                <linearGradient id="tickerFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#17B978" stopOpacity="0.16"/>
                  <stop offset="100%" stopColor="#17B978" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,120 L60,118 L120,122 L180,98 L240,104 L300,80 L360,88 L420,60 L480,68 L540,44 L600,52 L660,30 L720,38 L780,16 L840,22 L900,4 L900,140 L0,140 Z" fill="url(#tickerFill)" stroke="none"/>
              <path className="ticker-path" d="M0,120 L60,118 L120,122 L180,98 L240,104 L300,80 L360,88 L420,60 L480,68 L540,44 L600,52 L660,30 L720,38 L780,16 L840,22 L900,4"/>
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto stagger mb-16">
            {STATS.map(s => (
              <div key={s.label} className="surface-sm p-4 text-center fade-up">
                <p className="text-2xl font-bold mono mb-0.5" style={{ color: 'var(--primary-light)' }}>{s.value}</p>
                <p className="caption">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee ticker strip */}
        <div className="marquee py-3" style={{ borderTop: '1px solid var(--border-1)', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-raised)' }}>
          <div className="marquee-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className="mono text-xs" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="py-20 md:py-28">
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
                  <span className={`badge ${f.badge === 'Free' ? 'badge-green' : 'badge-primary'}`}>{f.badge}</span>
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
                <span key={i} style={{ color: 'var(--primary-light)', fontSize: '1.25rem' }}>{s}</span>
              ))}
              <span className="body-sm ml-2">4.9 / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="surface p-6 flex flex-col fade-up">
                <div className="flex gap-1 mb-4">
                  {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: 'var(--primary-light)', fontSize: '0.875rem' }}>{s}</span>)}
                </div>
                <p className="body-sm leading-relaxed flex-1 mb-6" style={{ fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: 'var(--primary-dim)', border: '1px solid var(--border-primary)', color: 'var(--primary-light)' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{t.name}</p>
                      <p className="caption">{t.role}</p>
                    </div>
                  </div>
                  <span className="badge badge-primary">{t.plan}</span>
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
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-primary)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(23,185,120,0.07), transparent 70%)' }}/>
            <p className="label mb-4 relative">Get started today</p>
            <h2 className="display-md mb-4 relative">Ready to invest smarter?</h2>
            <p className="body-md mb-8 relative max-w-md mx-auto">Join thousands of Indian investors using AI for better financial decisions. Free to start, no credit card needed.</p>
            <Link href="/auth/signup" className="btn btn-primary btn-xl relative inline-flex">Create free account →</Link>
          </div>
        </div>
      </section>

      <MarketingFooter/>
    </div>
  )
}
