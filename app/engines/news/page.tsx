'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

const CATEGORIES = ['all','market','stocks','mutual-funds','economy','global']
const sentimentBadge: Record<string,string> = { positive:'green', negative:'red', neutral:'gray' }
const sentimentLabel: Record<string,string> = { positive:'📈 Bullish', negative:'📉 Bearish', neutral:'Neutral' }

export default function NewsPage() {
  const [cat, setCat] = useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['market-news', cat],
    queryFn:  () => apiClient.getNews(cat).then(r => r.data),
    refetchInterval: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
  })
  const articles = data?.articles || []

  return (
    <div className="max-w-5xl mx-auto fade-up pb-24 md:pb-0">
      <div className="mb-8">
        <Badge variant="green" className="mb-3">📰 Free Engine</Badge>
        <h1 className="display-md mb-2">Market News</h1>
        <p className="body-md">AI-curated financial news from 50+ Indian and global sources · Updated every 5 minutes</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize"
            style={{
              background: cat===c ? 'var(--bg-overlay)' : 'transparent',
              border: `1px solid ${cat===c ? 'var(--border-gold)' : 'var(--border-1)'}`,
              color: cat===c ? 'var(--gold)' : 'var(--text-3)',
            }}
          >
            {c === 'all' ? 'All News' : c.replace('-', ' ')}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({length:6}).map((_,i) => (
            <div key={i} className="surface p-5 rounded-2xl">
              <div className="flex gap-2 mb-4"><div className="skeleton h-5 w-20 rounded-full"/><div className="skeleton h-5 w-16 rounded-full"/></div>
              <div className="skeleton h-5 w-full rounded mb-2"/>
              <div className="skeleton h-5 w-4/5 rounded mb-3"/>
              <div className="skeleton h-4 w-full rounded mb-1"/>
              <div className="skeleton h-4 w-3/4 rounded"/>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📰</div>
          <p className="title-sm mb-2">News loading</p>
          <p className="body-sm">Connect your News API key in backend .env to see live news</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((a: any, i: number) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-5 transition-all duration-200 group"
              style={{ background:'var(--bg-raised)', border:'1px solid var(--border-1)', textDecoration:'none' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                  <Badge variant={sentimentBadge[a.sentiment] || 'gray'}>{sentimentLabel[a.sentiment] || 'News'}</Badge>
                  {a.category && <Badge variant="gray">{a.category}</Badge>}
                </div>
                <span className="caption">{formatDate(a.published_at)}</span>
              </div>
              {a.image && (
                <div className="rounded-xl overflow-hidden mb-3 h-36 bg-[var(--bg-overlay)]">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" loading="lazy"/>
                </div>
              )}
              <h3 className="text-sm font-semibold leading-snug mb-2 line-clamp-2" style={{ color:'var(--text-1)' }}>{a.title}</h3>
              {a.summary && <p className="caption leading-relaxed line-clamp-2 mb-3">{a.summary}</p>}
              <div className="flex items-center justify-between">
                <span className="caption">{a.source}</span>
                <span className="caption group-hover:translate-x-0.5 transition-transform" style={{ color:'var(--gold)' }}>Read →</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}