import Link from 'next/link'
const COLS = [
  {t:'Product',ls:[['Pricing','/pricing'],['About','/about'],['Reviews','/testimonials'],['Contact','/contact']]},
  {t:'Engines',ls:[['Risk Profiler','/engines/risk-profile'],['Goal Planner','/engines/goal-planner'],['Retirement','/engines/retirement'],['Stock Analysis','/engines/stock-analysis']]},
  {t:'Legal',  ls:[['Privacy Policy','/legal/privacy'],['Terms of Service','/legal/terms'],['Refund Policy','/legal/refund'],['Help Center','/legal/support']]},
]
export default function PublicFooter() {
  return (
    <footer style={{borderTop:'1px solid rgba(201,168,76,0.08)',padding:'56px 0 28px',position:'relative',zIndex:1}}>
      <div className="w">
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr',gap:40,marginBottom:48}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <div style={{width:34,height:34,borderRadius:9,background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.22)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-d)',fontSize:16,fontWeight:800,color:'var(--gold)'}}>F</div>
              <span className="pf" style={{fontWeight:700,fontSize:16,color:'var(--t1)'}}>Finvest<span style={{color:'var(--gold)'}}>Pro</span></span>
            </div>
            <p style={{fontSize:13,color:'var(--t3)',lineHeight:1.75,maxWidth:210}}>AI-powered investment intelligence for Indian investors.</p>
            <p style={{fontSize:11,color:'var(--t4)',marginTop:14,lineHeight:1.7}}>Investments subject to market risks.<br/>Read all scheme documents carefully.</p>
          </div>
          {COLS.map(c=>(
            <div key={c.t}>
              <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:18}}>{c.t}</p>
              {c.ls.map(([l,h])=><Link key={l} href={h} style={{display:'block',fontSize:14,color:'var(--t3)',textDecoration:'none',marginBottom:11}}>{l}</Link>)}
            </div>
          ))}
        </div>
        <div style={{paddingTop:24,borderTop:'1px solid rgba(255,255,255,0.04)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <p style={{fontSize:12,color:'var(--t4)'}}>&#169; {new Date().getFullYear()} FinVest Pro. All rights reserved.</p>
          <p style={{fontSize:12,color:'var(--t4)'}}>Not SEBI-registered. Educational platform only.</p>
        </div>
      </div>
    </footer>
  )
}