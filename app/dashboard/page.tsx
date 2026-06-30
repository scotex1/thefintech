import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Dashboard — FinVest Pro' }

const ENGINES = [
  {id:'risk-profile',icon:'📊',name:'Risk Profiler',badge:'Free',color:'#C9A84C',bg:'rgba(201,168,76,0.07)',desc:'Map your risk tolerance with AI.'},
  {id:'goal-planner',icon:'🎯',name:'Goal Planner',badge:'Basic+',color:'#0ED97A',bg:'rgba(14,217,122,0.07)',desc:'Precise SIP plan for any financial goal.'},
  {id:'retirement',icon:'🏖️',name:'Retirement Planner',badge:'Basic+',color:'#9B7FFF',bg:'rgba(155,127,255,0.07)',desc:'Inflation-adjusted corpus calculator.'},
  {id:'stock-analysis',icon:'📈',name:'Stock Analysis AI',badge:'Pro+',color:'#C9A84C',bg:'rgba(201,168,76,0.07)',desc:'Deep AI analysis for NSE/BSE stocks.'},
  {id:'portfolio',icon:'💼',name:'Portfolio Optimizer',badge:'Pro+',color:'#5B9FFF',bg:'rgba(91,159,255,0.07)',desc:'MPT-based portfolio allocation.'},
  {id:'global-events',icon:'🌐',name:'Global Events',badge:'Pro+',color:'#00E5CC',bg:'rgba(0,229,204,0.07)',desc:'Macro events → portfolio impact.'},
  {id:'news',icon:'📰',name:'Market News',badge:'Free',color:'#9090A0',bg:'rgba(144,144,160,0.06)',desc:'AI-curated news from 50+ sources.'},
]
const STATS = [
  {l:'Portfolio Value',v:'₹—',sub:'Add stocks to track',c:'var(--gold)'},
  {l:'Active Goals',v:'0',sub:'Set your first goal',c:'var(--green)'},
  {l:'Risk Profile',v:'—',sub:'Take the quiz →',c:'var(--purple)'},
  {l:'Plan Status',v:'Free',sub:'Free forever',c:'var(--t2)'},
]
const NAV_ITEMS = [
  {h:'/dashboard',icon:'⊞',l:'Dashboard'},
  {h:'/dashboard/profile',icon:'◯',l:'Profile'},
  {h:'/dashboard/subscription',icon:'◈',l:'Subscription'},
]

