import Link from 'next/link'

const COLUMNS: { title: string; links: [string, string][] }[] = [
  { title: 'Product', links: [['Pricing', '/pricing'], ['About', '/about'], ['Reviews', '/testimonials'], ['Contact', '/contact']] },
  { title: 'Engines', links: [['Risk Profiler', '/engines/risk-profile'], ['Goal Planner', '/engines/goal-planner'], ['Retirement', '/engines/retirement'], ['Stock Analysis', '/engines/stock-analysis']] },
  { title: 'Legal', links: [['Privacy Policy', '/legal/privacy'], ['Terms of Service', '/legal/terms'], ['Refund Policy', '/legal/refund'], ['Support', '/legal/support']] },
]

export default function MarketingFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-1)' }}>
      <div className="page-container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--primary-dim)', border: '1px solid var(--border-primary)', color: 'var(--primary-light)' }}>F</div>
              <span className="font-semibold text-[15px]" style={{ fontFamily: 'var(--font-display)' }}>Finvest<span style={{ color: 'var(--primary-light)' }}>Pro</span></span>
            </div>
            <p className="caption leading-relaxed max-w-[180px]">AI-powered investment intelligence for Indian investors.</p>
          </div>
          {COLUMNS.map(col => (
            <div key={col.title}>
              <p className="label mb-4">{col.title}</p>
              {col.links.map(([label, href]) => (
                <Link key={label} href={href} className="block text-sm mb-2.5 transition-colors" style={{ color: 'var(--text-3)' }}>{label}</Link>
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
  )
}
