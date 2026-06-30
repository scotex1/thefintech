import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'
export const metadata: Metadata = { title:'Help Center — FinVest Pro' }

export default function Page() {
  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>
      <section style={{paddingTop:140,paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w" style={{maxWidth:760}}>
          <div style={{marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14}}>Legal</p>
            <h1 className="pf" style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:800,letterSpacing:'-0.025em',marginBottom:8}}>Help Center</h1>
            <p style={{fontSize:13,color:'var(--t3)'}}>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Getting Started</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              After creating your account, take the Risk Profiler quiz first — it determines your investment profile and unlocks personalized recommendations across all engines.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Engine Quick Guide</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Risk Profiler (Free): 10-question quiz, instant profile. Market News (Free): AI-curated news, updated every 5 minutes. Goal Planner (Basic+): Enter target amount and months, get monthly SIP with milestones. Retirement Planner (Basic+): Enter age and expenses, get corpus calculation with growth chart. Stock Analysis (Pro+): Enter NSE/BSE symbol for AI analysis. Portfolio Optimizer (Pro+): Enter holdings to get MPT-based recommendations. Global Events (Pro+): Macro events mapped to your portfolio impact.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Payment Issues</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              If your payment was deducted but the plan was not activated, email support@finvestpro.in with your Order ID within 24 hours. We resolve all payment issues within 1 business day.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Account Issues</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Forgot password: Use the Forgot Password link on the login page. Email not verified: Check your spam folder and request a new verification email. Account locked: Contact support@finvestpro.in.
            </p>
          </div>
          <div style={{paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <h2 className="pf" style={{fontSize:20,fontWeight:700,color:'var(--t1)',marginBottom:12}}>Contact Support</h2>
            <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>
              Email: support@finvestpro.in · Response time: within 24 hours on business days (Monday–Friday, 9am–6pm IST).
            </p>
          </div>
          </div>
        </div>
      </section>
      <PublicFooter/>
    </div>
  )
}