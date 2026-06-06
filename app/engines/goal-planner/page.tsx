"use client"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { hasAccess, formatCurrency } from "@/lib/utils"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Badge from "@/components/ui/Badge"
import Link from "next/link"
import toast from "react-hot-toast"

const GOAL_ICONS: Record<string, string> = {
  home:"🏠", car:"🚗", education:"🎓", wedding:"💍",
  travel:"✈️", emergency:"🛡️", business:"💼", custom:"🎯"
}

// Convert months to YYYY-MM target_date (what backend expects)
function monthsToTargetDate(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 7) // "YYYY-MM"
}

// Local SIP formula for instant preview
function calcSIP(fv: number, rAnnual: number, months: number, existing = 0): number {
  if (months <= 0 || fv <= 0) return 0
  const r = rAnnual / 100 / 12
  const n = months
  const pv = existing * Math.pow(1 + r, n)
  const needed = Math.max(0, fv - pv)
  if (r === 0) return needed / n
  return (needed * r) / (Math.pow(1 + r, n) - 1)
}

export default function GoalPlannerPage() {
  const { plan, planExpiry } = useAuth()
  const access = hasAccess("goal-planner", plan, planExpiry)
  const qc = useQueryClient()

  const [form, setForm] = useState({
    type:"home", name:"Buy a Home",
    amount:"", months:"120", rate:"12", existing:"0"
  })
  const [result, setResult] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }))

  const { data: goalsData } = useQuery({
    queryKey: ["goals"],
    queryFn:  () => apiClient.getGoals().then(r => r.data),
  })
  const goals = goalsData?.goals || []

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.deleteGoal(id),
    onSuccess:  () => { qc.invalidateQueries({ queryKey: ["goals"] }); toast.success("Goal deleted") },
  })

  if (!access) return (
    <div className="max-w-lg mx-auto text-center py-20 fade-up">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="title-lg mb-2">Basic Plan Required</h2>
      <p className="body-sm mb-6">Upgrade to access the Goal Planner engine.</p>
      <Link href="/pricing"><Button size="lg">Upgrade to Basic</Button></Link>
    </div>
  )

  const calculate = async () => {
    const fv = parseFloat(form.amount)
    const m  = parseInt(form.months)
    if (!fv || !m) { toast.error("Enter target amount and months"); return }

    setSubmitting(true)
    try {
      // Call backend — sends target_date (converted from months)
      const res = await apiClient.getGoalPlan({
        goal_type:     form.type,
        goal_name:     form.name || form.type,
        target_amount: fv,
        target_date:   monthsToTargetDate(m),
        current_saved: parseFloat(form.existing) || 0,
        annual_return: parseFloat(form.rate) || 12,
      })
      setResult({ ...res.data, months: m })
    } catch (err: any) {
      // Fallback: local calculation if backend unavailable
      const sip = calcSIP(fv, parseFloat(form.rate) || 12, m, parseFloat(form.existing) || 0)
      const milestones = [0.25, 0.5, 0.75].map(pct => ({
        label: `${Math.round(pct * 100)}% Mark`,
        month:  Math.round(m * pct),
        amount: Math.round(fv * pct),
        pct:    Math.round(pct * 100),
      }))
      setResult({ sip_required: Math.ceil(sip), months: m, target_amount: fv, milestones, goal_name: form.name })
    } finally { setSubmitting(false) }
  }

  const save = async () => {
    if (!result) return
    try {
      await apiClient.saveGoal({
        goal_type:     form.type,
        goal_name:     result.goal_name || form.name,
        target_amount: result.target_amount,
        months:        result.months,
        sip_required:  result.sip_required,
        annual_return: parseFloat(form.rate) || 12,
        current_saved: parseFloat(form.existing) || 0,
      })
      qc.invalidateQueries({ queryKey: ["goals"] })
      toast.success("Goal saved!")
    } catch { toast.error("Failed to save goal") }
  }

  return (
    <div className="max-w-5xl mx-auto fade-up">
      <div className="mb-8">
        <Badge variant="blue" className="mb-3">🎯 Basic+ Engine</Badge>
        <h1 className="display-md mb-2">Goal Planner</h1>
        <p className="body-md">Define financial goals and get a precise SIP plan with milestones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="title-sm mb-5">Configure Goal</h3>
          <div className="flex flex-col gap-4">
            <Select label="Goal Type" value={form.type} onChange={e => {
              const v = e.target.value
              setForm(f => ({ ...f, type: v, name: `${v.charAt(0).toUpperCase()}${v.slice(1)} Goal` }))
            }}>
              {Object.entries(GOAL_ICONS).map(([k, v]) => (
                <option key={k} value={k}>{v} {k.charAt(0).toUpperCase() + k.slice(1)}</option>
              ))}
            </Select>
            <Input label="Goal Name" value={form.name} onChange={set("name")} placeholder="Buy a 2BHK in Mumbai"/>
            <Input label="Target Amount (₹)" type="number" value={form.amount} onChange={set("amount")} placeholder="5000000" prefix="₹"/>
            <Input label="Time (months)" type="number" value={form.months} onChange={set("months")} placeholder="120" hint={`≈ ${Math.round(parseInt(form.months||"0")/12 * 10)/10} years`}/>
            <Input label="Expected Annual Return (%)" type="number" value={form.rate} onChange={set("rate")} placeholder="12"/>
            <Input label="Already Saved (₹)" type="number" value={form.existing} onChange={set("existing")} placeholder="0" prefix="₹"/>
            <Button onClick={calculate} loading={submitting} size="lg" className="mt-1">
              Calculate SIP Plan
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          {result && (
            <Card gold className="fade-in">
              <div className="flex items-center justify-between mb-5">
                <span className="text-4xl">{GOAL_ICONS[form.type]}</span>
                <Badge variant="green">Calculated</Badge>
              </div>
              <p className="label mb-1">Required Monthly SIP</p>
              <p className="text-5xl font-bold mono mb-1" style={{ color: "var(--gold)" }}>
                {formatCurrency(result.sip_required)}
              </p>
              <p className="caption mb-5">
                to reach {formatCurrency(result.target_amount)} in {result.months} months
              </p>

              {result.milestones?.length > 0 && (
                <div className="mb-5">
                  <p className="label mb-3">Milestones</p>
                  {result.milestones.map((m: any) => (
                    <div key={m.label || m.month} className="flex justify-between items-center py-2.5" style={{ borderBottom: "1px solid var(--border-1)" }}>
                      <span className="body-sm">{m.label} <span className="caption">(Month {m.month})</span></span>
                      <span className="mono font-semibold text-sm" style={{ color: "var(--gold)" }}>{formatCurrency(m.amount)}</span>
                    </div>
                  ))}
                </div>
              )}

              {result.total_invested && (
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="surface-xs p-3 rounded-xl text-center">
                    <p className="caption mb-0.5">Total Invested</p>
                    <p className="text-sm font-semibold mono">{formatCurrency(result.total_invested)}</p>
                  </div>
                  <div className="surface-xs p-3 rounded-xl text-center">
                    <p className="caption mb-0.5">Returns Earned</p>
                    <p className="text-sm font-semibold mono" style={{ color: "var(--green)" }}>{formatCurrency(result.returns_earned)}</p>
                  </div>
                </div>
              )}

              <Button onClick={save} className="w-full">Save Goal</Button>
            </Card>
          )}

          {goals.length > 0 && (
            <Card>
              <h3 className="title-sm mb-4">Saved Goals ({goals.length})</h3>
              <div className="flex flex-col gap-2">
                {goals.map((g: any) => (
                  <div key={g.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-overlay)", border: "1px solid var(--border-2)" }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{GOAL_ICONS[g.goal_type] || "🎯"}</span>
                      <div>
                        <p className="text-sm font-medium">{g.goal_name}</p>
                        <p className="caption">{formatCurrency(g.target_amount)} · {g.months} months</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="mono font-semibold text-sm" style={{ color: "var(--gold)" }}>{formatCurrency(g.sip_required)}</p>
                        <p className="caption">/month</p>
                      </div>
                      <button onClick={() => deleteMutation.mutate(g.id)} className="text-sm w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[var(--red-dim)] transition-all" style={{ color: "var(--red)" }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}