'use client'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Badge from '@/components/ui/Badge'

const planColor: Record<string, string> = { free: 'gray', basic: 'blue', pro: 'gold', elite: 'gold' }

export default function Navbar() {
  const { name, photo, plan, planName, signOut } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(10,10,11,0.88)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        borderBottom: '1px solid var(--border-1)',
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 select-none">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(212,168,83,0.2) 0%, rgba(212,168,83,0.08) 100%)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold)',
            }}
          >
            F
          </div>
          <span className="font-semibold text-[15px] tracking-tight hidden sm:block" style={{ color: 'var(--text-1)' }}>
            Finvest<span style={{ color: 'var(--gold)' }}>Pro</span>
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Upgrade pill — hide on elite */}
          {plan !== 'elite' && (
            <Link
              href="/pricing"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.08))',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-light)',
              }}
            >
              <span>✦</span> Upgrade
            </Link>
          )}

          {/* Avatar menu */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all relative"
            style={{ border: '1px solid var(--border-1)' }}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
          >
            {photo ? (
              <img src={photo} alt={name || ''} className="w-7 h-7 rounded-full object-cover shrink-0" />
            ) : (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
              >
                {(name || 'U')[0].toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium max-w-[100px] truncate hidden sm:block" style={{ color: 'var(--text-1)' }}>
              {name?.split(' ')[0]}
            </span>
            <Badge variant={planColor[plan] || 'gray'} className="hidden sm:inline-flex">{plan}</Badge>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--text-3)' }}>
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Dropdown */}
            {menuOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-52 rounded-xl overflow-hidden z-50 fade-in"
                style={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-1)', boxShadow: 'var(--shadow-lg)' }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-1)' }}>
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-1)' }}>{name}</p>
                  <p className="caption truncate mt-0.5">{planName} Plan</p>
                </div>
                {[
                  { label: 'Dashboard',    href: '/dashboard' },
                  { label: 'Profile',      href: '/dashboard/profile' },
                  { label: 'Subscription', href: '/dashboard/subscription' },
                  { label: 'Pricing',      href: '/pricing' },
                ].map(i => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="flex items-center px-4 py-2.5 text-sm transition-colors"
                    style={{ color: 'var(--text-2)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {i.label}
                  </Link>
                ))}
                <div style={{ borderTop: '1px solid var(--border-1)' }}>
                  <button
                    onClick={signOut}
                    className="flex items-center w-full px-4 py-2.5 text-sm transition-colors"
                    style={{ color: 'var(--red)', background: 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--red-dim)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}