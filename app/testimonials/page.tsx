import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import PublicFooter from '@/components/layout/PublicFooter'
export const metadata: Metadata = { title:'Reviews — FinVest Pro', description:'What Indian investors say about FinVest Pro.' }

const REVIEWS = [
  {name:'Priya Sharma',role:'Software Engineer, Bangalore',av:'PS',plan:'Pro',stars:5,text:'The milestone tracker is life-changing. My SIP is now goal-based, not random guessing. I know exactly when I will hit ₹50 lakh — month and year.'},
  {name:'Rahul Gupta',role:'Chartered Accountant, Mumbai',av:'RG',plan:'Elite',stars:5,text:'As a CA I was skeptical. The retirement calculator is more accurate than my manual Excel model. The inflation-adjusted corpus logic is mathematically impeccable.'},
  {name:'Anita Verma',role:'School Teacher, Delhi',av:'AV',plan:'Basic',stars:5,text:'I am not a finance person but the goal planner made it crystal clear. I now have a ₹2.4 lakh/year SIP plan for my daughter\'s college fund.'},
  {name:'Vikram Singh',role:'Entrepreneur, Pune',av:'VS',plan:'Pro',stars:5,text:'The global event engine flagged RBI rate hike impact on my debt funds 2 days before the policy announcement. I rebalanced in time. Incredible.'},
  {name:'Meera Iyer',role:'Doctor, Chennai',av:'MI',plan:'Pro',stars:5,text:'I never understood portfolio allocation until FinVest Pro. The risk profiler nailed my profile exactly — Moderate-Aggressive — and gave me a precise allocation.'},
  {name:'Arjun Nair',role:'IT Manager, Hyderabad',av:'AN',plan:'Elite',stars:4,text:'Stock analysis saves me hours of research weekly. The fundamental plus technical AI combo is genuinely unique in the Indian fintech space.'},
  {name:'Sunita Reddy',role:'Homemaker, Hyderabad',av:'SR',plan:'Basic',stars:5,text:'My husband set this up for me and now I track our family SIPs myself. The dashboard is so clean and the milestone alerts keep me motivated.'},
  {name:'Rohan Mehta',role:'Startup Founder, Bangalore',av:'RM',plan:'Elite',stars:5,text:'Portfolio optimizer recommended a rebalance I had been delaying for months. After following it, my Sharpe ratio improved noticeably in one quarter.'},
  {name:'Kavya Nambiar',role:'Research Analyst, Mumbai',av:'KN',plan:'Pro',stars:5,text:'As someone who analyzes companies professionally, I was impressed by the depth of FinVest Pro\'s stock analysis. It surfaces metrics I would take 30 minutes to find.'},
]

const STATS = [
  {v:'4.9★',l:'Average Rating'},
  {v:'3,200+',l:'Active Users'},
  {v:'₹48Cr+',l:'SIP Goals Set'},
  {v:'97%',l:'Would Recommend'},
]

