"use client"
import { useState } from "react"
import Link from "next/link"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import toast from "react-hot-toast"
export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" })
  const [loading, setLoading] = useState(false)
  const set = (k:string) => (e:any) => setForm(f=>({...f,[k]:e.target.value}))
  const submit = async (e:React.FormEvent) => {
    e.preventDefault()
    if (!form.name||!form.email||!form.message) { toast.error("Fill all required fields"); return }
    setLoading(true)
    await new Promise(r=>setTimeout(r,1200))
    toast.success("Message sent! We will reply within 24 hours.")
    setForm({ name:"", email:"", subject:"", message:"" })
    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-[#060A0F] text-[#F0F4F8]">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/home" className="flex items-center gap-2 font-bold">📈 Finvest<span className="text-[#C9A84C]">Pro</span></Link>
        <Link href="/auth/login" className="text-sm text-[#C9A84C]">Sign In</Link>
      </nav>
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-[#8A9BB0]">We typically reply within 24 hours on business days.</p>
        </div>
        <div className="bg-[#111820] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Your Name *" value={form.name} onChange={set("name")} placeholder="Rahul Sharma"/>
              <Input label="Email *" type="email" value={form.email} onChange={set("email")} placeholder="rahul@email.com"/>
            </div>
            <Input label="Subject" value={form.subject} onChange={set("subject")} placeholder="Question about Pro plan"/>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#8A9BB0] font-medium">Message *</label>
              <textarea value={form.message} onChange={set("message") as any} rows={5} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl text-sm bg-[#0C1219] border border-[rgba(255,255,255,0.08)] text-[#F0F4F8] placeholder-[#4A5568] focus:outline-none focus:border-[rgba(201,168,76,0.4)] resize-none transition-all"/>
            </div>
            <Button type="submit" loading={loading} className="w-full">Send Message</Button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon:"📧", label:"Email", value:"support@finvestpro.in" },
            { icon:"💬", label:"WhatsApp", value:"+91 XXXXX XXXXX" },
            { icon:"🕐", label:"Hours", value:"Mon–Fri, 9am–6pm IST" },
          ].map(c=>(
            <div key={c.label} className="bg-[#111820] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className="text-xs text-[#8A9BB0] mb-1">{c.label}</p>
              <p className="text-xs font-medium">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}