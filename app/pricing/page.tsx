'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import toast from 'react-hot-toast'

const PLANS = [
  {
    id:'free', name:'Free', monthly:0, yearly:0,
    badge:'gray', tagline:'Start exploring',
    cta:'Get started free', ctaVariant:'outline' as const,
    features:['Risk Profiler (full)', 'Market News feed', 'Basic SIP calculator', '1 goal (view only)'],
    missing:['Goal Planner', 'Retirement Planner', 'Stock Analysis', 'Portfolio Optimizer', 'Global Events'],
  },
  {
    id:'basic', name:'Basic', monthly:499, yearly:4499,
    badge:'blue', tagline:'For serious investors',
    cta:'Start Basic', ctaVariant:'outline' as const,
    features:['Everything in Free', 'Goal Planner + milestones', 'Retirement corpus calculator', 'Unlimited goal tracking', 'Email support'],
    missing:['Stock Analysis', 'Portfolio Optimizer', 'Global Events'],
  },
  {
    id:'pro', name:'Pro', monthly:999, yearly:8999,
    badge:'gold', tagline:'Full AI intelligence', featured:true,
    cta:'Start Pro', ctaVariant:'primary' as const,
    features:['Everything in Basic', 'AI Stock Analysis (NSE/BSE)', 'Portfolio Optimizer (MPT)', 'Global Event Engine', 'Priority support', 'Downloadable reports'],
    missing:[],
  },
  {
    id:'elite', name:'Elite', monthly:1999, yearly:17999,
    badge:'purple', tagline:'For power users',
    cta:'Start Elite', ctaVariant:'outline' as const,
    features:['Everything in Pro', 'Tax harvesting AI', 'Family portfolio (5 members)', 'Advisor dashboard access', 'API access', 'Dedicated account manager'],
    missing:[],
  },
]

declare global { interface Window { Cashfree?: any } }