export default function TestimonialsPage() {
  return (
    <div style={{background:'var(--bg)',color:'var(--t1)',fontFamily:'var(--font-b)',minHeight:'100vh'}}>
      <PublicNav/>

      {/* Hero */}
      <section style={{paddingTop:140,paddingBottom:80,position:'relative',overflow:'hidden',textAlign:'center'}}>
        <div className="hglow"/>
        <div className="w" style={{position:'relative'}}>
          <div className="fu d0" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'7px 18px',borderRadius:99,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',fontSize:12,fontWeight:600,color:'var(--gold)',letterSpacing:'0.07em',marginBottom:28}}>
            <span className="dot"/>INVESTOR REVIEWS
          </div>
          <h1 className="fu d1 pf" style={{fontSize:'clamp(2.2rem,5vw,3.8rem)',fontWeight:800,letterSpacing:'-0.025em',lineHeight:1.08,marginBottom:16}}>
            Trusted by Indian investors<br/><em className="gg" style={{fontStyle:'italic'}}>across every city</em>
          </h1>
          <p className="fu d2" style={{fontSize:17,color:'var(--t2)',lineHeight:1.7,maxWidth:520,margin:'0 auto 48px'}}>
            Real results from real users — engineers, doctors, teachers, CAs, and entrepreneurs.
          </p>
          {/* Stars */}
          <div className="fu d3" style={{display:'flex',justifyContent:'center',gap:4,alignItems:'center',marginBottom:56}}>
            {'★★★★★'.split('').map((s,i)=><span key={i} style={{fontSize:28,color:'var(--gold)'}}>{s}</span>)}
            <span style={{fontSize:16,color:'var(--t2)',marginLeft:12}}>4.9 / 5</span>
          </div>
          {/* Stats */}
          <div className="fu d4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,maxWidth:560,margin:'0 auto',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:16,overflow:'hidden'}}>
            {STATS.map((s,i)=>(
              <div key={s.l} style={{background:'var(--bg3)',padding:'18px 12px',textAlign:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.04)':'none'}}>
                <div style={{fontFamily:'var(--font-m)',fontSize:'1.4rem',fontWeight:500,color:'var(--gold)',letterSpacing:'-0.02em',marginBottom:4}}>{s.v}</div>
                <div style={{fontSize:11,color:'var(--t3)',fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section style={{paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16}}>
            {REVIEWS.map((r,i)=>(
              <div key={r.name} className={`lift fu d${Math.min(i,7)}`} style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:22,padding:'28px 28px 24px',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,right:0,width:80,height:80,background:'radial-gradient(circle at top right,rgba(201,168,76,0.05),transparent 70%)',pointerEvents:'none'}}/>
                <div style={{display:'flex',gap:3,marginBottom:20}}>
                  {'★★★★★'.split('').map((s,j)=><span key={j} style={{fontSize:15,color:j<r.stars?'var(--gold)':'var(--t4)'}}>{s}</span>)}
                </div>
                <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.75,flex:1,marginBottom:24,fontStyle:'italic'}}>&ldquo;{r.text}&rdquo;</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.06))',border:'1px solid rgba(201,168,76,0.22)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-d)',fontSize:13,fontWeight:700,color:'var(--gold)',flexShrink:0}}>{r.av}</div>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>{r.name}</div>
                      <div style={{fontSize:12,color:'var(--t3)',marginTop:1}}>{r.role}</div>
                    </div>
                  </div>
                  <span style={{fontSize:11,padding:'3px 10px',borderRadius:99,fontWeight:600,background:'rgba(201,168,76,0.1)',color:'var(--gold)',border:'1px solid rgba(201,168,76,0.2)',flexShrink:0}}>{r.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{paddingBottom:96,position:'relative',zIndex:1}}>
        <div className="w">
          <div style={{maxWidth:680,margin:'0 auto',textAlign:'center',padding:'64px 48px',borderRadius:28,background:'linear-gradient(160deg,var(--bg4),var(--bg3))',border:'1px solid rgba(201,168,76,0.18)',boxShadow:'0 0 60px rgba(201,168,76,0.05)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.08),transparent 65%)',pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <h2 className="pf" style={{fontSize:'clamp(1.8rem,4vw,2.6rem)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:14}}>Join <em className="gg" style={{fontStyle:'italic'}}>3,200+ investors</em></h2>
              <p style={{fontSize:16,color:'var(--t2)',lineHeight:1.7,marginBottom:32,maxWidth:440,margin:'0 auto 32px'}}>Start free. Take the risk profiler in 3 minutes and see your personalized allocation instantly.</p>
              <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                <a href="/auth/signup" style={{padding:'13px 30px',borderRadius:12,fontSize:15,fontWeight:700,background:'var(--gold)',color:'var(--bg)',textDecoration:'none',boxShadow:'0 4px 20px rgba(201,168,76,0.28)'}}>Create free account →</a>
                <a href="/pricing" style={{padding:'13px 24px',borderRadius:12,fontSize:15,fontWeight:600,background:'transparent',color:'var(--t2)',textDecoration:'none',border:'1px solid rgba(255,255,255,0.08)'}}>See pricing</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter/>
    </div>
  )
}
