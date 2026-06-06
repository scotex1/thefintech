import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  uid:        string | null
  email:      string | null
  name:       string | null
  photo:      string | null
  plan:       string
  planName:   string
  planExpiry: string | null
  isAdmin:    boolean
  token:      string | null
  setUser: (data: Partial<AuthState>) => void
  setToken:(token: string | null) => void
  clear:   () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      uid: null, email: null, name: null, photo: null,
      plan: 'free', planName: 'Free', planExpiry: null,
      isAdmin: false, token: null,
      setUser:  (data) => set(data),
      setToken: (token) => set({ token }),
      clear: () => set({
        uid:null, email:null, name:null, photo:null,
        plan:'free', planName:'Free', planExpiry:null,
        isAdmin:false, token:null,
      }),
    }),
    { name: 'finvest-auth', partialize: (s) => ({
      uid:s.uid, email:s.email, name:s.name, photo:s.photo,
      plan:s.plan, planName:s.planName, planExpiry:s.planExpiry, isAdmin:s.isAdmin,
    })}
  )
)
