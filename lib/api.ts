import axios, { AxiosError } from 'axios'
import { auth } from './firebase'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'https://your-backend.com/api/v1',
  timeout: 20000,
})

api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch {}
  return config
})

api.interceptors.response.use(res => res, async (err: AxiosError) => {
  const config = err.config as any
  if (err.response?.status === 401 && !config._retry) {
    config._retry = true
    try {
      const token = await auth.currentUser?.getIdToken(true)
      if (token) { config.headers.Authorization = `Bearer ${token}`; return api(config) }
    } catch {}
    if (typeof window !== 'undefined') window.location.href = '/auth/login'
  }
  const data = err.response?.data as any
  const msg = data?.message || data?.detail || err.message || 'Something went wrong'
  return Promise.reject(new Error(typeof msg === 'string' ? msg : JSON.stringify(msg)))
})

export default api

export const apiClient = {
  // Auth
  syncUser:     (d: { uid: string; email: string; name?: string; photo?: string }) =>
    api.post('/auth/sync', d),

  // User
  getProfile:   () => api.get('/user/profile'),
  updateProfile:(d: { name?: string; phone?: string; city?: string; occupation?: string; income?: string }) =>
    api.put('/user/profile', d),
  getPlan:      () => api.get('/user/plan'),
  getStats:     () => api.get('/user/dashboard-stats'),
  getGoals:     () => api.get('/user/goals'),
  saveGoal:     (d: { goal_type: string; goal_name: string; target_amount: number; months: number; sip_required: number; annual_return?: number; current_saved?: number }) =>
    api.post('/user/goals', d),
  deleteGoal:   (id: string) => api.delete(`/user/goals/${id}`),

  // FREE engines
  getRiskProfile:  (d: { score: number; profile: string; answers: number[] }) =>
    api.post('/engines/risk-profile', d),
  getNews:         (category = 'all') => api.get('/engines/news', { params: { category } }),

  // BASIC+ engines
  getGoalPlan:     (d: { goal_type: string; goal_name: string; target_amount: number; target_date: string; current_saved?: number; annual_return?: number }) =>
    api.post('/engines/goal-planner', d),
  getRetirement:   (d: { current_age: number; retire_age: number; life_expectancy?: number; monthly_expenses: number; inflation?: number; current_savings?: number; return_pre?: number; return_post?: number }) =>
    api.post('/engines/retirement', d),

  // PRO+ engines
  analyzeStock:    (d: { symbol: string }) => api.post('/engines/stock-analysis', d),
  optimizePortfolio:(d: { amount: number; risk: string; horizon: number }) =>
    api.post('/engines/portfolio', d),
  getGlobalEvents: () => api.get('/engines/global-events'),

  // Payment
  createOrder:     (d: { plan_id: string; idempotency_key?: string }) =>
    api.post('/payment/create-order', d),
  verifyPayment:   (d: { order_id: string }) => api.post('/payment/verify', d),
  getPaymentHistory:() => api.get('/payment/history'),

  // Admin
  admin: {
    getStats:   () => api.get('/admin/stats'),
    getUsers:   (p: { page?: number; limit?: number; search?: string; plan?: string }) =>
      api.get('/admin/users', { params: p }),
    updateUser: (uid: string, d: { name?: string; is_admin?: boolean; is_active?: boolean }) =>
      api.put(`/admin/users/${uid}`, d),
    deleteUser: (uid: string) => api.delete(`/admin/users/${uid}`),
    changePlan: (uid: string, d: { plan_id: string; expiry_date: string }) =>
      api.put(`/admin/users/${uid}/plan`, d),
    getPayments:(p: { page?: number; limit?: number; status?: string; plan?: string }) =>
      api.get('/admin/payments', { params: p }),
    getPlans:   () => api.get('/admin/plans'),
    updatePlan: (id: string, d: { name?: string; price?: number; is_active?: boolean }) =>
      api.put(`/admin/plans/${id}`, d),
  }
}
