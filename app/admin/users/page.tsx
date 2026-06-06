'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [planModal, setPlanModal] = useState<{uid:string;email:string}|null>(null)
  const [newPlan, setNewPlan] = useState('basic')
  const [expiry, setExpiry] = useState(new Date(Date.now()+30*86400000).toISOString().slice(0,10))
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', search, page],
    queryFn:  () => apiClient.admin.getUsers({ search, page, limit:15 }).then(r=>r.data),
  })

  const deleteMut = useMutation({
    mutationFn:(uid:string)=>apiClient.admin.deleteUser(uid),
    onSuccess:()=>{ qc.invalidateQueries({queryKey:['admin-users']}); toast.success('User deleted') },
  })
  const planMut = useMutation({
    mutationFn:({uid,d}:{uid:string,d:any})=>apiClient.admin.changePlan(uid,d),
    onSuccess:()=>{ qc.invalidateQueries({queryKey:['admin-users']}); setPlanModal(null); toast.success('Plan updated') },
  })

  const users = data?.users || []
  const total = data?.total || 0
  const planColor: Record<string,string> = { free:'gray', basic:'blue', pro:'gold', elite:'purple' }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Users ({total})</h1>
        <Input placeholder="Search email or name…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} className="w-64"/>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)] text-[#8A9BB0] text-xs">
                {['User','Plan','Status','Joined','Expiry','Actions'].map(h=><th key={h} className="text-left py-3 px-3 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-12 text-[#4A5568]"><div className="spinner mx-auto mb-2"/></td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-[#4A5568]">No users found</td></tr>
              ) : users.map((u:any)=>(
                <tr key={u.uid} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-all">
                  <td className="py-3 px-3"><p className="font-medium">{u.name||'—'}</p><p className="text-xs text-[#8A9BB0]">{u.email}</p></td>
                  <td className="py-3 px-3"><Badge variant={planColor[u.plan]||'gray'}>{u.plan||'free'}</Badge></td>
                  <td className="py-3 px-3"><Badge variant={u.is_active?'green':'red'}>{u.is_active?'Active':'Inactive'}</Badge></td>
                  <td className="py-3 px-3 text-[#8A9BB0] text-xs">{formatDate(u.created_at)}</td>
                  <td className="py-3 px-3 text-[#8A9BB0] text-xs">{u.plan_expiry?formatDate(u.plan_expiry):'—'}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={()=>{setPlanModal({uid:u.uid,email:u.email})}}>Plan</Button>
                      <Button size="sm" variant="danger" onClick={()=>{ if(confirm(`Delete ${u.email}?`)) deleteMut.mutate(u.uid) }}>Del</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > 15 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <span className="text-xs text-[#8A9BB0]">Page {page} of {Math.ceil(total/15)}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" disabled={page===1} onClick={()=>setPage(p=>p-1)}>← Prev</Button>
              <Button size="sm" variant="ghost" disabled={page>=Math.ceil(total/15)} onClick={()=>setPage(p=>p+1)}>Next →</Button>
            </div>
          </div>
        )}
      </Card>

      {planModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <h3 className="font-semibold mb-1">Change Plan</h3>
            <p className="text-xs text-[#8A9BB0] mb-4">{planModal.email}</p>
            <div className="flex flex-col gap-3 mb-5">
              <select value={newPlan} onChange={e=>setNewPlan(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm bg-[#0C1219] border border-[rgba(255,255,255,0.08)] text-[#F0F4F8] focus:outline-none">
                {['free','basic','pro','elite'].map(p=><option key={p} value={p}>{p}</option>)}
              </select>
              <input type="date" value={expiry} onChange={e=>setExpiry(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm bg-[#0C1219] border border-[rgba(255,255,255,0.08)] text-[#F0F4F8] focus:outline-none"/>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={()=>setPlanModal(null)}>Cancel</Button>
              <Button className="flex-1" loading={planMut.isPending} onClick={()=>planMut.mutate({uid:planModal.uid,d:{plan_id:newPlan,expiry_date:expiry}})}>Update Plan</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}