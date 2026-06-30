import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'
import Link from 'next/link'
export const metadata: Metadata = { title:'About — FinVest Pro', description:'Why we built FinVest Pro and the AI technology behind 7 engines.' }

const TECH = [
  {n:'01',icon:'📊',t:'Risk Profile Engine',tech:'10-parameter behavioral scoring',c:'#C9A84C',d:'Scores age, income, dependents, horizon, liquidity, volatility comfort and 4 more parameters. Maps to 4 archetypes with precise asset allocations.'},
  {n:'02',icon:'🎯',t:'SIP Milestone Engine',tech:'Compound interest + step-up',c:'#0ED97A',d:'FV = P × [((1+r)^n − 1) / r] × (1+r). Calculates exact SIP for any goal with 4 milestone checkpoints and lumpsum alternative.'},
  {n:'03',icon:'🏖️',t:'Retirement Engine',tech:'Inflation-adjusted PV of annuity',c:'#9B7FFF',d:'Adjusts for inflation over accumulation period, models 25-year retirement window. More accurate than most bank calculators.'},
  {n:'04',icon:'📈',t:'Stock Analysis Engine',tech:'yfinance + rule-based technicals',c:'#5B9FFF',d:'Fetches live fundamentals (PE, PB, ROE, D/E) from NSE/BSE. Calculates RSI, MACD, MA crossovers. AI-written verdict.'},
  {n:'05',icon:'💼',t:'Portfolio Optimizer',tech:'Modern Portfolio Theory (MPT)',c:'#C9A84C',d:'Risk-profile-matched allocation across equity, debt, gold, international. Fund recommendations from SEBI-registered AMCs.'},
  {n:'06',icon:'🌐',t:'Global Event Engine',tech:'Macro event → portfolio mapping',c:'#00E5CC',d:'Tracks Fed, RBI, Budget, geopolitics. Maps impact to Indian equity, debt, gold and INR with sector-level breakdowns.'},
]
const VALUES = [
  {icon:'🎯',t:'Accuracy first',d:'Real financial formulas, not approximations. Every calculation is verifiable and explainable to the last decimal.'},
  {icon:'🔒',t:'Privacy by design',d:'Your financial data stays private. We never sell your data or share it with advertisers — ever.'},
  {icon:'📖',t:'Education-first',d:'Every recommendation comes with a clear explanation. We teach you why, not just what.'},
  {icon:'🇮🇳',t:'India-specific',d:'Built for Indian tax laws, SEBI regulations, NSE/BSE data, and rupee-denominated goals.'},
]
const TIMELINE = [
  {yr:'2024',t:'Idea & research',d:'Identified gap: 236M Indian investors, very few good AI advisory tools, all expensive or foreign.'},
  {yr:'2024',t:'7 engines built',d:'Risk profiler, goal planner, retirement, stock analysis, portfolio optimizer, news, global events — all from scratch.'},
  {yr:'2025',t:'Platform launched',d:'Full-stack launch with Firebase auth, Cashfree payments, and production-grade security architecture.'},
  {yr:'2025',t:'Growing fast',d:'Serving thousands of investors across India. Continuously improving AI accuracy and adding features.'},
]

