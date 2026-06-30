import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title:'Subscription — FinVest Pro' }

const FEATURES_FREE = ['Risk Profiler (full 10-question)','Market News feed','Basic SIP calculator','1 saved goal']
const PAYMENTS: any[] = []

export default function SubscriptionPage() {
  return (
    <div style={{maxWidth:660}}>
      <div style={{marginBottom:32}}>
        <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:8}}>Billing</p>
        <h1 className="pf" style={{fontSize:'clamp(1.8rem,3vw,2.2rem)',fontWeight:800,letterSpacing:'-0.02em'}}>Subscription</h1>
      </div>

      {/* Current plan card */}
      <div style={{background:'linear-gradient(160deg,var(--bg4),var(--bg3))',border:'1px solid rgba(201,168,76,0.2)',borderRadius:24,padding:'30px',marginBottom:16,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at top right,rgba(201,168,76,0.07),transparent 65%)',pointerEvents:'none'}}/>
        <div style={{position:'relative'}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:22}}>
            <div>
              <span style={{fontSize:11,padding:'3px 10px',borderRadius:99,fontWeight:600,background:'rgba(113,113,128,0.15)',color:'#8080A0',border:'1px solid rgba(113,113,128,0.2)',display:'inline-block',marginBottom:10}}>Free Plan</span>
              <h2 className="pf" style={{fontSize:28,fontWeight:700,color:'var(--t1)',marginBottom:2}}>Free Plan</h2>
              <p style={{fontSize:13,color:'var(--t3)'}}>No expiry · Active forever</p>
            </div>
            <div style={{width:54,height:54,borderRadius:16,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.18)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>⭐</div>
          </div>

          {/* Status row */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderRadius:12,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.04)',marginBottom:22}}>
            <div>
              <p style={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>Free forever</p>
              <p style={{fontSize:12,color:'var(--t3)',marginTop:2}}>No billing, no credit card</p>
            </div>
            <span style={{fontSize:11,padding:'4px 12px',borderRadius:99,fontWeight:600,background:'rgba(14,217,122,0.1)',color:'var(--green)',border:'1px solid rgba(14,217,122,0.2)'}}>● Active</span>
          </div>

          {/* Features */}
          <div style={{marginBottom:22}}>
            <p style={{fontSize:12,fontWeight:600,color:'var(--t3)',marginBottom:12}}>Included in your plan</p>
            {FEATURES_FREE.map(f=>(
              <div key={f} style={{display:'flex',alignItems:'center',gap:10,fontSize:14,color:'var(--t2)',marginBottom:9}}>
                <div style={{width:17,height:17,borderRadius:'50%',background:'rgba(14,217,122,0.1)',border:'1px solid rgba(14,217,122,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'var(--green)',flexShrink:0}}>✓</div>
                {f}
              </div>
            ))}
          </div>

          <Link href="/pricing" style={{display:'block',textAlign:'center',padding:'13px',borderRadius:12,background:'var(--gold)',color:'var(--bg)',fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 2px 16px rgba(201,168,76,0.25)'}}>Upgrade Plan</Link>
        </div>
      </div>

      {/* Compare plans CTA */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
        {[{id:'basic',name:'Basic',price:'₹499/mo',c:'#5B9FFF'},{id:'pro',name:'Pro',price:'₹999/mo',c:'#C9A84C'},{id:'elite',name:'Elite',price:'₹1,999/mo',c:'#9B7FFF'}].map(p=>(
          <Link key={p.id} href="/pricing" style={{textDecoration:'none',display:'block',background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:16,padding:'18px 14px',textAlign:'center',transition:'border-color 0.15s'}}>
            <p style={{fontSize:15,fontWeight:700,color:p.c,fontFamily:'var(--font-d)',marginBottom:4}}>{p.name}</p>
            <p style={{fontFamily:'var(--font-m)',fontSize:15,fontWeight:500,color:'var(--t1)',marginBottom:4}}>{p.price}</p>
            <p style={{fontSize:11,color:'var(--t3)'}}>View details →</p>
          </Link>
        ))}
      </div>

      {/* Payment history */}
      <div style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:22,padding:'26px'}}>
        <h2 className="pf" style={{fontSize:18,fontWeight:700,marginBottom:20,color:'var(--t1)'}}>Payment History</h2>
        {PAYMENTS.length===0?(
          <div style={{textAlign:'center',padding:'40px 0'}}>
            <div style={{fontSize:36,marginBottom:12}}>💳</div>
            <p style={{fontSize:14,color:'var(--t3)'}}>No payments yet</p>
          </div>
        ):(
          <p>Payments here</p>
        )}
      </div>
    </div>
  )
}