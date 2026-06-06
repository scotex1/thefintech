'use client'
import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { apiClient } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  const fbError = (code: string) => {
    const map: Record<string, string> = {
      'auth/invalid-credential':     'Invalid email or password.',
      'auth/user-not-found':         'No account with this email.',
      'auth/wrong-password':         'Incorrect password.',
      'auth/too-many-requests':      'Too many attempts. Try again later.',
      'auth/network-request-failed': 'Network error. Check your connection.',
    }
    return map[code] || 'Something went wrong. Please try again.'
  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Fill in all fields'); return }
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      if (!cred.user.emailVerified) {
        await auth.signOut()
        toast.error('Please verify your email before signing in.')
        return
      }
      await apiClient.syncUser({ uid: cred.user.uid, email: cred.user.email || "", name: cred.user.displayName || "" })
      toast.success('Welcome back!')
      router.replace('/dashboard')
    } catch (err: any) {
      toast.error(fbError(err.code))
    } finally { setLoading(false) }
  }

  const googleLogin = async () => {
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider())
      await apiClient.syncUser({ uid: cred.user.uid, email: cred.user.email || "", name: cred.user.displayName || "", photo: cred.user.photoURL || "" })
      router.replace('/dashboard')
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') toast.error('Google sign-in failed.')
    }
  }

  const forgot = async () => {
    if (!email) { toast.error('Enter your email first'); return }
    try { await sendPasswordResetEmail(auth, email); toast.success('Reset link sent!') }
    catch { toast.success('If this email exists, a reset link was sent.') }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)' }}>
      {/* Left panel — decorative (desktop only) */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10 relative overflow-hidden"
        style={{ background: 'var(--bg-raised)', borderRight: '1px solid var(--border-1)' }}
      >
        <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none"/>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(212,168,83,0.08), transparent 60%)' }}/>
        <div className="relative">
          <Link href="/home" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>F</div>
            <span className="font-semibold text-base" style={{ fontFamily: 'var(--font-display)' }}>Finvest<span style={{ color: 'var(--gold)' }}>Pro</span></span>
          </Link>
        </div>
        <div className="relative">
          <p className="display-md mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Your AI investment advisor, <span className="gradient-gold">available 24/7.</span>
          </p>
          <div className="flex flex-col gap-3">
            {['Risk profiling in under 3 minutes', 'SIP goals with milestone tracking', 'Retirement corpus calculator', 'Real-time global event alerts'].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--green)' }}>✓</span>{f}
              </div>
            ))}
          </div>
        </div>
        <p className="caption relative">Investments subject to market risk. Read all documents carefully.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/home" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>F</div>
              <span className="font-semibold text-base">Finvest<span style={{ color: 'var(--gold)' }}>Pro</span></span>
            </Link>
          </div>

          <h1 className="display-md mb-1.5">Welcome back</h1>
          <p className="body-md mb-8">Sign in to your account</p>

          {/* Google */}
          <button
            onClick={googleLogin}
            className="btn btn-ghost btn-lg w-full mb-6"
            style={{ border: '1px solid var(--border-1)', justifyContent: 'center' }}
          >
            <GoogleIcon/> Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 divider"/>
            <span className="caption">or continue with email</span>
            <div className="flex-1 divider"/>
          </div>

          {/* Form */}
          <form onSubmit={login} className="flex flex-col gap-4">
            <Input label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" autoFocus/>
            <div>
              <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password"/>
              <button type="button" onClick={forgot} className="text-xs mt-2 transition-colors" style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Forgot password?
              </button>
            </div>
            <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">Sign in</Button>
          </form>

          <p className="text-sm text-center mt-6" style={{ color: 'var(--text-3)' }}>
            No account?{' '}
            <Link href="/auth/signup" style={{ color: 'var(--gold)' }} className="font-medium hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}