export default function AboutPage() {
  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>

      {/* Hero */}
      <section style={{paddingTop:140,paddingBottom:80,position:'relative',overflow:'hidden',textAlign:'center'}}>
        <div className="hglow"/>
        <div className="w" style={{position:'relative',maxWidth:820}}>
          <div className="fu d0" style={{display:'inline-block',padding:'7px 18px',borderRadius:99,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',fontSize:12,fontWeight:600,color:'var(--gold)',letterSpacing:'0.07em',marginBottom:28}}>OUR STORY</div>
          <h1 className="fu d1 pf" style={{fontSize:'clamp(2.4rem,5vw,4rem)',fontWeight:800,letterSpacing:'-0.025em',lineHeight:1.07,marginBottom:22}}>
            Built for every Indian investor,<br/><em className="gg" style={{fontStyle:'italic'}}>not just the wealthy ones</em>
          </h1>
          <p className="fu d2" style={{fontSize:17,color:'var(--t2)',lineHeight:1.75,maxWidth:580,margin:'0 auto'}}>
            Professional investment intelligence was locked behind wealth management fees. We built FinVest Pro to change that — for 236 million Indian investors.
          </p>
        </div>
      </section>

      {/* Mission + Stats */}
      <section style={{paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'stretch',marginBottom:16}}>
            <div style={{background:'var(--bg3)',border:'1px solid rgba(201,168,76,0.18)',borderRadius:24,padding:'44px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,right:0,width:200,height:200,background:'radial-gradient(circle at top right,rgba(201,168,76,0.06),transparent)',pointerEvents:'none'}}/>
              <p style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:20}}>Our Mission</p>
              <h2 className="pf" style={{fontSize:26,fontWeight:700,letterSpacing:'-0.02em',marginBottom:18,lineHeight:1.2}}>Democratize investment intelligence for every Indian</h2>
              <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>HNI clients get sophisticated portfolio analysis and personalized risk assessment. We built the same — powered by AI — and made it accessible for ₹499/month or free to start.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {[{v:'236M',l:'Indian retail investors',c:'#C9A84C'},{v:'7',l:'AI engines in platform',c:'#0ED97A'},{v:'₹0',l:'To start, no credit card',c:'#5B9FFF'},{v:'SEBI',l:'Compliant advice format',c:'#9B7FFF'}].map(s=>(
                <div key={s.l} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:18,padding:'28px 22px'}}>
                  <div style={{fontFamily:'var(--font-m)',fontSize:30,fontWeight:500,color:s.c,letterSpacing:'-0.03em',marginBottom:8}}>{s.v}</div>
                  <div style={{fontSize:13,color:'var(--t3)',lineHeight:1.5}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section style={{paddingTop:80,paddingBottom:96,background:'var(--bg2)',borderTop:'1px solid rgba(255,255,255,0.04)',position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Under the Hood</p>
            <h2 className="pf" style={{fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:700,letterSpacing:'-0.025em',lineHeight:1.1}}>The technology powering<br/><em className="gg" style={{fontStyle:'italic'}}>every engine</em></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:14}}>
            {TECH.map((e,i)=>(
              <div key={e.t} className={`fu d${Math.min(i,7)}`} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:20,padding:'28px',position:'relative',overflow:'hidden',borderLeft:`3px solid ${e.c}`}}>
                <div style={{paddingLeft:4}}>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:14}}>
                    <div style={{fontSize:26,flexShrink:0}}>{e.icon}</div>
                    <div>
                      <div style={{fontSize:10,fontWeight:700,color:e.c,letterSpacing:'0.06em',marginBottom:4}}>{e.n}</div>
                      <h3 style={{fontSize:15,fontWeight:700,color:'var(--t1)',letterSpacing:'-0.01em'}}>{e.t}</h3>
                    </div>
                  </div>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:99,display:'inline-block',marginBottom:12,background:`${e.c}18`,color:e.c,border:`1px solid ${e.c}28`}}>{e.tech}</span>
                  <p style={{fontSize:13.5,color:'var(--t2)',lineHeight:1.65}}>{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{paddingTop:80,paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{textAlign:'center',marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Our Principles</p>
            <h2 className="pf" style={{fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:700,letterSpacing:'-0.025em',lineHeight:1.1}}>What we stand for</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:14}}>
            {VALUES.map((v,i)=>(
              <div key={v.t} className={`lift fu d${i}`} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:20,padding:'32px 26px'}}>
                <div style={{fontSize:32,marginBottom:18}}>{v.icon}</div>
                <h3 className="pf" style={{fontSize:18,fontWeight:700,marginBottom:10,color:'var(--t1)',letterSpacing:'-0.01em'}}>{v.t}</h3>
                <p style={{fontSize:14,color:'var(--t2)',lineHeight:1.65}}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{paddingTop:80,paddingBottom:96,background:'var(--bg2)',borderTop:'1px solid rgba(255,255,255,0.04)',position:'relative',zIndex:1}}>
        <div className="w" style={{maxWidth:720}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Journey</p>
            <h2 className="pf" style={{fontSize:'clamp(1.6rem,4vw,2.4rem)',fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.1}}>How we got here</h2>
          </div>
          <div style={{position:'relative'}}>
            <div style={{position:'absolute',left:16,top:16,bottom:16,width:1,background:'linear-gradient(to bottom,rgba(201,168,76,0.4),transparent)'}}/>
            {TIMELINE.map((t,i)=>(
              <div key={`tl-${i}`} style={{display:'flex',gap:32,marginBottom:40}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0}}>
                  <div style={{width:33,height:33,borderRadius:'50%',background:i===TIMELINE.length-1?'var(--gold)':'var(--bg3)',border:`2px solid ${i===TIMELINE.length-1?'var(--gold)':'rgba(201,168,76,0.3)'}`,display:'flex',alignItems:'center',justifyContent:'center',zIndex:1}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:i===TIMELINE.length-1?'var(--bg)':'var(--gold)'}}/>
                  </div>
                </div>
                <div style={{paddingTop:4,paddingBottom:16}}>
                  <div style={{fontFamily:'var(--font-m)',fontSize:12,fontWeight:400,color:'var(--gold)',letterSpacing:'0.06em',marginBottom:6}}>{t.yr}</div>
                  <h3 className="pf" style={{fontSize:18,fontWeight:700,color:'var(--t1)',marginBottom:8,letterSpacing:'-0.01em'}}>{t.t}</h3>
                  <p style={{fontSize:14,color:'var(--t2)',lineHeight:1.65}}>{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{maxWidth:640,margin:'0 auto',textAlign:'center',padding:'64px 48px',borderRadius:28,background:'linear-gradient(160deg,var(--bg4),var(--bg3))',border:'1px solid rgba(201,168,76,0.18)',boxShadow:'0 0 60px rgba(201,168,76,0.05)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.08),transparent 65%)',pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <h2 className="pf" style={{fontSize:'clamp(1.8rem,4vw,2.6rem)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:14}}>Ready to <em className="gg" style={{fontStyle:'italic'}}>get started?</em></h2>
              <p style={{fontSize:16,color:'var(--t2)',lineHeight:1.7,marginBottom:32,maxWidth:400,margin:'0 auto 32px'}}>Take the free Risk Profiler in 3 minutes. No credit card required.</p>
              <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                <Link href="/auth/signup" style={{padding:'13px 30px',borderRadius:12,fontSize:15,fontWeight:700,background:'var(--gold)',color:'var(--bg)',textDecoration:'none',boxShadow:'0 4px 20px rgba(201,168,76,0.28)'}}>Create free account</Link>
                <Link href="/pricing" style={{padding:'13px 24px',borderRadius:12,fontSize:15,fontWeight:600,background:'transparent',color:'var(--t2)',textDecoration:'none',border:'1px solid rgba(255,255,255,0.08)'}}>See pricing</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter/>
    </div>
  )
}