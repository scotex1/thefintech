'use client'
import { useAuth } from '@/hooks/useAuth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { ENGINES, hasAccess, formatCurrency, daysRemaining, isPlanExpired, cn } from '@/lib/utils'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import StatCard from '@/components/ui/StatCard'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const GOAL_ICONS: Record<string,string> = { home:'🏠', car:'🚗', education:'🎓', wedding:'💍', travel:'✈️', emergency:'🛡️', business:'💼', custom:'🎯' }

export default function Dashboard() {
  const { name, plan, planName, planExpiry } = useAuth()
  const router = useRouter()
  const qc = useQueryClient()
  const expired  = isPlanExpired(planExpiry)
  const days     = daysRemaining(planExpiry)
  const planBadge: Record<string,string> = { free:'gray', basic:'blue', pro:'gold', elite:'gold' }

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn:  () => apiClient.getStats().then(r => r.data),
    retry: 1,
  })
  const { data: goalsData } = useQuery({
    queryKey: ['goals'],
    queryFn:  () => apiClient.getGoals().then(r => r.data),
  })
  const goals = goalsData?.goals || []

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.deleteGoal(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: ['goals'] }),
  })

  const showBanner = plan === 'free' || expired || days <= 7

  return (
    <div className="fade-up pb-24 md:pb-0">
      {/* ── Page header ─────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="label mb-1.5">Dashboard</p>
            <h1 className="display-md">
              Good day, <span style={{ color:'var(--gold)' }}>{name?.split(' ')[0]}</span>
            </h1>
          </div>
          <Badge variant={planBadge[plan] || 'gray'} className="hidden sm:inline-flex text-sm px-3 py-1.5">
            {planName} Plan
          </Badge>
        </div>
      </div>

      {/* ── Plan banner ─────────────────────────────────── */}
      {showBanner && (
        <div
          className="flex items-center justify-between p-4 rounded-2xl mb-8 gap-3"
          style={{
            background: expired
              ? 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))'
              : 'linear-gradient(135deg, rgba(212,168,83,0.08), rgba(212,168,83,0.04))',
            border: `1px solid ${expired ? 'rgba(239,68,68,0.2)' : 'var(--border-gold)'}`,
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
              style={{ background: expired ? 'var(--red-dim)' : 'var(--gold-dim)' }}
            >
              {expired ? '⚠' : plan === 'free' ? '✦' : '⏳'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color:'var(--text-1)' }}>
                {expired ? `${planName} plan expired` : plan === 'free' ? 'You are on the Free plan' : `${days} days remaining`}
              </p>
              <p className="caption truncate">
                {expired ? 'Renew to continue using premium engines' : plan === 'free' ? 'Upgrade to unlock all 7 AI engines' : 'Renew early to avoid interruption'}
              </p>
            </div>
          </div>
          <Link href="/pricing" className="shrink-0">
            <Button size="sm">{expired ? 'Renew' : plan === 'free' ? 'Upgrade' : 'Renew'}</Button>
          </Link>
        </div>
      )}

      {/* ── Stats row ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 stagger">
        <StatCard
          label="Portfolio Value"
          value={stats?.portfolio_value != null ? formatCurrency(stats.portfolio_value) : '₹—'}
          sub={stats?.portfolio_change != null ? `${stats.portfolio_change >= 0 ? '▲' : '▼'} ${Math.abs(stats.portfolio_change).toFixed(1)}% today` : 'Add stocks to track'}
          color={stats?.portfolio_change >= 0 ? 'var(--green)' : 'var(--red)'}
          loading={statsLoading}
          className="fade-up"
        />
        <StatCard
          label="Active Goals"
          value={stats?.active_goals ?? goals.length}
          sub={goals.length > 0 ? 'goals in progress' : 'Set your first goal'}
          color="var(--gold)"
          loading={statsLoading}
          className="fade-up"
        />
        <StatCard
          label="Risk Profile"
          value={stats?.risk_profile || '—'}
          sub={stats?.risk_profile ? 'profile set' : 'Take the quiz →'}
          color="var(--purple)"
          loading={statsLoading}
          className="fade-up"
        />
        <StatCard
          label="Plan Status"
          value={planName}
          sub={plan === 'free' ? 'Free forever' : expired ? '⚠ Expired' : `${days} days left`}
          color={expired ? 'var(--red)' : 'var(--gold)'}
          className="fade-up"
        />
      </div>

      {/* ── Engine grid ─────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="title-lg">AI Engines</h2>
          <Link href="/pricing" className="caption hover:underline" style={{ color:'var(--gold)' }}>
            {plan === 'free' ? 'Upgrade to unlock all →' : 'Manage plan →'}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {ENGINES.map((e, i) => {
            const access = hasAccess(e.id, plan, planExpiry)
            const minPlan = e.plans[0]
            return (
              <div
                key={e.id}
                onClick={() => access ? router.push(`/engines/${e.id}`) : router.push('/pricing')}
                className="relative rounded-2xl p-5 cursor-pointer transition-all duration-200 group"
                style={{
                  background: 'var(--bg-raised)',
                  border: `1px solid ${access ? 'var(--border-1)' : 'var(--border-2)'}`,
                  opacity: access ? 1 : 0.55,
                  animationDelay: `${i * 50}ms`,
                }}
                onMouseEnter={e => {
                  if (access) {
                    (e.currentTarget as HTMLElement).style.border = '1px solid rgba(212,168,83,0.25)'
                    ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)'
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${access ? 'var(--border-1)' : 'var(--border-2)'}`
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)'
                }}
              >
                {/* Lock overlay */}
                {!access && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-xs" style={{ background:'var(--bg-hover)', color:'var(--text-3)' }}>🔒</div>
                  </div>
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background:`${e.color}15`, border:`1px solid ${e.color}25` }}
                >
                  {e.icon}
                </div>
                <p className="title-sm mb-1.5">{e.name}</p>
                <p className="body-sm leading-snug" style={{ fontSize:'0.8125rem' }}>{e.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant={access ? 'green' : 'gray'}>
                    {access ? '● Active' : minPlan + '+'}
                  </Badge>
                  {access && <span className="caption group-hover:translate-x-0.5 transition-transform">→</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Goals ───────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="title-lg">Financial Goals</h2>
          <Link href="/engines/goal-planner">
            <Button variant="outline" size="sm">+ Add Goal</Button>
          </Link>
        </div>

        {goals.length === 0 ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background:'var(--bg-raised)', border:'1px solid var(--border-1)', borderStyle:'dashed' }}
          >
            <div className="text-4xl mb-4">🎯</div>
            <p className="title-sm mb-2">No goals yet</p>
            <p className="body-sm mb-5">Set a financial goal and get a precise monthly SIP plan.</p>
            <Link href="/engines/goal-planner">
              <Button size="sm">Plan your first goal</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goals.map((g: any) => (
              <div
                key={g.id}
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{ background:'var(--bg-raised)', border:'1px solid var(--border-1)' }}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background:'var(--bg-overlay)' }}>
                    {GOAL_ICONS[g.goal_type] || '🎯'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color:'var(--text-1)' }}>{g.goal_name}</p>
                    <p className="caption">{formatCurrency(g.target_amount)} · {g.months} months</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="mono font-bold text-sm" style={{ color:'var(--gold)' }}>{formatCurrency(g.sip_required)}</p>
                    <p className="caption">/month SIP</p>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(g.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
                    style={{ color:'var(--text-3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--red-dim)'; (e.currentTarget as HTMLElement).style.color = 'var(--red)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}