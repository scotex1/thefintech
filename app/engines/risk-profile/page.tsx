'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import toast from 'react-hot-toast'
import Link from 'next/link'

const QUESTIONS = [
  { q:'What is your age group?', opts:[{t:'18–25 years',v:4},{t:'26–35 years',v:3},{t:'36–50 years',v:2},{t:'51+ years',v:1}] },
  { q:'Monthly household income?', opts:[{t:'Below ₹30,000',v:1},{t:'₹30K–₹75K',v:2},{t:'₹75K–₹2L',v:3},{t:'Above ₹2 lakh',v:4}] },
  { q:'How many financial dependents?', opts:[{t:'None',v:4},{t:'1–2',v:3},{t:'3–4',v:2},{t:'5 or more',v:1}] },
  { q:'How long can you stay invested?', opts:[{t:'Less than 1 year',v:1},{t:'1–3 years',v:2},{t:'3–7 years',v:3},{t:'7+ years',v:4}] },
  { q:'If portfolio drops 20%, you would:', opts:[{t:'Sell everything immediately',v:1},{t:'Worry and watch closely',v:2},{t:'Stay invested and wait',v:3},{t:'Buy more at lower prices',v:4}] },
  { q:'Primary investment goal?', opts:[{t:'Capital preservation',v:1},{t:'Regular income',v:2},{t:'Balanced growth',v:3},{t:'Maximum long-term growth',v:4}] },
  { q:'Emergency fund coverage?', opts:[{t:'None',v:1},{t:'1–3 months',v:2},{t:'3–6 months',v:3},{t:'6+ months',v:4}] },
  { q:'Comfort with market volatility?', opts:[{t:'Very uncomfortable',v:1},{t:'Somewhat uncomfortable',v:2},{t:'Comfortable',v:3},{t:'Very comfortable',v:4}] },
  { q:'Monthly investment capacity?', opts:[{t:'Less than 10% of income',v:1},{t:'10–20%',v:2},{t:'20–40%',v:3},{t:'40%+',v:4}] },
  { q:'Investment experience?', opts:[{t:'Complete beginner',v:1},{t:'FDs and RDs only',v:2},{t:'Mutual funds 1–3 years',v:3},{t:'Stocks + MFs 3+ years',v:4}] },
]

const PROFILES: Record<string,{color:string;badge:string;bg:string;equity:number;debt:number;gold:number;cash:number}> = {
  'Conservative':      { color:'var(--blue)',   badge:'blue',   bg:'var(--blue-dim)',   equity:15, debt:55, gold:20, cash:10 },
  'Moderate':          { color:'var(--gold)',   badge:'gold',   bg:'var(--gold-dim)',   equity:50, debt:35, gold:10, cash:5  },
  'Aggressive':        { color:'var(--green)',  badge:'green',  bg:'var(--green-dim)',  equity:75, debt:15, gold:8,  cash:2  },
  'Ultra-Aggressive':  { color:'var(--red)',    badge:'red',    bg:'var(--red-dim)',    equity:90, debt:5,  gold:4,  cash:1  },
}

function getProfile(score: number): string {
  if (score <= 15) return 'Conservative'
  if (score <= 25) return 'Moderate'
  if (score <= 33) return 'Aggressive'
  return 'Ultra-Aggressive'
}

