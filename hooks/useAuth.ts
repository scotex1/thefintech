'use client'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as fbSignOut, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { apiClient } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useAuth() {
  const store   = useAuthStore()
  const router  = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          store.setToken(token)
          const [profileRes, planRes] = await Promise.allSettled([
            apiClient.getProfile(),
            apiClient.getPlan(),
          ])
          const profile = profileRes.status === 'fulfilled' ? profileRes.value.data : {}
          const plan    = planRes.status    === 'fulfilled' ? planRes.value.data    : {}
          store.setUser({
            uid:        user.uid,
            email:      user.email || '',
            name:       profile.name  || user.displayName || '',
            photo:      profile.photo || user.photoURL    || '',
            plan:       plan.plan_id   || 'free',
            planName:   plan.plan_name || 'Free',
            planExpiry: plan.expiry_date || null,
            isAdmin:    profile.is_admin === true,
          })
        } catch {
          store.setUser({ uid: user.uid, email: user.email || '', name: user.displayName || '' })
        }
      } else {
        store.clear()
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signOut = async () => {
    await fbSignOut(auth)
    store.clear()
    router.replace('/auth/login')
    toast.success('Signed out successfully')
  }

  return { ...store, loading, signOut }
}
