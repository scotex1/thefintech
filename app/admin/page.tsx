'use client'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

export default function AdminDashboard() {
  const { data:stats, isLoading } = useQuery({
    queryKey:['admin-stats'],
    queryFn: () => apiClient.admin.getStats().then(r => r.data),
  })

  return (
    <div className="fade-up">
      <div className="mb-8">
        <p className="label mb-1.5">Admin</p>
        <h1 className="display-md">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Total Users"    value={isLoading ? '—' : stats?.total_users ?? '—'}       sub={`+${stats?.new_users_today||0} today`}     color="var(--blue)"   loading={isLoading}/>
        <StatCard label="Active Subs"    value={isLoading ? '—' : stats?.active_subs ?? '—'}       sub={`${stats?.churn_rate||0}% churn`}            color="var(--green)"  loading={isLoading}/>
        <StatCard label="MRR"            value={isLoading ? '—' : stats?.mrr != null ? formatCurrency(stats.mrr) : '—'} sub="Monthly recurring" color="var(--gold)" loading={isLoading}/>
        <StatCard label="Revenue Today"  value={isLoading ? '—' : stats?.revenue_today != null ? formatCurrency(stats.revenue_today) : '—'} sub={`${stats?.payments_today||0} payments`} color="var(--purple)" loading={isLoading}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href:'/admin/users',    icon:'👥', label:'Manage Users',    desc:'View, search, update user accounts and plans' },
          { href:'/admin/payments', icon:'💳', label:'Payments',        desc:'Transaction history and revenue analytics' },
          { href:'/admin/plans',    icon:'⚙️', label:'Plan Config',     desc:'Manage subscription plans and pricing' },
          { href:'/dashboard',      icon:'←',  label:'Back to App',    desc:'Return to the main dashboard' },
        ].map(item => (
          <Link key={item.href} href={item.href}>
            <div
              className="p-5 rounded-2xl transition-all duration-200 h-full"
              style={{ background:'var(--bg-raised)', border:'1px solid var(--border-1)', cursor:'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,168,83,0.25)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-1)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)' }}
            >
              <span className="text-3xl block mb-3">{item.icon}</span>
              <p className="font-semibold text-sm mb-1" style={{ color:'var(--text-1)' }}>{item.label}</p>
              <p className="caption leading-relaxed">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}