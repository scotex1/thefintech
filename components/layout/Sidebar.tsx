'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { ENGINES, hasAccess, cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const NAV = [
  { href: '/dashboard',              icon: '⊞', label: 'Dashboard'    },
  { href: '/dashboard/profile',      icon: '◯', label: 'Profile'      },
  { href: '/dashboard/subscription', icon: '◈', label: 'Subscription' },
]

const ENGINE_ICONS: Record<string, string> = {
  'risk-profile':   '◐',
  'news':           '◉',
  'goal-planner':   '◎',
  'retirement':     '◑',
  'stock-analysis': '△',
  'portfolio':      '◇',
  'global-events':  '◈',
}

function NavLink({ href, icon, label, active, locked, onClick }: any) {
  const base = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 w-full text-left'
  if (locked) return (
    <button onClick={onClick} className={cn(base, 'opacity-40 cursor-pointer hover:opacity-60')} style={{ color: 'var(--text-3)' }}>
      <span className="w-4 text-center shrink-0 font-mono text-base">{icon}</span>
      <span className="truncate flex-1">{label}</span>
      <span className="text-[10px] opacity-60">🔒</span>
    </button>
  )
  return (
    <Link
      href={href}
      className={cn(base, active ? 'active-nav' : 'inactive-nav')}
      style={active ? {
        background: 'rgba(212,168,83,0.1)',
        border: '1px solid rgba(212,168,83,0.15)',
        color: 'var(--gold-light)',
      } : {
        color: 'var(--text-2)',
        border: '1px solid transparent',
      }}
    >
      <span className="w-4 text-center shrink-0 font-mono text-base">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  )
}

export default function Sidebar() {
  const { plan, planExpiry, isAdmin } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  const handleLocked = (name: string, minPlan: string) =>
    toast(`Upgrade to ${minPlan}+ to unlock ${name}`, { icon: '🔒' })

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside
        className="hidden md:flex w-56 shrink-0 flex-col h-[calc(100vh-56px)] sticky top-14 overflow-y-auto"
        style={{ background: 'var(--bg-raised)', borderRight: '1px solid var(--border-1)' }}
      >
        {/* Main nav */}
        <div className="p-3 flex flex-col gap-0.5">
          <p className="label px-3 py-2">Menu</p>
          {NAV.map(i => (
            <NavLink key={i.href} href={i.href} icon={i.icon} label={i.label} active={isActive(i.href)} />
          ))}
        </div>

        {/* Engines */}
        <div className="p-3 flex flex-col gap-0.5" style={{ borderTop: '1px solid var(--border-1)' }}>
          <p className="label px-3 py-2">AI Engines</p>
          {ENGINES.map(e => {
            const access = hasAccess(e.id, plan, planExpiry)
            return (
              <NavLink
                key={e.id}
                href={`/engines/${e.id}`}
                icon={ENGINE_ICONS[e.id] || '◦'}
                label={e.name}
                active={isActive(`/engines/${e.id}`)}
                locked={!access}
                onClick={() => handleLocked(e.name, e.plans[0])}
              />
            )
          })}
        </div>

        {/* Admin */}
        {isAdmin && (
          <div className="p-3 mt-auto" style={{ borderTop: '1px solid var(--border-1)' }}>
            <NavLink href="/admin" icon="⚙" label="Admin Panel" active={isActive('/admin')} />
          </div>
        )}

        {/* Plan badge bottom */}
        {plan === 'free' && (
          <div className="p-3" style={{ borderTop: '1px solid var(--border-1)' }}>
            <Link
              href="/pricing"
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(212,168,83,0.12), rgba(212,168,83,0.05))',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-light)',
              }}
            >
              <span>✦ Upgrade Plan</span>
              <span style={{ opacity: 0.6 }}>→</span>
            </Link>
          </div>
        )}
      </aside>

      {/* ── Mobile bottom navigation ─────────────────────── */}
      <nav className="mobile-nav md:hidden">
        {[
          { href: '/dashboard',       icon: '⊞', label: 'Home' },
          { href: '/engines/risk-profile', icon: '◐', label: 'Engines' },
          { href: '/pricing',         icon: '✦', label: 'Upgrade' },
          { href: '/dashboard/profile', icon: '◯', label: 'Profile' },
        ].map(i => (
          <button
            key={i.href}
            onClick={() => router.push(i.href)}
            className={cn('mobile-nav-item', pathname.startsWith(i.href.split('/').slice(0,2).join('/')) && 'active')}
          >
            <span className="nav-icon font-mono">{i.icon}</span>
            <span>{i.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}