import Link from 'next/link'
import MarketingFooter from './MarketingFooter'

export default function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <header style={{ background: 'rgba(6,11,9,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-container flex items-center justify-between h-14">
          <Link href="/home" className="flex items-center gap-2.5 font-semibold text-[15px]" style={{ fontFamily: 'var(--font-display)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--primary-dim)', border: '1px solid var(--border-primary)', color: 'var(--primary-light)' }}>F</div>
            Finvest<span style={{ color: 'var(--primary-light)' }}>Pro</span>
          </Link>
          <Link href="/auth/login" className="text-sm font-medium" style={{ color: 'var(--primary-light)' }}>Sign in</Link>
        </div>
      </header>

      <div className="page-container" style={{ maxWidth: 760, paddingTop: 64, paddingBottom: 80 }}>
        <p className="label mb-3">Legal</p>
        <h1 className="display-md mb-2">{title}</h1>
        <p className="caption mb-10">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <div
          className="legal-prose"
          style={{ color: 'var(--text-2)', lineHeight: 1.75, fontSize: '0.9375rem' }}
        >
          {children}
        </div>
      </div>

      <MarketingFooter/>

      <style>{`
        .legal-prose h2 { color: var(--text-1); font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; margin-top: 2.25rem; margin-bottom: 0.75rem; }
        .legal-prose h2:first-child { margin-top: 0; }
        .legal-prose p { margin-bottom: 1rem; }
        .legal-prose strong { color: var(--text-1); font-weight: 600; }
      `}</style>
    </div>
  )
}
