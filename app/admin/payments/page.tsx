"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { formatCurrency, formatDate } from "@/lib/utils"

export default function AdminPayments() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["admin-payments", page, status],
    queryFn: () => apiClient.admin.getPayments({ page, limit:20, status }).then(r => r.data),
  })

  const payments = data?.payments || []
  const total    = data?.total    || 0
  const stats    = data?.stats    || {}
  const statusColor: Record<string,string> = { SUCCESS:"green", FAILED:"red", PENDING:"gold" }
  const planColor:   Record<string,string> = { free:"gray", basic:"blue", pro:"gold", elite:"purple" }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Payments ({total})</h1>
        <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}} className="px-3 py-2 rounded-lg text-sm bg-[#0C1219] border border-[rgba(255,255,255,0.08)] text-[#F0F4F8] focus:outline-none">
          <option value="">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label:"Total Revenue",   value: formatCurrency(stats.total_revenue||0),  color:"#C9A84C" },
          { label:"This Month",      value: formatCurrency(stats.month_revenue||0),   color:"#22C55E" },
          { label:"Success Rate",    value: `${stats.success_rate||0}%`,              color:"#3B82F6" },
          { label:"Total Txns",      value: stats.total_transactions||0,              color:"#A78BFA" },
        ].map(s => (
          <Card key={s.label}>
            <p className="text-xs text-[#8A9BB0] mb-1">{s.label}</p>
            <p className="text-2xl font-bold" style={{color:s.color}}>{isLoading ? "—" : s.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)] text-[#8A9BB0] text-xs">
                {["Order ID","User","Plan","Amount","Status","Date"].map(h=>(
                  <th key={h} className="text-left py-3 px-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-12 text-[#4A5568]"><div className="spinner mx-auto mb-2"/></td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-[#4A5568]">No payments found</td></tr>
              ) : payments.map((p: any) => (
                <tr key={p.order_id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-all">
                  <td className="py-3 px-3 font-mono text-xs text-[#4A5568]">{p.order_id?.slice(-12)}</td>
                  <td className="py-3 px-3 text-sm text-[#8A9BB0]">{p.user_email}</td>
                  <td className="py-3 px-3"><Badge variant={planColor[p.plan]||"gray"}>{p.plan}</Badge></td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#C9A84C]">{formatCurrency((p.amount||0)/100)}</td>
                  <td className="py-3 px-3"><Badge variant={statusColor[p.status]||"gray"}>{p.status}</Badge></td>
                  <td className="py-3 px-3 text-xs text-[#8A9BB0]">{formatDate(p.date||p.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > 20 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <span className="text-xs text-[#8A9BB0]">Page {page} of {Math.ceil(total/20)}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</Button>
              <Button size="sm" variant="ghost" disabled={page>=Math.ceil(total/20)} onClick={()=>setPage(p=>p+1)}>Next</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}