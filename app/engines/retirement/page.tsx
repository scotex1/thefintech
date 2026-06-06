'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { hasAccess, formatCurrency } from '@/lib/utils'
import { apiClient } from '@/lib/api'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

export default function RetirementPage() {
  const { plan, planExpiry } = useAuth()
  const access = hasAccess('retirement', plan, planExpiry)

  const [form, setForm] = useState({
    current_age: '30', retire_age: '60', life_expectancy: '85',
    monthly_expenses: '50000', inflation: '6',
    return_pre: '12', return_post: '7', current_savings: '0',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }))

  if (!access) return (
    <div className="max-w-lg mx-auto text-center py-20 fade-up">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="title-lg mb-2">Basic Plan Required</h2>
      <p className="body-md mb-6">Upgrade to access the Retirement Planner.</p>
      <Link href="/pricing"><Button size="lg">Upgrade to Basic</Button></Link>
    </div>
  )

  const calculate = async () => {
    const cAge = parseInt(form.current_age)
    const rAge = parseInt(form.retire_age)
    if (rAge <= cAge) { toast.error('Retirement age must be greater than current age'); return }
    setLoading(true)
    try {
      const res = await apiClient.getRetirement({
        current_age:      cAge,
        retire_age:       rAge,
        life_expectancy:  parseInt(form.life_expectancy),
        monthly_expenses: parseFloat(form.monthly_expenses),
        inflation:        parseFloat(form.inflation),
        current_savings:  parseFloat(form.current_savings),
        return_pre:       parseFloat(form.return_pre),
        return_post:      parseFloat(form.return_post),
      })
      setResult(res.data)
    } catch (err: any) {
      toast.error(err.message || 'Calculation failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-5xl mx-auto fade-up pb-24 md:pb-0">
      <div className="mb-8">
        <Badge variant="purple" className="mb-3">🏖️ Basic+ Engine</Badge>
        <h1 className="display-md mb-2">Retirement Planner</h1>
        <p className="body-md">Calculate exact corpus and SIP needed to retire comfortably.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="title-sm mb-5">Your Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Current Age" type="number" value={form.current_age} onChange={set('current_age')} hint="years"/>
            <Input label="Retirement Age" type="number" value={form.retire_age} onChange={set('retire_age')} hint="years"/>
            <Input label="Life Expectancy" type="number" value={form.life_expectancy} onChange={set('life_expectancy')} hint="years"/>
            <Input label="Monthly Expenses (₹)" type="number" value={form.monthly_expenses} onChange={set('monthly_expenses')} prefix="₹"/>
            <Input label="Inflation Rate" type="number" value={form.inflation} onChange={set('inflation')} hint="% per year"/>
            <Input label="Pre-Retirement Return" type="number" value={form.return_pre} onChange={set('return_pre')} hint="% expected"/>
            <Input label="Post-Retirement Return" type="number" value={form.return_post} onChange={set('return_post')} hint="% expected"/>
            <Input label="Current Savings (₹)" type="number" value={form.current_savings} onChange={set('current_savings')} prefix="₹"/>
          </div>
          <Button onClick={calculate} loading={loading} size="lg" className="mt-5 w-full">
            Calculate Plan
          </Button>
        </Card>

        {result && (
          <div className="flex flex-col gap-4 fade-in">
            <Card gold>
              <p className="label mb-1">Required Monthly SIP</p>
              <p className="text-5xl font-bold mono mb-1" style={{ color:'var(--gold)' }}>
                {formatCurrency(result.monthly_sip)}
              </p>
              <p className="caption mb-5">for {result.years_to_retire} years</p>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label:'Corpus Needed',      value: formatCurrency(result.corpus_needed || result.corpus_required),  color:'var(--text-1)' },
                  { label:'Existing Corpus FV',  value: formatCurrency(result.future_savings || result.existing_corpus_fv), color:'var(--blue)'   },
                  { label:'Expense at Retire',   value: formatCurrency(result.monthly_expense_retire || result.monthly_at_retire), color:'var(--text-2)' },
                  { label:'Retirement Period',   value: `${result.retirement_years} years`, color:'var(--text-2)' },
                ].map(m => (
                  <div key={m.label} className="p-3 rounded-xl" style={{ background:'var(--bg-overlay)' }}>
                    <p className="caption mb-0.5">{m.label}</p>
                    <p className="mono font-semibold text-sm" style={{ color:m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>

              {result.note && (
                <p className="caption mt-4 p-3 rounded-xl leading-relaxed" style={{ background:'var(--bg-overlay)' }}>
                  ℹ {result.note}
                </p>
              )}
            </Card>

            {result.chart_data?.length > 0 && (
              <Card>
                <p className="label mb-3">Corpus Growth by Age</p>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={result.chart_data}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#D4A853" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D4A853" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="age" stroke="var(--text-3)" tick={{ fill:'var(--text-3)', fontSize:11 }}/>
                    <YAxis stroke="var(--text-3)" tick={{ fill:'var(--text-3)', fontSize:10 }} tickFormatter={v => `₹${v/100000}L`}/>
                    <Tooltip
                      contentStyle={{ background:'var(--bg-overlay)', border:'1px solid var(--border-gold)', borderRadius:12 }}
                      formatter={(v: any) => [formatCurrency(v), 'Corpus']}
                    />
                    <ReferenceLine
                      x={parseInt(form.retire_age)}
                      stroke="var(--gold)"
                      strokeDasharray="4 4"
                      label={{ value:'Retire', fill:'var(--gold)', fontSize:10 }}
                    />
                    <Area type="monotone" dataKey="corpus" stroke="#D4A853" strokeWidth={2} fill="url(#grad)"/>
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            )}

            {result.milestones?.length > 0 && (
              <Card>
                <p className="label mb-3">Milestones</p>
                {result.milestones.map((m: any) => (
                  <div key={m.label} className="flex justify-between items-center py-2.5" style={{ borderBottom:'1px solid var(--border-1)' }}>
                    <span className="body-sm">{m.label} <span className="caption">(Age {m.age})</span></span>
                    <span className="mono font-semibold text-sm" style={{ color:'var(--gold)' }}>
                      {formatCurrency(m.corpus || m.amount)}
                    </span>
                  </div>
                ))}
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}