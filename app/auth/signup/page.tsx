'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
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

export default function SignupPage() {
  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }))

  const signup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Fill in all fields'); return }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(cred.user, { displayName: form.name.trim() })
      toast.success('Account created!')
      router.replace('/dashboard')
    } catch (err: any) {
      toast.error(err.message?.includes('email-already-in-use') ? 'Email already registered.' : err.message || 'Signup failed.')
    } finally { setLoading(false) }
  }

  const googleSignup = async () => {
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider())
      toast.success('Account created with Google!')
      router.replace('/dashboard')
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') toast.error('Google sign-up failed.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-base)' }}>

      {/* ── Left — form ───────────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '40px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
            <Link href="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
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

          {/* Heading */}
          <div style={{ marginBottom: '28px' }}>
            <h1 className="display-md" style={{ marginBottom: '6px' }}>Create your account</h1>
            <p className="body-md">Start your AI investment journey — free forever</p>
          </div>

          {/* Google button */}
          <button
            onClick={googleSignup}
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
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)' }}
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
          <form onSubmit={signup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Full name"
              value={form.name}
              onChange={set('name')}
              placeholder="Rahul Sharma"
              autoComplete="name"
              autoFocus
            />
            <Input
              label="Email address"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="Min. 6 characters"
              hint="At least 6 characters"
            />
            <Input
              label="Confirm password"
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              placeholder="Repeat password"
            />
            <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">
              Create account
            </Button>
          </form>

          {/* Legal + login link */}
          <p className="caption" style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-tertiary)' }}>
            By signing up, you agree to our{' '}
            <Link href="/legal/terms" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Terms</Link>
            {' '}and{' '}
            <Link href="/legal/privacy" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Privacy Policy</Link>
          </p>
          <p className="caption" style={{ textAlign: 'center', marginTop: '12px', color: 'var(--text-tertiary)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: 'var(--gold)', fontWeight: 500, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right decorative panel (desktop only) ────────────── */}
      <div
        className="hide-mobile"
        style={{
          width: '400px', flexShrink: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '48px', position: 'relative', overflow: 'hidden',
          background: 'var(--bg-raised)',
          borderLeft: '1px solid var(--border-default)',
        }}
      >
        <div className="ticker-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.10) 0%, transparent 65%)',
        }} />

        <div style={{ position: 'relative' }}>
          <div className="overline" style={{ marginBottom: '24px' }}>What you get for free</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
            {[
              { icon: '◐', title: 'Risk Profiler',  desc: '10-question AI quiz, instant results' },
              { icon: '◉', title: 'Market News',    desc: 'AI-curated from 50+ sources, live' },
              { icon: '◎', title: 'Basic SIP Calc', desc: 'Goal-based planning, milestone tracking' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: 'var(--r-md)', flexShrink: 0,
                  background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--gold)',
                }}>{f.icon}</div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
                    {f.title}
                  </p>
                  <p className="caption">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '24px' }}>
            {/* Mini stat row */}
            <div style={{ display: 'flex', gap: '24px' }}>
              {[
                { num: '50K+', label: 'Investors' },
                { num: '4.9★', label: 'Rating' },
                { num: 'Free', label: 'Forever' },
              ].map(s => (
                <div key={s.label}>
                  <p className="num-sm" style={{ color: 'var(--gold-bright)', fontWeight: 600 }}>{s.num}</p>
                  <p className="caption" style={{ marginTop: '2px' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
