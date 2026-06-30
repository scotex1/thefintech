import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'
export const metadata: Metadata = { title:'Terms of Service — FinVest Pro' }

export default function Page() {
  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>
      <section style={{paddingTop:140,paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w" style={{maxWidth:760}}>
          <div style={{marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14}}>Legal</p>
            <h1 className="pf" style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:800,letterSpacing:'-0.025em',marginBottom:8}}>Terms of Service</h1>
            <p style={{fontSize:13,color:'var(--t3)'}}>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>1. Acceptance of Terms</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              By using FinVest Pro, you agree to these terms. Our platform provides financial analysis tools for informational and educational purposes only.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>2. Not Financial Advice</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              All analysis, recommendations, and projections on FinVest Pro are for educational purposes only and do not constitute SEBI-registered investment advice. Consult a qualified advisor before investing.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>3. Investment Risk Disclaimer</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Investments in securities are subject to market risks. Past performance does not guarantee future returns. The value of investments may go up or down. FinVest Pro is not liable for investment losses.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>4. Account Responsibilities</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              You are responsible for maintaining the security of your account credentials. Do not share your password with anyone. Report unauthorized access immediately.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>5. Subscription and Payments</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Subscriptions are billed in advance. Cancellations take effect at the end of the billing period. Refunds are subject to our Refund Policy.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>6. Intellectual Property</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              All content, code, and AI engines on FinVest Pro are proprietary. You may not copy, reproduce, or distribute any part of the platform without written permission.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>7. Contact</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Legal queries: legal@finvestpro.in
            </p>
          </div>
          </div>
        </div>
      </section>
      <PublicFooter/>
    </div>
  )
}