export default function RiskProfilePage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number|null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const q = QUESTIONS[current]
  const progress = Math.round((current / QUESTIONS.length) * 100)

  const next = async () => {
    if (selected === null) { toast.error('Select an answer to continue'); return }
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)
    if (current < QUESTIONS.length - 1) { setCurrent(c => c+1); return }
    setLoading(true)
    const score = newAnswers.reduce((a,b) => a+b, 0)
    const profile = getProfile(score)
    const p = PROFILES[profile]
    try {
      await apiClient.getRiskProfile({ score, profile, answers: newAnswers })
    } catch {}
    setResult({ score, profile, ...p })
    setLoading(false)
  }

  const prev = () => {
    if (current === 0) return
    const prev = answers[current - 1]
    setSelected(prev || null)
    setAnswers(a => a.slice(0, -1))
    setCurrent(c => c - 1)
  }

  const restart = () => { setCurrent(0); setAnswers([]); setSelected(null); setResult(null) }

  if (result) {
    const p = result
    const allocItems = [
      { label:'Equity Mutual Funds', pct: p.equity, color:'var(--green)' },
      { label:'Debt / Bonds',        pct: p.debt,   color:'var(--blue)'  },
      { label:'Gold ETF / SGB',      pct: p.gold,   color:'var(--gold)'  },
      { label:'Cash / Liquid',       pct: p.cash,   color:'var(--text-2)' },
    ]
    return (
      <div className="max-w-2xl mx-auto fade-up pb-24 md:pb-0">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5" style={{ background:p.bg, border:`1px solid ${p.color}25` }}>📊</div>
          <Badge variant={p.badge} className="mb-4 text-sm px-4 py-1.5">{p.profile} Investor</Badge>
          <h1 className="display-md mb-2">Your Risk Profile</h1>
          <p className="body-md">Analysed from {QUESTIONS.length} behavioral + financial parameters</p>
        </div>

        <Card gold className="mb-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="label mb-1.5">Risk Score</p>
              <p className="text-5xl font-bold mono" style={{ color:p.color }}>{p.score}<span className="text-xl" style={{ color:'var(--text-3)' }}>/40</span></p>
            </div>
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background:p.bg, border:`1px solid ${p.color}30` }}
            >
              <span className="text-4xl font-bold" style={{ color:p.color, fontFamily:'var(--font-display)' }}>
                {p.profile[0]}
              </span>
            </div>
          </div>

          {/* Allocation bar */}
          <div className="mb-5">
            <p className="label mb-3">Recommended Asset Allocation</p>
            <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-4">
              {allocItems.map(a => (
                <div key={a.label} style={{ width:`${a.pct}%`, background:a.color, borderRadius:'inherit' }}/>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allocItems.map(a => (
                <div key={a.label} className="flex items-center justify-between p-2.5 rounded-xl" style={{ background:'var(--bg-overlay)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background:a.color }}/>
                    <span className="caption">{a.label}</span>
                  </div>
                  <span className="mono font-semibold text-sm" style={{ color:a.color }}>{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ background:'var(--bg-overlay)' }}>
            <p className="caption leading-relaxed">
              Based on your profile, you should focus on{' '}
              {p.profile === 'Conservative' ? 'capital preservation with debt instruments and FDs' :
               p.profile === 'Moderate' ? 'balanced growth with a mix of equity and debt mutual funds' :
               p.profile === 'Aggressive' ? 'growth-oriented large and mid-cap equity funds' :
               'maximum growth with small-cap stocks and high-risk equity funds'}.
              Review and rebalance quarterly.
            </p>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={restart} className="flex-1">Retake Quiz</Button>
          <Link href="/engines/goal-planner" className="flex-1"><Button className="w-full">Plan Goals →</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto fade-up pb-24 md:pb-0">
      <div className="mb-8">
        <Badge variant="green" className="mb-3">📊 Free Engine</Badge>
        <h1 className="display-md mb-2">Risk Profiler</h1>
        <p className="body-md">10 questions · Takes about 3 minutes</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2.5">
          <span className="caption">Question {current+1} of {QUESTIONS.length}</span>
          <span className="caption mono" style={{ color:'var(--gold)' }}>{progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width:`${progress}%` }}/>
        </div>
      </div>

      <Card gold>
        <p className="label mb-4">Question {current+1}</p>
        <h2 className="title-lg mb-7 leading-snug">{q.q}</h2>

        <div className="flex flex-col gap-2.5 mb-7">
          {q.opts.map((o, i) => (
            <button
              key={i}
              onClick={() => setSelected(o.v)}
              className="text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                background: selected === o.v ? 'rgba(212,168,83,0.1)' : 'var(--bg-overlay)',
                border: selected === o.v ? '1px solid var(--border-gold)' : '1px solid var(--border-2)',
                color: selected === o.v ? 'var(--gold-light)' : 'var(--text-2)',
              }}
            >
              <span
                className="inline-flex w-6 h-6 rounded-lg items-center justify-center text-xs font-bold mr-3"
                style={{
                  background: selected === o.v ? 'var(--gold)' : 'var(--bg-hover)',
                  color: selected === o.v ? 'var(--bg-base)' : 'var(--text-3)',
                }}
              >
                {String.fromCharCode(65+i)}
              </span>
              {o.t}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" size="sm" onClick={prev} disabled={current === 0}>← Back</Button>
          <Button size="sm" onClick={next} loading={loading} disabled={selected === null}>
            {current === QUESTIONS.length-1 ? 'Get My Profile' : 'Next →'}
          </Button>
        </div>
      </Card>
    </div>
  )
}