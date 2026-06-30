import Link from 'next/link'
import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'

export const metadata: Metadata = { title:'FinVest Pro — AI Investment Intelligence for India', description:'7 AI engines for risk profiling, goal planning, retirement, stock analysis — built for Indian investors.' }

const TICKER = [
  {s:'NIFTY 50',v:'22,147',c:'+0.42%',u:true},{s:'SENSEX',v:'73,142',c:'+0.38%',u:true},
  {s:'BANKNIFTY',v:'47,890',c:'-0.21%',u:false},{s:'GOLD',v:'₹74,850',c:'+0.65%',u:true},
  {s:'USD/INR',v:'83.42',c:'+0.08%',u:false},{s:'RELIANCE',v:'₹2,934',c:'+1.12%',u:true},
  {s:'TCS',v:'₹4,187',c:'+0.87%',u:true},{s:'HDFC BANK',v:'₹1,678',c:'-0.34%',u:false},
  {s:'INFY',v:'₹1,823',c:'+0.55%',u:true},{s:'CRUDE OIL',v:'$82.14',c:'-1.02%',u:false},
]

const ENGINES = [
  {icon:'📊',title:'Risk Profiler',badge:'Free',color:'#C9A84C',bg:'rgba(201,168,76,0.07)',desc:'10-question AI quiz maps exact risk tolerance with behavioral + financial scoring.'},
  {icon:'🎯',title:'Goal Planner',badge:'Basic+',color:'#0ED97A',bg:'rgba(14,217,122,0.07)',desc:'Any goal — home, education, wedding — precise SIP with 4 milestone checkpoints.'},
  {icon:'🏖️',title:'Retirement Planner',badge:'Basic+',color:'#9B7FFF',bg:'rgba(155,127,255,0.07)',desc:'Inflation-adjusted corpus calculation with interactive growth projections.'},
  {icon:'📈',title:'Stock Analysis AI',badge:'Pro+',color:'#C9A84C',bg:'rgba(201,168,76,0.07)',desc:'Deep fundamental + technical AI analysis for every NSE/BSE listed stock.'},
  {icon:'💼',title:'Portfolio Optimizer',badge:'Pro+',color:'#5B9FFF',bg:'rgba(91,159,255,0.07)',desc:'MPT-based diversification with India-specific NPT allocation recommendations.'},
  {icon:'🌐',title:'Global Events',badge:'Pro+',color:'#00E5CC',bg:'rgba(0,229,204,0.07)',desc:'RBI, Budget, Fed decisions mapped to your portfolio impact in real time.'},
  {icon:'📰',title:'Market News',badge:'Free',color:'#9090A0',bg:'rgba(144,144,160,0.06)',desc:'AI-curated news from 50+ Indian and global financial sources, updated live.'},
]

const STATS = [{v:'7',l:'AI Engines'},{v:'₹0',l:'To Start'},{v:'50+',l:'Data Sources'},{v:'SEBI',l:'Compliant'}]

const HOW = [
  {n:'01',icon:'🚀',t:'Create free account',d:'Sign up in 30 seconds. No credit card, no KYC required to begin.'},
  {n:'02',icon:'📊',t:'Take risk profile quiz',d:'10 questions. AI maps your exact risk archetype and recommends allocation.'},
  {n:'03',icon:'🎯',t:'Set financial goals',d:'Any goal — precise SIP plan with monthly milestone tracking built-in.'},
  {n:'04',icon:'📱',t:'Track & grow',d:'Monitor portfolio, receive macro alerts, unlock deeper AI engines over time.'},
]

const REVIEWS = [
  {name:'Priya Sharma',role:'Software Engineer, Bangalore',av:'PS',plan:'Pro',stars:5,text:'The milestone tracker is life-changing. My SIP is now goal-based, not random. I know exactly when I will hit ₹50 lakh.'},
  {name:'Rahul Gupta',role:'CA, Mumbai',av:'RG',plan:'Elite',stars:5,text:'As a CA I was skeptical. But the retirement calculator is more accurate than my manual Excel. Inflation logic is impeccable.'},
  {name:'Anita Verma',role:'Teacher, Delhi',av:'AV',plan:'Basic',stars:5,text:"I'm not a finance person but the goal planner made it crystal clear. I now have a 2.4L/year SIP for my daughter's college."},
]

const S = {fontFamily:'var(--font-b)',background:'var(--bg)',color:'var(--t1)',minHeight:'100vh',position:'relative' as const}

