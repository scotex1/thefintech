'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function SignupPage() {
  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' })
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
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)' }}>
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="flex justify-center mb-8">
            <Link href="/home" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>F</div>
              <span className="font-semibold text-base">Finvest<span style={{ color: 'var(--gold)' }}>Pro</span></span>
            </Link>
          </div>

          <h1 className="display-md mb-1.5">Create your account</h1>
          <p className="body-md mb-8">Start your AI investment journey — free forever</p>

          <button onClick={googleSignup} className="btn btn-ghost btn-lg w-full mb-6" style={{ border: '1px solid var(--border-1)', justifyContent: 'center' }}>
            <GoogleIcon/> Continue with Google
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 divider"/>
            <span className="caption">or with email</span>
            <div className="flex-1 divider"/>
          </div>

          <form onSubmit={signup} className="flex flex-col gap-4">
            <Input label="Full name" value={form.name} onChange={set('name')} placeholder="Rahul Sharma" autoComplete="name" autoFocus/>
            <Input label="Email address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email"/>
            <Input label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" hint="At least 6 characters"/>
            <Input label="Confirm password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password"/>
            <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">Create account</Button>
          </form>

          <p className="caption text-center mt-6">
            By signing up, you agree to our{' '}
            <Link href="/legal/terms" style={{ color: 'var(--gold)' }}>Terms</Link> and{' '}
            <Link href="/legal/privacy" style={{ color: 'var(--gold)' }}>Privacy Policy</Link>
          </p>
          <p className="text-sm text-center mt-4" style={{ color: 'var(--text-3)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: 'var(--gold)' }} className="font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right decorative panel */}
      <div className="hidden lg:flex flex-col justify-center w-[380px] shrink-0 p-10 relative overflow-hidden" style={{ background: 'var(--bg-raised)', borderLeft: '1px solid var(--border-1)' }}>
        <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none"/>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(212,168,83,0.08), transparent 60%)' }}/>
        <div className="relative">
          <p className="label mb-6">What you get for free</p>
          <div className="flex flex-col gap-4">
            {[
              { icon: '◐', title: 'Risk Profiler',  desc: '10-question AI quiz, instant results' },
              { icon: '◉', title: 'Market News',    desc: 'AI-curated from 50+ sources' },
              { icon: '◎', title: 'Basic SIP Calc', desc: 'Goal-based planning' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 mono" style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>{f.icon}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{f.title}</p>
                  <p className="caption mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--border-1)' }}>
            <p className="caption">No credit card required. Upgrade anytime.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
