"use client"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { hasAccess, formatCurrency } from "@/lib/utils"
import { apiClient } from "@/lib/api"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Badge from "@/components/ui/Badge"
import Link from "next/link"
import toast from "react-hot-toast"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const COLORS = ["#22C55E","#3B82F6","#C9A84C","#A78BFA","#EC4899","#F59E0B","#06B6D4"]

const RISK_OPTIONS = [
  { value:"conservative",        label:"Conservative (Low Risk)" },
  { value:"moderate",            label:"Moderate (Balanced)" },
  { value:"moderate-aggressive", label:"Moderate-Aggressive (Growth)" },
  { value:"aggressive",          label:"Aggressive (High Risk/Reward)" },
]

export default function PortfolioPage() {
  const { plan, planExpiry } = useAuth()
  const access = hasAccess("portfolio", plan, planExpiry)

  const [form, setForm] = useState({ amount:"", risk:"moderate", horizon:"5" })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }))

  if (!access) return (
    <div className="max-w-lg mx-auto text-center py-20 fade-up">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="title-lg mb-2">Pro Plan Required</h2>
      <p className="body-sm mb-6">Upgrade to Pro to access Portfolio Optimizer.</p>
      <Link href="/pricing"><Button size="lg">Upgrade to Pro</Button></Link>
    </div>
  )

  const optimize = async () => {
    const amount = parseFloat(form.amount)
    if (!amount || amount < 1000) { toast.error("Enter investment amount (min ₹1,000)"); return }
    setLoading(true)
    try {
      // POST with amount, risk, horizon — matches backend exactly
      const res = await apiClient.optimizePortfolio({
        amount:  amount,
        risk:    form.risk,
        horizon: parseInt(form.horizon) || 5,
      })
      setResult(res.data)
    } catch (err: any) {
      toast.error(err.message || "Analysis failed")
    } finally { setLoading(false) }
  }

  const allocationData = result?.allocation?.map((a: any) => ({
    name:  a.asset,
    value: a.pct,
  })) || []

  return (
    <div className="max-w-5xl mx-auto fade-up">
      <div className="mb-8">
        <Badge variant="purple" className="mb-3">💼 Pro Engine</Badge>
        <h1 className="display-md mb-2">Portfolio Optimizer</h1>
        <p className="body-md">MPT-based portfolio construction with India-specific fund recommendations.</p>
      </div>

      <Card className="mb-6">
        <h3 className="title-sm mb-5">Your Investment Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <Input label="Investment Amount (₹)" type="number" value={form.amount} onChange={set("amount")} placeholder="500000" prefix="₹" hint="Total amount to invest"/>
          <Select label="Risk Profile" value={form.risk} onChange={set("risk")}>
            {RISK_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
          <Select label="Investment Horizon (years)" value={form.horizon} onChange={set("horizon")}>
            {[1,2,3,5,7,10,15,20,25,30].map(y => (
              <option key={y} value={y}>{y} year{y > 1 ? "s" : ""}</option>
            ))}
          </Select>
        </div>
        <Button onClick={optimize} loading={loading} size="lg">Optimize Portfolio</Button>
      </Card>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 fade-in">
          {/* Summary */}
          <Card gold>
            <p className="label mb-3">{result.label}</p>
            <div className="flex flex-col gap-3 mb-5">
              {[
                { label:"Expected CAGR",    value:`${result.cagr}% p.a.`,             color:"var(--gold)" },
                { label:"Risk Level",       value: result.risk_level,                  color:"var(--text-1)" },
                { label:"Max Drawdown",     value: result.max_drawdown,               color:"var(--red)" },
                { label:"Projected Value",  value: formatCurrency(result.projected),  color:"var(--green)" },
                { label:"Investment Period",value:`${form.horizon} years`,             color:"var(--text-1)" },
              ].map(m => (
                <div key={m.label} className="flex justify-between items-center py-2" style={{ borderBottom:"1px solid var(--border-1)" }}>
                  <span className="caption">{m.label}</span>
                  <span className="mono text-sm font-semibold" style={{ color: m.color }}>{m.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pie chart */}
          <Card className="lg:col-span-2">
            <p className="label mb-4">Asset Allocation</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-48 shrink-0" style={{ height:200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                      {allocationData.map((_: any, i: number) => (
                        <Cell key={i} fill={result.allocation[i]?.color || COLORS[i % COLORS.length]}/>
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background:"var(--bg-overlay)", border:"1px solid var(--border-gold)", borderRadius:12, color:"var(--text-1)" }}
                      formatter={(v: any) => [`${v}%`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 flex-1 w-full">
                {result.allocation?.map((a: any, i: number) => (
                  <div key={a.asset} className="flex items-center justify-between text-sm p-2.5 rounded-lg" style={{ background:"var(--bg-overlay)" }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.color || COLORS[i % COLORS.length] }}/>
                      <div>
                        <p className="font-medium" style={{ fontSize:"0.8125rem" }}>{a.asset}</p>
                        <p className="caption">{a.expected_return}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="mono font-semibold" style={{ color:"var(--gold)", fontSize:"0.875rem" }}>{a.pct}%</p>
                      <p className="caption">{formatCurrency(a.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Fund recommendations */}
          {result.allocation?.some((a: any) => a.examples?.length) && (
            <div className="lg:col-span-3">
              <Card>
                <p className="label mb-4">Recommended Funds</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {result.allocation?.filter((a: any) => a.examples?.length).map((a: any, i: number) => (
                    <div key={a.asset} className="p-4 rounded-xl" style={{ background:"var(--bg-overlay)", border:"1px solid var(--border-2)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: a.color || COLORS[i % COLORS.length] }}/>
                        <p className="text-sm font-semibold" style={{ fontSize:"0.8125rem" }}>{a.asset} ({a.pct}%)</p>
                      </div>
                      {a.examples?.map((ex: string) => (
                        <p key={ex} className="caption py-1" style={{ borderBottom:"1px solid var(--border-2)" }}>• {ex}</p>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="caption mt-4 p-3 rounded-xl" style={{ background:"var(--gold-dim)", border:"1px solid var(--border-gold)" }}>
                  ⚠️ These are illustrative recommendations only. Verify current NAV, expense ratios, and fund performance before investing. Not SEBI-registered investment advice.
                </p>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  )
}