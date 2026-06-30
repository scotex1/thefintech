import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'
export const metadata: Metadata = { title:'Refund Policy — FinVest Pro' }

export default function Page() {
  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>
      <section style={{paddingTop:140,paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w" style={{maxWidth:760}}>
          <div style={{marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14}}>Legal</p>
            <h1 className="pf" style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:800,letterSpacing:'-0.025em',marginBottom:8}}>Refund Policy</h1>
            <p style={{fontSize:13,color:'var(--t3)'}}>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Refund Window</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              We offer a 7-day full refund on all subscription plans from the date of purchase, provided you have not used more than 3 premium engine sessions.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>How to Request a Refund</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Email support@finvestpro.in with your registered email and Order ID within 7 days of purchase. Refunds are processed within 5–7 business days to your original payment method.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Non-Refundable Cases</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Refunds are not provided after 7 days, for annual plans after the first 14 days, or if the account has violated our Terms of Service.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Partial Refunds</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              We do not offer partial refunds for unused subscription days. You retain access to your plan features until the end of the billing period.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Contact</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Refund queries: support@finvestpro.in · Please include your Order ID in the subject line.
            </p>
          </div>
          </div>
        </div>
      </section>
      <PublicFooter/>
    </div>
  )
}