'use client'
import { useState } from 'react'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'

const PLANS = [
  {id:'free',name:'Free',mo:0,yr:0,badge:'#717180',bg:'rgba(113,113,128,0.1)',tagline:'Start exploring for free',featured:false,
   features:[{t:'Risk Profiler (full)',v:true},{t:'Market News feed',v:true},{t:'Basic SIP calculator',v:true},{t:'1 saved goal',v:true},{t:'Goal Planner + milestones',v:false},{t:'Retirement Calculator',v:false},{t:'Stock Analysis AI',v:false},{t:'Portfolio Optimizer',v:false},{t:'Global Events Engine',v:false}]},
  {id:'basic',name:'Basic',mo:499,yr:4499,badge:'#5B9FFF',bg:'rgba(91,159,255,0.1)',tagline:'For serious goal-driven investors',featured:false,
   features:[{t:'Everything in Free',v:true},{t:'Goal Planner + milestones',v:true},{t:'Retirement Corpus Calculator',v:true},{t:'Unlimited goal tracking',v:true},{t:'Email support',v:true},{t:'Stock Analysis AI',v:false},{t:'Portfolio Optimizer',v:false},{t:'Global Events Engine',v:false},{t:'Tax Harvesting AI',v:false}]},
  {id:'pro',name:'Pro',mo:999,yr:8999,badge:'#C9A84C',bg:'rgba(201,168,76,0.12)',tagline:'Full AI investment intelligence',featured:true,
   features:[{t:'Everything in Basic',v:true},{t:'AI Stock Analysis (NSE/BSE)',v:true},{t:'Portfolio Optimizer (MPT)',v:true},{t:'Global Events Engine',v:true},{t:'Priority support',v:true},{t:'Downloadable PDF reports',v:true},{t:'Sector fund recommendations',v:true},{t:'Tax Harvesting AI',v:false},{t:'Family portfolios',v:false}]},
  {id:'elite',name:'Elite',mo:1999,yr:17999,badge:'#9B7FFF',bg:'rgba(155,127,255,0.1)',tagline:'Power users & advisors',featured:false,
   features:[{t:'Everything in Pro',v:true},{t:'Tax Harvesting AI',v:true},{t:'Family portfolios (5 members)',v:true},{t:'Advisor dashboard',v:true},{t:'API access (JSON)',v:true},{t:'White-label reports',v:true},{t:'Dedicated account manager',v:true},{t:'Custom engine parameters',v:true},{t:'Priority phone support',v:true}]},
]
const COMPARE = [
  {f:'Risk Profiler',free:true,basic:true,pro:true,elite:true},
  {f:'Market News',free:true,basic:true,pro:true,elite:true},
  {f:'Goal Planner',free:false,basic:true,pro:true,elite:true},
  {f:'Retirement Calculator',free:false,basic:true,pro:true,elite:true},
  {f:'Stock Analysis AI',free:false,basic:false,pro:true,elite:true},
  {f:'Portfolio Optimizer',free:false,basic:false,pro:true,elite:true},
  {f:'Global Events',free:false,basic:false,pro:true,elite:true},
  {f:'Tax Harvesting AI',free:false,basic:false,pro:false,elite:true},
  {f:'Family Portfolios',free:false,basic:false,pro:false,elite:true},
]
const FAQ = [
  {q:'Can I upgrade or downgrade anytime?',a:'Yes. Upgrades are instant. Downgrades take effect at end of billing period. No cancellation fee.'},
  {q:'What is the refund policy?',a:'7-day full refund from date of purchase, no questions asked — provided less than 3 engine sessions used.'},
  {q:'Is this SEBI-registered investment advice?',a:'No. FinVest Pro provides AI-generated analysis for educational purposes only. Always consult a qualified advisor before investing.'},
  {q:'What payment methods are accepted?',a:'All major credit/debit cards, UPI, net banking, and wallets via Cashfree. PCI-DSS compliant.'},
  {q:'What happens when my plan expires?',a:'Account downgrades to Free automatically. All goals and data are preserved. Premium engine access resumes on renewal.'},
]

