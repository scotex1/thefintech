'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { uid, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !uid) router.replace('/auth/login')
  }, [uid, loading])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#060A0F]">
      <div className="text-center">
        <div className="text-4xl mb-4">📈</div>
        <div className="spinner mx-auto"/>
        <p className="text-[#8A9BB0] mt-4 text-sm">Loading FinVest Pro…</p>
      </div>
    </div>
  )
  if (!uid) return null

  return (
    <div className="min-h-screen bg-[#060A0F]">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <main className="flex-1 min-h-[calc(100vh-57px)] p-6 max-w-6xl relative z-10">{children}</main>
      </div>
    </div>
  )
}