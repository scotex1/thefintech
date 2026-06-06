'use client'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { hasAccess, formatDate } from '@/lib/utils'
import { apiClient } from '@/lib/api'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const impactBadge: Record<string,string> = { high:'red', medium:'gold', low:'green' }
const impactBorder: Record<string,string> = { high:'rgba(239,68,68,0.4)', medium:'rgba(212,168,83,0.4)', low:'rgba(34,197,94,0.4)' }

export default function GlobalEventsPage() {
  const { plan, planExpiry } = useAuth()
  const access = hasAccess('global-events', plan, planExpiry)

  const { data, isLoading } = useQuery({
    queryKey: ['global-events'],
    queryFn:  () => apiClient.getGlobalEvents().then(r => r.data),
    enabled:  access,
    refetchInterval: 10 * 60 * 1000,
  })

  const events   = data?.events   || []
  const sentiment = data?.sentiment || null

  if (!access) return (
    <div className="max-w-lg mx-auto text-center py-20 fade-up">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="title-lg mb-2">Pro Plan Required</h2>
      <p className="body-md mb-6">Upgrade to access the Global Event Engine — macro events mapped to your portfolio.</p>
      <Link href="/pricing"><Button size="lg">Upgrade to Pro</Button></Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto fade-up pb-24 md:pb-0">
      <div className="mb-8">
        <Badge variant="blue" className="mb-3">🌐 Pro Engine</Badge>
        <h1 className="display-md mb-2">Global Events Engine</h1>
        <p className="body-md">Macro events tracked and mapped to Indian market impact in real time.</p>
      </div>

      {sentiment && (
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label:'Bullish Events',  value:sentiment.bullish  || 0, color:'var(--green)' },
            { label:'Neutral Events',  value:sentiment.neutral  || 0, color:'var(--text-2)' },
            { label:'Bearish Events',  value:sentiment.bearish  || 0, color:'var(--red)' },
          ].map(s => (
            <div key={s.label} className="surface p-4 text-center rounded-2xl">
              <p className="text-2xl font-bold mono mb-0.5" style={{ color:s.color }}>{s.value}</p>
              <p className="caption">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({length:4}).map((_,i) => (
            <div key={i} className="surface p-6 rounded-2xl">
              <div className="flex gap-2 mb-3"><div className="skeleton h-5 w-24 rounded-full"/></div>
              <div className="skeleton h-6 w-3/4 rounded mb-2"/>
              <div className="skeleton h-4 w-full rounded"/>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <Card className="text-center py-16">
          <div className="text-5xl mb-4">🌐</div>
          <p className="title-sm mb-2">No events currently</p>
          <p className="body-sm">Global events will appear here. Backend fetches from news APIs.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((e: any, i: number) => (
            <div
              key={e.id || i}
              className="rounded-2xl p-5 transition-all"
              style={{
                background:'var(--bg-raised)',
                border:'1px solid var(--border-1)',
                borderLeft:`3px solid ${impactBorder[e.impact] || 'var(--border-gold)'}`,
              }}
            >
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg">{e.flag || '🌍'}</span>
                  <Badge variant={impactBadge[e.impact] || 'gray'}>
                    {(e.impact || 'medium').toUpperCase()} IMPACT
                  </Badge>
                  <Badge variant="gray">{e.category || 'Macro'}</Badge>
                  <span className="caption">{e.region}</span>
                </div>
                <span className="caption shrink-0">{formatDate(e.date)}</span>
              </div>

              <h3 className="font-semibold mb-2" style={{ color:'var(--text-1)' }}>{e.event || e.title}</h3>
              <p className="body-sm mb-3">{e.description}</p>

              {e.india_impact && (
                <div
                  className="flex items-start gap-2.5 p-3 rounded-xl text-sm"
                  style={{ background:'var(--bg-overlay)', border:'1px solid var(--border-2)' }}
                >
                  <span style={{ color:'var(--gold)', flexShrink:0 }}>🇮🇳</span>
                  <div>
                    <span className="font-medium text-xs" style={{ color:'var(--gold)' }}>India Impact: </span>
                    <span className="body-sm">{e.india_impact}</span>
                  </div>
                </div>
              )}

              {e.affected_sectors?.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {e.affected_sectors.map((s: string) => (
                    <Badge key={s} variant="gray">{s}</Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}