export default function PricingPage() {
  const { uid, plan: currentPlan } = useAuth()
  const [yearly, setYearly] = useState(false)
  const [loading, setLoading] = useState<string|null>(null)

  const handleUpgrade = async (planId: string) => {
    if (!uid) { window.location.href = '/auth/login'; return }
    if (planId === 'free') return
    setLoading(planId)
    try {
      const key = `${planId}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`
      const effectiveId = yearly && planId !== 'elite' ? `${planId}_yearly` : planId
      const res = await apiClient.createOrder({ plan_id: effectiveId, idempotency_key: key })
      const { payment_session_id, order_id } = res.data
      if (!payment_session_id) throw new Error('Order creation failed')
      const cf = new (window as any).Cashfree({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' })
      const result = await cf.checkout({ paymentSessionId: payment_session_id, redirectTarget: '_modal' })
      if (result.error) throw new Error(result.error.message || 'Payment failed')
      if (result.paymentDetails) {
        const verify = await apiClient.verifyPayment({ order_id })
        if (verify.data.success) {
          toast.success('Payment successful! Plan activated 🎉', { duration: 5000 })
          setTimeout(() => window.location.href = '/dashboard?payment=success', 2000)
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Payment failed. Please try again.')
    } finally { setLoading(null) }
  }

  return (
    <div style={{ background:'var(--bg-base)', minHeight:'100vh', color:'var(--text-1)' }}>
      {uid && <Navbar/>}
      {!uid && (
        <header style={{ background:'rgba(10,10,11,0.9)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--border-1)' }}>
          <div className="page-container flex items-center justify-between h-14">
            <Link href="/home" className="flex items-center gap-2.5 font-semibold text-[15px]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background:'var(--gold-dim)', border:'1px solid var(--border-gold)', color:'var(--gold)' }}>F</div>
              Finvest<span style={{ color:'var(--gold)' }}>Pro</span>
            </Link>
            <div className="flex gap-2">
              <Link href="/auth/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
              <Link href="/auth/signup"><Button size="sm">Get started</Button></Link>
            </div>
          </div>
        </header>
      )}

      <div className="page-container page-content">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="gold" className="mb-5">Pricing</Badge>
          <h1 className="display-lg mb-4">Simple, transparent pricing</h1>
          <p className="body-lg max-w-xl mx-auto mb-8">Start free. Upgrade when you need more power.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl" style={{ background:'var(--bg-raised)', border:'1px solid var(--border-1)' }}>
            <button
              onClick={() => setYearly(false)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
              style={!yearly ? { background:'var(--bg-overlay)', color:'var(--text-1)', boxShadow:'var(--shadow-sm)' } : { color:'var(--text-3)' }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              style={yearly ? { background:'var(--bg-overlay)', color:'var(--text-1)', boxShadow:'var(--shadow-sm)' } : { color:'var(--text-3)' }}
            >
              Yearly
              <span className="badge badge-green" style={{ fontSize:'0.625rem' }}>Save 25%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PLANS.map(p => {
            const isCurrent = currentPlan === p.id
            const price = yearly ? p.yearly : p.monthly
            const savedAmt = p.monthly > 0 ? p.monthly * 12 - p.yearly : 0
            return (
              <div
                key={p.id}
                className="relative flex flex-col rounded-2xl p-6 transition-all duration-200"
                style={{
                  background: p.featured ? 'var(--bg-overlay)' : 'var(--bg-raised)',
                  border: p.featured ? '1px solid var(--border-gold)' : '1px solid var(--border-1)',
                  boxShadow: p.featured ? 'var(--shadow-gold)' : 'none',
                }}
              >
                {p.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="badge badge-gold" style={{ fontSize:'0.6875rem', padding:'4px 12px' }}>★ Most Popular</span>
                  </div>
                )}

                <div className="mb-5">
                  <Badge variant={p.badge} className="mb-3">{p.name}</Badge>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-3xl font-bold mono" style={{ color:'var(--text-1)' }}>
                      {price === 0 ? '₹0' : `₹${price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="body-sm">{price === 0 ? '/forever' : yearly ? '/year' : '/month'}</span>
                  </div>
                  {yearly && savedAmt > 0 && (
                    <p className="caption" style={{ color:'var(--green)' }}>Save ₹{savedAmt.toLocaleString('en-IN')}/year</p>
                  )}
                  <p className="caption mt-1">{p.tagline}</p>
                </div>

                <div className="divider mb-5"/>

                <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color:'var(--text-1)' }}>
                      <span style={{ color:'var(--green)', marginTop:'1px', flexShrink:0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                  {p.missing.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color:'var(--text-3)', textDecoration:'line-through' }}>
                      <span style={{ flexShrink:0 }}>✗</span>{f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button variant="ghost" className="w-full" disabled>✓ Current plan</Button>
                ) : p.id === 'free' ? (
                  <Link href="/auth/signup"><Button variant={p.ctaVariant} className="w-full">{p.cta}</Button></Link>
                ) : (
                  <Button
                    variant={p.ctaVariant}
                    className="w-full"
                    loading={loading === p.id}
                    onClick={() => handleUpgrade(p.id)}
                  >
                    {p.cta}
                  </Button>
                )}
              </div>
            )
          })}
        </div>

        {/* FAQ / trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon:'🔒', title:'Secure payments', desc:'Powered by Cashfree. Your card details are never stored on our servers.' },
            { icon:'↩', title:'7-day refund', desc:'Not satisfied? Get a full refund within 7 days, no questions asked.' },
            { icon:'📋', title:'SEBI compliant', desc:'All analysis follows SEBI guidelines. Not investment advice — educational only.' },
          ].map(f => (
            <div key={f.title} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background:'var(--bg-raised)', border:'1px solid var(--border-1)' }}>
              <div className="text-2xl shrink-0">{f.icon}</div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color:'var(--text-1)' }}>{f.title}</p>
                <p className="caption leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center caption">All prices in INR. Subscriptions auto-renew. Cancel anytime.</p>
      </div>
      <script src="https://sdk.cashfree.com/js/v3/cashfree.js" async/>
    </div>
  )
}