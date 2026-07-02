'use client'
import { useState } from 'react'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

const CHANNELS = [
  { icon: '✉', label: 'Email', value: 'support@finvestpro.in' },
  { icon: '◔', label: 'WhatsApp', value: '+91 XXXXX XXXXX' },
  { icon: '◷', label: 'Hours', value: 'Mon–Fri, 9am–6pm IST' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Fill all required fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    toast.success('Message sent! We will reply within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-1)', minHeight: '100vh' }}>
      <MarketingNav/>

      <div className="page-container" style={{ maxWidth: 640, paddingTop: 128, paddingBottom: 96 }}>
        <div className="text-center mb-12">
          <p className="label mb-3">Get in touch</p>
          <h1 className="display-lg mb-3">Contact us</h1>
          <p className="body-lg">We typically reply within 24 hours on business days.</p>
        </div>

        <div className="surface p-6 md:p-8 mb-8">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Your name *" value={form.name} onChange={set('name')} placeholder="Rahul Sharma"/>
              <Input label="Email *" type="email" value={form.email} onChange={set('email')} placeholder="rahul@email.com"/>
            </div>
            <Input label="Subject" value={form.subject} onChange={set('subject')} placeholder="Question about Pro plan"/>
            <div className="flex flex-col gap-1.5">
              <label className="caption font-semibold" style={{ color: 'var(--text-2)', letterSpacing: '0.02em' }}>Message *</label>
              <textarea value={form.message} onChange={set('message') as any} rows={5} placeholder="How can we help you?" className="input"/>
            </div>
            <Button type="submit" loading={loading} size="lg" className="w-full mt-2">Send message</Button>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {CHANNELS.map(c => (
            <div key={c.label} className="surface-sm p-4 text-center">
              <div className="text-lg mb-2 mono" style={{ color: 'var(--primary-light)' }}>{c.icon}</div>
              <p className="caption mb-1">{c.label}</p>
              <p className="text-xs font-medium" style={{ color: 'var(--text-1)' }}>{c.value}</p>
            </div>
          ))}
        </div>
      </div>

      <MarketingFooter/>
    </div>
  )
}
