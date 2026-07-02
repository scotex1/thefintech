'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS: [string, string][] = [
  ['Features', '/home#features'],
  ['Pricing', '/pricing'],
  ['Reviews', '/testimonials'],
  ['About', '/about'],
]

export default function MarketingNav() {
  const pathname = usePathname()
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(6,11,9,0.85)', backdropFilter: 'blur(20px) saturate(1.8)', borderBottom: '1px solid var(--border-1)' }}
    >
      <div className="page-container flex items-center justify-between h-14">
        <Link href="/home" className="flex items-center gap-2.5 select-none">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
            style={{ background: 'var(--primary-dim)', border: '1px solid var(--border-primary)', color: 'var(--primary-light)', fontFamily: 'var(--font-display)' }}
          >F</div>
          <span className="font-semibold text-[15px]" style={{ fontFamily: 'var(--font-display)' }}>
            Finvest<span style={{ color: 'var(--primary-light)' }}>Pro</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ color: pathname === href ? 'var(--text-1)' : 'var(--text-2)' }}
            >{label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/auth/login" className="btn btn-ghost btn-sm hide-mobile">Sign in</Link>
          <Link href="/auth/signup" className="btn btn-primary btn-sm">Get started free</Link>
        </div>
      </div>
    </header>
  )
}