export default function HomePage() {
  const tk = [...TICKER,...TICKER]
  return (
    <div style={S}>
      <PublicNav/>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{position:'relative',paddingTop:150,paddingBottom:80,overflow:'hidden',textAlign:'center'}}>
        <div className="hglow"/>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 120% 60% at 50% 100%, rgba(7,7,15,0.9) 0%, transparent 55%)',pointerEvents:'none'}}/>
        <div className="w" style={{position:'relative'}}>
          {/* Live badge */}
          <div className="fu d0" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 18px',borderRadius:99,marginBottom:32,background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.2)',backdropFilter:'blur(10px)'}}>
            <span className="dot"/>
            <span style={{fontSize:12,fontWeight:600,color:'var(--gold)',letterSpacing:'0.07em'}}>LIVE · SEBI-COMPLIANT AI PLATFORM FOR INDIA</span>
          </div>
          {/* Headline — Playfair Display */}
          <h1 className="fu d1 pf" style={{fontSize:'clamp(2.8rem,7vw,5.5rem)',fontWeight:800,lineHeight:1.04,letterSpacing:'-0.02em',marginBottom:24}}>
            India&apos;s Most Intelligent<br/><em className="gg" style={{fontStyle:'italic'}}>Investment Platform</em>
          </h1>
          <p className="fu d2" style={{fontSize:'clamp(1rem,2vw,1.2rem)',color:'var(--t2)',lineHeight:1.75,maxWidth:560,margin:'0 auto 44px'}}>
            7 AI engines for risk profiling, goal planning, retirement, stock analysis, portfolio optimization and global event intelligence — built for 236M Indian investors.
          </p>
          {/* CTAs */}
          <div className="fu d3" style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:64}}>
            <Link href="/auth/signup" style={{padding:'15px 36px',borderRadius:13,fontSize:16,fontWeight:700,background:'var(--gold)',color:'var(--bg)',textDecoration:'none',boxShadow:'0 4px 24px rgba(201,168,76,0.3),inset 0 1px 0 rgba(255,255,255,0.2)',letterSpacing:'-0.01em'}}>Start free — no credit card</Link>
            <Link href="/pricing" style={{padding:'15px 32px',borderRadius:13,fontSize:16,fontWeight:600,background:'transparent',color:'var(--gold)',textDecoration:'none',border:'1px solid rgba(201,168,76,0.3)'}}>View pricing</Link>
          </div>
          {/* Stats */}
          <div className="fu d4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,maxWidth:520,margin:'0 auto',background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.18)',borderRadius:16,overflow:'hidden'}}>
            {STATS.map((s,i)=>(
              <div key={s.l} style={{background:'var(--bg3)',padding:'20px 10px',textAlign:'center',borderRight:i<3?'1px solid rgba(201,168,76,0.1)':'none'}}>
                <div style={{fontFamily:'var(--font-m)',fontSize:'clamp(1.4rem,3vw,1.9rem)',fontWeight:500,color:'var(--gold)',letterSpacing:'-0.03em',marginBottom:4}}>{s.v}</div>
                <div style={{fontSize:11,color:'var(--t3)',fontWeight:500,letterSpacing:'0.04em'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ──────────────────────────────────────── */}
      <div style={{background:'var(--bg3)',borderTop:'1px solid rgba(201,168,76,0.08)',borderBottom:'1px solid rgba(201,168,76,0.08)',padding:'10px 0',overflow:'hidden',position:'relative',zIndex:1}}>
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:80,background:'linear-gradient(90deg,var(--bg3),transparent)',zIndex:2,pointerEvents:'none'}}/>
        <div style={{position:'absolute',right:0,top:0,bottom:0,width:80,background:'linear-gradient(-90deg,var(--bg3),transparent)',zIndex:2,pointerEvents:'none'}}/>
        <div className="tk">
          {tk.map((t,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'0 28px',borderRight:'1px solid rgba(255,255,255,0.04)',whiteSpace:'nowrap',flexShrink:0}}>
              <span style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.05em'}}>{t.s}</span>
              <span style={{fontFamily:'var(--font-m)',fontSize:13,fontWeight:500,color:'var(--t1)'}}>{t.v}</span>
              <span style={{fontSize:12,fontWeight:600,color:t.u?'var(--green)':'var(--red)'}}>{t.c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ENGINES ──────────────────────────────────────────── */}
      <section id="features" style={{padding:'96px 0',position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{marginBottom:56}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>7 AI Engines</div>
            <h2 className="pf fu" style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.12,marginBottom:14}}>
              Every tool to invest<br/><em style={{fontStyle:'italic',color:'var(--gold)'}}>intelligently</em>
            </h2>
            <p style={{fontSize:16,color:'var(--t2)',maxWidth:500,lineHeight:1.7}}>From risk profiling to retirement planning — one platform, seven AI engines, zero guesswork.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:14}}>
            {ENGINES.map((e,i)=>(
              <div key={e.title} className={`lift fu d${Math.min(i,7)}`} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:20,padding:'28px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,right:0,width:140,height:140,background:`radial-gradient(circle at top right,${e.bg},transparent 70%)`,pointerEvents:'none'}}/>
                <div style={{position:'relative'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
                    <div style={{width:50,height:50,borderRadius:15,fontSize:22,background:e.bg,border:`1px solid ${e.color}22`,display:'flex',alignItems:'center',justifyContent:'center'}}>{e.icon}</div>
                    <span style={{fontSize:11,fontWeight:600,padding:'4px 12px',borderRadius:99,background:e.badge==='Free'?'rgba(14,217,122,0.1)':e.badge==='Basic+'?'rgba(91,159,255,0.1)':'rgba(201,168,76,0.1)',color:e.badge==='Free'?'var(--green)':e.badge==='Basic+'?'var(--blue)':'var(--gold)',border:`1px solid ${e.badge==='Free'?'rgba(14,217,122,0.2)':e.badge==='Basic+'?'rgba(91,159,255,0.2)':'rgba(201,168,76,0.2)'}`}}>{e.badge}</span>
                  </div>
                  <h3 className="pf" style={{fontSize:19,fontWeight:700,marginBottom:10,color:'var(--t1)',letterSpacing:'-0.01em'}}>{e.title}</h3>
                  <p style={{fontSize:14,color:'var(--t2)',lineHeight:1.65}}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{padding:'96px 0',background:'var(--bg2)',borderTop:'1px solid rgba(255,255,255,0.03)',position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{textAlign:'center',marginBottom:64}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>How it works</div>
            <h2 className="pf" style={{fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.12}}>Up and running in<br/><em className="gg" style={{fontStyle:'italic'}}>under 5 minutes</em></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:0}}>
            {HOW.map((s,i)=>(
              <div key={s.n} className={`fu d${i}`} style={{padding:'40px 32px',borderRight:i<HOW.length-1?'1px solid rgba(255,255,255,0.04)':'none'}}>
                <div style={{fontFamily:'var(--font-m)',fontSize:12,color:'var(--gold)',letterSpacing:'0.06em',marginBottom:20,opacity:0.6}}>{s.n}</div>
                <div style={{width:48,height:48,borderRadius:13,marginBottom:20,background:'linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.04))',border:'1px solid rgba(201,168,76,0.18)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{s.icon}</div>
                <h3 className="pf" style={{fontSize:18,fontWeight:700,marginBottom:10,color:'var(--t1)',letterSpacing:'-0.01em'}}>{s.t}</h3>
                <p style={{fontSize:14,color:'var(--t2)',lineHeight:1.65}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section style={{padding:'96px 0',position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{textAlign:'center',marginBottom:60}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Reviews</div>
            <h2 className="pf" style={{fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.12,marginBottom:14}}>Trusted by Indian investors</h2>
            <div style={{display:'flex',justifyContent:'center',gap:4,alignItems:'center'}}>
              {'★★★★★'.split('').map((s,i)=><span key={i} style={{fontSize:22,color:'var(--gold)'}}>{s}</span>)}
              <span style={{fontSize:14,color:'var(--t2)',marginLeft:10}}>4.9 / 5 · 3,200+ users</span>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16}}>
            {REVIEWS.map((r,i)=>(
              <div key={r.name} className={`lift fu d${i}`} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:20,padding:'32px',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',gap:3,marginBottom:20}}>{'★★★★★'.split('').map((s,j)=><span key={j} style={{fontSize:15,color:j<r.stars?'var(--gold)':'var(--t4)'}}>{s}</span>)}</div>
                <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.75,flex:1,marginBottom:24,fontStyle:'italic'}}>&ldquo;{r.text}&rdquo;</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.06))',border:'1px solid rgba(201,168,76,0.22)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-d)',fontSize:13,fontWeight:700,color:'var(--gold)'}}>{r.av}</div>
                    <div><div style={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>{r.name}</div><div style={{fontSize:12,color:'var(--t3)'}}>{r.role}</div></div>
                  </div>
                  <span style={{fontSize:11,padding:'3px 10px',borderRadius:99,fontWeight:600,background:'rgba(201,168,76,0.1)',color:'var(--gold)',border:'1px solid rgba(201,168,76,0.18)'}}>{r.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{padding:'96px 0',background:'var(--bg2)',borderTop:'1px solid rgba(255,255,255,0.03)',position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{maxWidth:720,margin:'0 auto',textAlign:'center'}}>
            <div style={{position:'relative',padding:'72px 48px',borderRadius:28,overflow:'hidden',background:'linear-gradient(160deg,#14121A,#0E0C18)',border:'1px solid rgba(201,168,76,0.2)',boxShadow:'0 0 80px rgba(201,168,76,0.07)'}}>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.09),transparent 65%)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(201,168,76,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.025) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none'}}/>
              <div style={{position:'relative'}}>
                <div style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:20}}>Get started today</div>
                <h2 className="pf" style={{fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.12,marginBottom:16}}>Ready to invest<br/><em className="gg" style={{fontStyle:'italic'}}>smarter?</em></h2>
                <p style={{fontSize:16,color:'var(--t2)',marginBottom:36,lineHeight:1.7,maxWidth:420,margin:'0 auto 36px'}}>Join thousands of Indian investors using AI for better financial decisions.</p>
                <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                  <Link href="/auth/signup" style={{padding:'15px 36px',borderRadius:13,fontSize:15,fontWeight:700,background:'var(--gold)',color:'var(--bg)',textDecoration:'none',boxShadow:'0 4px 24px rgba(201,168,76,0.3)'}}>Create free account →</Link>
                  <Link href="/pricing" style={{padding:'15px 28px',borderRadius:13,fontSize:15,fontWeight:600,background:'transparent',color:'var(--t2)',textDecoration:'none',border:'1px solid rgba(255,255,255,0.08)'}}>See pricing</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter/>
    </div>
  )
}