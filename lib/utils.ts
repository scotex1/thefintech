export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return '₹—'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function formatNumber(n: number): string {
  if (isNaN(n)) return '—'
  if (n >= 10_000_000) return (n / 10_000_000).toFixed(2) + ' Cr'
  if (n >= 100_000)    return (n / 100_000).toFixed(2) + ' L'
  if (n >= 1_000)      return (n / 1_000).toFixed(1) + 'K'
  return n.toLocaleString('en-IN')
}

export function formatDate(d: string | null): string {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function daysRemaining(expiry: string | null): number {
  if (!expiry) return 0
  return Math.max(0, Math.ceil((new Date(expiry).getTime() - Date.now()) / 86400000))
}

export function isPlanExpired(expiry: string | null): boolean {
  if (!expiry) return false
  return new Date() > new Date(expiry)
}

export const PLAN_ACCESS: Record<string, string[]> = {
  free:  ['risk-profile', 'news'],
  basic: ['risk-profile', 'news', 'goal-planner', 'retirement'],
  pro:   ['risk-profile', 'news', 'goal-planner', 'retirement', 'stock-analysis', 'portfolio', 'global-events'],
  elite: ['risk-profile', 'news', 'goal-planner', 'retirement', 'stock-analysis', 'portfolio', 'global-events'],
}

export function hasAccess(engineId: string, plan: string, expiry: string | null): boolean {
  if (isPlanExpired(expiry) && plan !== 'free') return PLAN_ACCESS['free'].includes(engineId)
  return (PLAN_ACCESS[plan] || PLAN_ACCESS['free']).includes(engineId)
}

export const ENGINES = [
  { id:'risk-profile',   name:'Risk Profiler',      icon:'📊', color:'#C9A84C', plans:['free','basic','pro','elite'],  desc:'Discover your risk tolerance with AI-powered questionnaire.' },
  { id:'news',           name:'Market News',         icon:'📰', color:'#06B6D4', plans:['free','basic','pro','elite'],  desc:'AI-curated news from 50+ Indian and global sources.' },
  { id:'goal-planner',   name:'Goal Planner',        icon:'🎯', color:'#22C55E', plans:['basic','pro','elite'],         desc:'Map financial goals with SIP calculations and milestones.' },
  { id:'retirement',     name:'Retirement Planner',  icon:'🏖️', color:'#A78BFA', plans:['basic','pro','elite'],         desc:'Calculate corpus and SIP to retire on your terms.' },
  { id:'stock-analysis', name:'Stock Analysis',      icon:'📈', color:'#F59E0B', plans:['pro','elite'],                 desc:'Deep fundamental + technical AI analysis for NSE/BSE stocks.' },
  { id:'portfolio',      name:'Portfolio Optimizer', icon:'💼', color:'#EC4899', plans:['pro','elite'],                 desc:'Build diversified portfolio using Modern Portfolio Theory.' },
  { id:'global-events',  name:'Global Events',       icon:'🌐', color:'#3B82F6', plans:['pro','elite'],                 desc:'Track macro events and their impact on your investments.' },
]
