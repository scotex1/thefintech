'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const adminNav = [
  { href:'/admin', label:'Dashboard', icon:'📊' },
  { href:'/admin/users', label:'Users', icon:'👥' },
  { href:'/admin/payments', label:'Payments', icon:'💳' },
  { href:'/admin/plans', label:'Plans', icon:'⚙️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { uid, isAdmin, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (!loading) {
      if (!uid) router.replace('/auth/login')
      else if (!isAdmin) router.replace('/dashboard')
    }
  }, [uid, isAdmin, loading])
  if (loading || !isAdmin) return <div className="min-h-screen flex items-center justify-center bg-[#060A0F]"><div className="spinner"/></div>
  return (
    <div className="min-h-screen bg-[#060A0F]">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#060A0F]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-[#EF4444]">⚙️ Admin Panel</Link>
        <Link href="/dashboard" className="text-sm text-[#8A9BB0] hover:text-[#F0F4F8]">← Dashboard</Link>
      </nav>
      <div className="flex">
        <aside className="w-52 shrink-0 h-[calc(100vh-49px)] sticky top-[49px] bg-[#0C1219] border-r border-[rgba(255,255,255,0.06)] p-4 flex flex-col gap-1">
          {adminNav.map(i=>(
            <Link key={i.href} href={i.href} className={cn('flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all', pathname===i.href?'bg-[rgba(239,68,68,0.1)] text-[#EF4444]':'text-[#8A9BB0] hover:text-[#F0F4F8] hover:bg-[rgba(255,255,255,0.04)]')}>
              {i.icon} {i.label}
            </Link>
          ))}
        </aside>
        <main className="flex-1 p-6 relative z-10">{children}</main>
      </div>
    </div>
  )
}