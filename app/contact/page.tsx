'use client'
import { useState } from 'react'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'

const INP: React.CSSProperties = {
  width:'100%',padding:'11px 14px',fontSize:14,color:'var(--t1)',
  background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.07)',
  borderRadius:11,outline:'none',fontFamily:'inherit',transition:'border-color 0.15s',
}
const CHANNELS = [
  {icon:'📧',l:'Email',v:'support@finvestpro.in'},
  {icon:'💬',l:'WhatsApp',v:'+91 XXXXX XXXXX'},
  {icon:'🕐',l:'Hours',v:'Mon–Fri, 9am–6pm IST'},
]

export default function ContactPage() {
  const [form,setForm] = useState({name:'',email:'',subject:'',message:''})
  const [loading,setLoading] = useState(false)
  const [sent,setSent] = useState(false)
  const set = (k:string) => (e:any) => setForm(f=>({...f,[k]:e.target.value}))

  const submit = async(e:React.FormEvent) => {
    e.preventDefault()
    if (!form.name||!form.email||!form.message) return
    setLoading(true)
    await new Promise(r=>setTimeout(r,1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>
      <section style={{paddingTop:140,paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w" style={{maxWidth:640}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <div className="fu d0" style={{display:'inline-block',padding:'7px 18px',borderRadius:99,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',fontSize:12,fontWeight:600,color:'var(--gold)',letterSpacing:'0.07em',marginBottom:24}}>CONTACT</div>
            <h1 className="fu d1 pf" style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:800,letterSpacing:'-0.025em',marginBottom:12}}>Get in touch</h1>
            <p className="fu d2" style={{fontSize:16,color:'var(--t2)'}}>We reply within 24 hours on business days.</p>
          </div>

          {/* Channel cards */}
          <div className="fu d3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:32}}>
            {CHANNELS.map(c=>(
              <div key={c.l} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:16,padding:'20px',textAlign:'center'}}>
                <div style={{fontSize:24,marginBottom:10}}>{c.icon}</div>
                <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',marginBottom:4}}>{c.l}</p>
                <p style={{fontSize:12,color:'var(--t2)',lineHeight:1.5}}>{c.v}</p>
              </div>
            ))}
          </div>

          {sent ? (
            <div style={{textAlign:'center',padding:'60px 40px',background:'var(--bg3)',border:'1px solid rgba(14,217,122,0.2)',borderRadius:24}}>
              <div style={{fontSize:48,marginBottom:16}}>✅</div>
              <h2 className="pf" style={{fontSize:24,fontWeight:700,marginBottom:8}}>Message sent!</h2>
              <p style={{color:'var(--t2)'}}>We will reply to your email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="fu d4" style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:22,padding:'32px',display:'flex',flexDirection:'column',gap:16}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <label style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Your Name *</label>
                  <input style={INP} placeholder="Rahul Sharma" value={form.name} onChange={set('name')} required/>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <label style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Email *</label>
                  <input style={INP} type="email" placeholder="rahul@email.com" value={form.email} onChange={set('email')} required/>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                <label style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Subject</label>
                <input style={INP} placeholder="Question about Pro plan" value={form.subject} onChange={set('subject')}/>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                <label style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Message *</label>
                <textarea style={{...INP,resize:'vertical',minHeight:120,lineHeight:1.6}} placeholder="How can we help?" value={form.message} onChange={set('message') as any} required/>
              </div>
              <button type="submit" disabled={loading} style={{padding:'12px',borderRadius:11,background:'var(--gold)',color:'var(--bg)',fontSize:15,fontWeight:700,border:'none',cursor:'pointer',fontFamily:'inherit',boxShadow:'0 2px 14px rgba(201,168,76,0.25)',opacity:loading?0.7:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                {loading && <span className="sp"/>}{loading?'Sending…':'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
      <PublicFooter/>
    </div>
  )
}