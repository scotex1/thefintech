import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'
export const metadata: Metadata = { title:'Privacy Policy — FinVest Pro' }

export default function Page() {
  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>
      <section style={{paddingTop:140,paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w" style={{maxWidth:760}}>
          <div style={{marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14}}>Legal</p>
            <h1 className="pf" style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:800,letterSpacing:'-0.025em',marginBottom:8}}>Privacy Policy</h1>
            <p style={{fontSize:13,color:'var(--t3)'}}>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>1. Information We Collect</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              We collect your name, email, financial goals, risk profile answers, and usage analytics. We also collect device and browser data to improve performance.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>2. How We Use Your Information</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Your data is used to provide personalized AI analysis, generate risk profiles, calculate SIP recommendations, and improve our engines. We never sell your data to third parties.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>3. Data Security</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Payments are processed by Cashfree — we never store card details on our servers.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>4. Third-Party Services</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              We use Firebase (Google) for authentication and database, Cashfree for payments, and market data APIs for financial information. Each has their own privacy policy.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>5. Data Retention</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              We retain your data as long as your account is active. You may request deletion at any time by emailing privacy@finvestpro.in.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>6. Your Rights</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              You may access, correct, export, or delete your personal data at any time. Contact privacy@finvestpro.in for any privacy-related requests.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>7. Contact</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Privacy concerns: privacy@finvestpro.in · Response within 48 business hours.
            </p>
          </div>
          </div>
        </div>
      </section>
      <PublicFooter/>
    </div>
  )
}