export default function DashboardPage() {
  const isActive = (h:string) => h==='/dashboard'

  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh',position:'relative'}}>
      {/* Topbar */}
      <header style={{position:'sticky',top:0,zIndex:50,background:'rgba(7,7,15,0.92)',backdropFilter:'blur(20px) saturate(1.6)',borderBottom:'1px solid rgba(201,168,76,0.08)'}}>
        <div className="w" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:62}}>
          <Link href="/home" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
            <div style={{width:36,height:36,borderRadius:10,background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.22)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-d)',fontSize:18,fontWeight:800,color:'var(--gold)'}}>F</div>
            <span className="pf" style={{fontWeight:700,fontSize:18,color:'var(--t1)'}}>Finvest<span style={{color:'var(--gold)'}}>Pro</span></span>
          </Link>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <Link href="/pricing" style={{padding:'7px 14px',borderRadius:9,fontSize:13,fontWeight:600,background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'var(--gold)',textDecoration:'none'}}>✦ Upgrade</Link>
            <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.22)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'var(--gold)',cursor:'pointer',fontFamily:'var(--font-d)'}}>U</div>
          </div>
        </div>
      </header>

      <div style={{display:'flex'}}>
        {/* Sidebar */}
        <aside style={{width:220,flexShrink:0,height:'calc(100vh - 62px)',position:'sticky',top:62,overflowY:'auto',background:'var(--bg2)',borderRight:'1px solid rgba(201,168,76,0.06)',display:'flex',flexDirection:'column'}}>
          <div style={{padding:12,display:'flex',flexDirection:'column',gap:2}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',padding:'8px 12px 4px'}}>Menu</p>
            {NAV_ITEMS.map(i=>(
              <Link key={i.h} href={i.h} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:9,fontSize:13,fontWeight:500,textDecoration:'none',color:isActive(i.h)?'var(--gold)':'var(--t2)',background:isActive(i.h)?'rgba(201,168,76,0.1)':'transparent',border:isActive(i.h)?'1px solid rgba(201,168,76,0.15)':'1px solid transparent',transition:'all 0.15s'}}>
                <span style={{fontSize:14,fontFamily:'var(--font-m)'}}>{i.icon}</span>{i.l}
              </Link>
            ))}
          </div>
          <div style={{padding:12,display:'flex',flexDirection:'column',gap:2,borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',padding:'8px 12px 4px'}}>AI Engines</p>
            {ENGINES.map(e=>(
              <Link key={e.id} href={`/engines/${e.id}`} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:9,fontSize:13,fontWeight:500,textDecoration:'none',color:'var(--t2)',border:'1px solid transparent',transition:'all 0.15s'}}>
                <span style={{fontSize:14}}>{e.icon}</span>{e.name}
              </Link>
            ))}
          </div>
          <div style={{padding:12,marginTop:'auto',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <Link href="/pricing" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:10,background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.18)',color:'var(--gold)',textDecoration:'none',fontSize:13,fontWeight:600}}>
              <span>✦ Upgrade Plan</span><span>→</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main style={{flex:1,padding:'32px',maxWidth:'calc(100vw - 220px)',minHeight:'calc(100vh - 62px)'}}>
          {/* Header */}
          <div className="fu d0" style={{marginBottom:28}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:8}}>Dashboard</p>
            <h1 className="pf" style={{fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:800,letterSpacing:'-0.02em'}}>
              Good day, <em className="gg" style={{fontStyle:'italic'}}>Investor</em>
            </h1>
          </div>

          {/* Plan banner */}
          <div className="fu d1" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderRadius:16,marginBottom:28,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',gap:12}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <span className="dot"/>
              <div>
                <p style={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>You are on the Free Plan</p>
                <p style={{fontSize:12,color:'var(--t3)',marginTop:2}}>Upgrade to unlock all 7 AI engines</p>
              </div>
            </div>
            <Link href="/pricing" style={{padding:'8px 18px',borderRadius:9,background:'var(--gold)',color:'var(--bg)',fontSize:13,fontWeight:700,textDecoration:'none',flexShrink:0,boxShadow:'0 2px 12px rgba(201,168,76,0.25)'}}>Upgrade</Link>
          </div>

          {/* Stats */}
          <div className="fu d2" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12,marginBottom:32}}>
            {STATS.map(s=>(
              <div key={s.l} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:16,padding:'22px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-24,right:-24,width:72,height:72,background:`radial-gradient(circle,${s.c}18,transparent 70%)`,pointerEvents:'none'}}/>
                <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:10}}>{s.l}</p>
                <p style={{fontFamily:'var(--font-m)',fontSize:28,fontWeight:500,color:s.c,letterSpacing:'-0.03em',marginBottom:4}}>{s.v}</p>
                <p style={{fontSize:11,color:'var(--t4)'}}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Engine cards */}
          <div className="fu d3">
            <h2 className="pf" style={{fontSize:20,fontWeight:700,letterSpacing:'-0.01em',marginBottom:16}}>AI Engines</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
              {ENGINES.map((e,i)=>(
                <Link key={e.id} href={`/engines/${e.id}`} className="lift" style={{display:'block',background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:18,padding:'22px',textDecoration:'none',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,right:0,width:110,height:110,background:`radial-gradient(circle at top right,${e.bg},transparent 70%)`,pointerEvents:'none'}}/>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
                    <div style={{width:44,height:44,borderRadius:13,fontSize:20,background:e.bg,border:`1px solid ${e.color}20`,display:'flex',alignItems:'center',justifyContent:'center'}}>{e.icon}</div>
                    <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:99,background:e.badge==='Free'?'rgba(14,217,122,0.1)':e.badge==='Basic+'?'rgba(91,159,255,0.1)':'rgba(201,168,76,0.1)',color:e.badge==='Free'?'var(--green)':e.badge==='Basic+'?'var(--blue)':'var(--gold)',border:`1px solid ${e.badge==='Free'?'rgba(14,217,122,0.2)':e.badge==='Basic+'?'rgba(91,159,255,0.2)':'rgba(201,168,76,0.2)'}`}}>{e.badge}</span>
                  </div>
                  <h3 className="pf" style={{fontSize:16,fontWeight:700,marginBottom:6,color:'var(--t1)',letterSpacing:'-0.01em'}}>{e.name}</h3>
                  <p style={{fontSize:13,color:'var(--t2)',lineHeight:1.55}}>{e.desc}</p>
                  <p style={{fontSize:12,color:'var(--t3)',marginTop:12}}>Open →</p>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}