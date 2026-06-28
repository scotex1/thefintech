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
    console.log("========== LOGIN START ==========")
    if (!email || !password) { toast.error("Fill in all fields"); return }
    setLoading(true)
    try {
      console.log("1. Starting Firebase login")
      const cred = await signInWithEmailAndPassword(auth, email, password)
      console.log("2. Firebase Login Success", cred.user)
      console.log("3. Before syncUser")
      await apiClient.syncUser({ uid: cred.user.uid, email: cred.user.email || "", name: cred.user.displayName || "" })
      console.log("4. After syncUser")
      toast.success("Welcome back!")
      console.log("5. Redirecting")
      router.replace("/dashboard")
    } catch (err: any) {
      console.error("LOGIN ERROR:", err)
      console.error("CODE:", err.code)
      console.error("MESSAGE:", err.message)
      toast.error(fbError(err.code))
    } finally {
      console.log("========== LOGIN END ==========")
      setLoading(false)
    }
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
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-base)' }}>

      {/* ── Left decorative panel (desktop only) ─────────────── */}
      <div
        className="hide-mobile"
        style={{
          width: '440px', flexShrink: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '48px', position: 'relative', overflow: 'hidden',
          background: 'var(--bg-raised)',
          borderRight: '1px solid var(--border-default)',
        }}
      >
        {/* Background textures */}
        <div className="ticker-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at bottom left, rgba(201,168,76,0.10) 0%, transparent 60%)',
        }} />
        {/* Top-right subtle glow */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px', pointerEvents: 'none',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }} />

        {/* Logo */}
        <div style={{ position: 'relative' }}>
          <Link
            href="/home"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '38px', height: '38px', borderRadius: 'var(--r-md)',
              background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '1.1rem', color: 'var(--gold)',
            }}>F</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)' }}>
              Fin<span style={{ color: 'var(--gold)' }}>Vest Pro</span>
            </span>
          </Link>
        </div>

        {/* Hero copy */}
        <div style={{ position: 'relative' }}>
          <div className="badge badge-gold" style={{ marginBottom: '20px' }}>AI-Powered</div>
          <p
            className="display-md"
            style={{ fontFamily: 'var(--font-display)', marginBottom: '28px' }}
          >
            Your investment advisor,{' '}
            <span className="gradient-gold">available 24/7.</span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'Risk profiling in under 3 minutes',
              'SIP goals with milestone tracking',
              'Retirement corpus calculator',
              'Real-time global event alerts',
            ].map(f => (
              <div
                key={f}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  fontSize: '0.875rem', color: 'var(--text-secondary)',
                }}
              >
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--gain-dim)', border: '1px solid var(--border-gain)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="var(--gain-bright)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="caption" style={{ position: 'relative' }}>
          Investments subject to market risk. Read all documents carefully.
        </p>
      </div>

      {/* ── Right panel — form ────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '32px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Mobile logo */}
          <div className="show-mobile" style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
            <Link href="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: 'var(--r-md)',
                background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gold)',
              }}>F</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)' }}>
                Fin<span style={{ color: 'var(--gold)' }}>Vest Pro</span>
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '32px' }}>
            <h1 className="display-md" style={{ marginBottom: '6px' }}>Welcome back</h1>
            <p className="body-md">Sign in to continue to your dashboard</p>
          </div>

          {/* Google button */}
          <button
            onClick={googleLogin}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '10px', padding: '11px 20px',
              background: 'var(--bg-overlay)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--r-md)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem', fontWeight: 500,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              transition: 'all var(--t-base)',
              marginBottom: '24px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
            }}
          >
            <GoogleIcon /> Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div className="divider" style={{ flex: 1 }} />
            <span className="caption">or with email</span>
            <div className="divider" style={{ flex: 1 }} />
          </div>

          {/* Form */}
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
            />
            <div>
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={forgot}
                style={{
                  marginTop: '8px',
                  fontSize: '0.8rem', fontWeight: 500,
                  color: 'var(--gold)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', padding: 0,
                  transition: 'opacity var(--t-fast)',
                }}
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">
              Sign in
            </Button>
          </form>

          {/* Footer */}
          <p
            className="caption"
            style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-tertiary)' }}
          >
            No account?{' '}
            <Link
              href="/auth/signup"
              style={{ color: 'var(--gold)', fontWeight: 500, textDecoration: 'none' }}
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