export default function PricingPage() {
  const [yr, setYr] = useState(false)
  const [faq, setFaq] = useState<number|null>(null)
  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>
      {/* Hero */}
      <section style={{position:'relative',paddingTop:140,paddingBottom:64,textAlign:'center',overflow:'hidden'}}>
        <div className="hglow"/>
        <div className="w" style={{position:'relative'}}>
          <div className="fu d0" style={{display:'inline-block',padding:'6px 16px',borderRadius:99,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',fontSize:12,fontWeight:600,color:'var(--gold)',letterSpacing:'0.06em',marginBottom:24}}>PRICING</div>
          <h1 className="fu d1 pf" style={{fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:800,letterSpacing:'-0.025em',lineHeight:1.08,marginBottom:14}}>Simple, transparent pricing</h1>
          <p className="fu d2" style={{fontSize:17,color:'var(--t2)',lineHeight:1.65,marginBottom:36}}>Start free. Upgrade when you need more power.</p>
          {/* Toggle */}
          <div className="fu d3" style={{display:'inline-flex',alignItems:'center',gap:2,padding:4,borderRadius:12,background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)'}}>
            {[{l:'Monthly',v:false},{l:'Yearly',v:true}].map(o=>(
              <button key={String(o.v)} onClick={()=>setYr(o.v)} style={{padding:'8px 20px',borderRadius:9,fontSize:14,fontWeight:600,cursor:'pointer',border:'none',fontFamily:'inherit',display:'flex',alignItems:'center',gap:8,background:yr===o.v?'var(--bg4)':'transparent',color:yr===o.v?'var(--t1)':'var(--t3)',boxShadow:yr===o.v?'0 1px 4px rgba(0,0,0,0.5)':'none',transition:'all 0.15s'}}>
                {o.l}{o.v&&<span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:99,background:'rgba(14,217,122,0.15)',color:'var(--green)',border:'1px solid rgba(14,217,122,0.2)'}}>SAVE 25%</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section style={{padding:'0 0 96px',position:'relative',zIndex:1}}>
        <div className="w" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16,alignItems:'start'}}>
          {PLANS.map(p=>{
            const price = yr ? p.yr : p.mo
            const saved = p.mo > 0 ? p.mo*12 - p.yr : 0
            return (
              <div key={p.id} style={{position:'relative',borderRadius:22,overflow:'hidden',background:p.featured?'linear-gradient(180deg,#17140E,var(--bg3))':'var(--bg3)',border:p.featured?'1px solid rgba(201,168,76,0.32)':'1px solid rgba(255,255,255,0.05)',boxShadow:p.featured?'0 0 60px rgba(201,168,76,0.08)':'none'}}>
                {p.featured&&<div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,#C9A84C,transparent)'}}/>}
                {p.featured&&<div style={{textAlign:'center',paddingTop:14}}><span style={{fontSize:11,fontWeight:700,padding:'4px 14px',borderRadius:99,background:'rgba(201,168,76,0.15)',color:'var(--gold)',border:'1px solid rgba(201,168,76,0.25)',letterSpacing:'0.05em'}}>★ MOST POPULAR</span></div>}
                <div style={{padding:p.featured?'22px 28px 28px':'32px 28px 28px'}}>
                  <div style={{display:'inline-flex',padding:'4px 12px',borderRadius:99,marginBottom:18,background:p.bg,border:`1px solid ${p.badge}30`}}>
                    <span style={{fontSize:12,fontWeight:700,color:p.badge,letterSpacing:'0.04em'}}>{p.name}</span>
                  </div>
                  <div style={{marginBottom:4}}>
                    <span style={{fontSize:40,fontWeight:800,fontFamily:'var(--font-m)',letterSpacing:'-0.04em',color:'var(--t1)'}}>{price===0?'₹0':`₹${price.toLocaleString('en-IN')}`}</span>
                    <span style={{fontSize:14,color:'var(--t3)',marginLeft:4}}>{price===0?'/forever':yr?'/year':'/month'}</span>
                  </div>
                  {yr&&saved>0&&<div style={{fontSize:12,color:'var(--green)',marginBottom:6,fontWeight:600}}>💚 Save ₹{saved.toLocaleString('en-IN')}/year</div>}
                  <p style={{fontSize:13,color:'var(--t2)',marginBottom:22,lineHeight:1.5}}>{p.tagline}</p>
                  {p.id==='free'
                    ?<Link href="/auth/signup" style={{display:'block',textAlign:'center',padding:'11px 0',borderRadius:11,fontSize:14,fontWeight:600,textDecoration:'none',marginBottom:22,background:'transparent',color:'var(--t2)',border:'1px solid rgba(255,255,255,0.1)'}}>Get started free</Link>
                    :<Link href="/auth/signup" style={{display:'block',textAlign:'center',padding:'11px 0',borderRadius:11,fontSize:14,fontWeight:700,textDecoration:'none',marginBottom:22,background:p.featured?'var(--gold)':'rgba(255,255,255,0.07)',color:p.featured?'var(--bg)':'var(--t1)',boxShadow:p.featured?'0 2px 12px rgba(201,168,76,0.25)':'none'}}>Upgrade to {p.name}</Link>
                  }
                  <div style={{borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:18}}>
                    {p.features.map((f,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                        <div style={{width:17,height:17,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,background:f.v?'rgba(14,217,122,0.15)':'rgba(255,255,255,0.04)',color:f.v?'var(--green)':'var(--t4)'}}>{f.v?'✓':'–'}</div>
                        <span style={{fontSize:13,color:f.v?'var(--t1)':'var(--t3)',textDecoration:f.v?'none':'line-through'}}>{f.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Compare table */}
      <section style={{padding:'96px 0',background:'var(--bg2)',borderTop:'1px solid rgba(255,255,255,0.03)',position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Compare plans</div>
            <h2 className="pf" style={{fontSize:'clamp(1.5rem,4vw,2.25rem)',fontWeight:800,letterSpacing:'-0.02em'}}>Full feature comparison</h2>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left',padding:'12px 16px',color:'var(--t3)',fontSize:11,fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>Feature</th>
                  {['Free','Basic','Pro','Elite'].map(n=><th key={n} style={{textAlign:'center',padding:'12px 16px',fontWeight:700,fontSize:14,borderBottom:'1px solid rgba(255,255,255,0.05)',color:n==='Pro'?'var(--gold)':'var(--t1)'}}>{n}</th>)}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row,i)=>(
                  <tr key={row.f} style={{background:i%2===0?'transparent':'rgba(255,255,255,0.015)'}}>
                    <td style={{padding:'13px 16px',color:'var(--t2)',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>{row.f}</td>
                    {[row.free,row.basic,row.pro,row.elite].map((v,j)=>(
                      <td key={j} style={{textAlign:'center',padding:'13px 16px',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                        {v?<span style={{color:'var(--green)',fontSize:16,fontWeight:700}}>✓</span>:<span style={{color:'var(--t4)',fontSize:14}}>–</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section style={{padding:'72px 0',position:'relative',zIndex:1}}>
        <div className="w" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
          {[{icon:'🔒',t:'Secure payments',d:'256-bit SSL via Cashfree. Card details never stored.'},{icon:'↩',t:'7-day refund',d:'Full refund within 7 days, no questions asked.'},{icon:'📋',t:'SEBI-compliant',d:'Educational analysis following SEBI guidelines.'},{icon:'🇮🇳',t:'India-first',d:'NSE/BSE data, INR goals, Indian tax laws.'}].map(f=>(
            <div key={f.t} style={{display:'flex',gap:14,padding:'20px',background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:16}}>
              <div style={{fontSize:24,flexShrink:0}}>{f.icon}</div>
              <div><p style={{fontSize:13,fontWeight:700,color:'var(--t1)',marginBottom:4}}>{f.t}</p><p style={{fontSize:12,color:'var(--t3)',lineHeight:1.6}}>{f.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'0 0 96px',position:'relative',zIndex:1}}>
        <div className="w" style={{maxWidth:680}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>FAQ</div>
            <h2 className="pf" style={{fontSize:'clamp(1.5rem,4vw,2.25rem)',fontWeight:800,letterSpacing:'-0.02em'}}>Common questions</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {FAQ.map((f,i)=>(
              <div key={i} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:14,overflow:'hidden'}}>
                <button onClick={()=>setFaq(faq===i?null:i)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 22px',background:'transparent',border:'none',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}>
                  <span style={{fontSize:14,fontWeight:600,color:'var(--t1)',lineHeight:1.4,paddingRight:16}}>{f.q}</span>
                  <span style={{fontSize:20,color:'var(--gold)',flexShrink:0,transform:faq===i?'rotate(45deg)':'none',transition:'transform 0.2s'}}>+</span>
                </button>
                {faq===i&&<div style={{padding:'0 22px 18px'}}><p style={{fontSize:13.5,color:'var(--t2)',lineHeight:1.7}}>{f.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter/>
    </div>
  )
}