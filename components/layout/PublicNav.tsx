import Link from 'next/link'
const LINKS = [['Features','#features'],['Pricing','/pricing'],['Reviews','/testimonials'],['About','/about']]
export default function PublicNav() {
  return (
    <header style={{position:'fixed',top:0,left:0,right:0,zIndex:50,background:'rgba(7,7,15,0.88)',backdropFilter:'blur(20px) saturate(1.6)',borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
      <div className="w" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:62}}>
        <Link href="/home" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <div style={{width:36,height:36,borderRadius:10,background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-d)',fontSize:18,fontWeight:800,color:'var(--gold)'}}>F</div>
          <span className="pf" style={{fontWeight:700,fontSize:18,color:'var(--t1)'}}>Finvest<span style={{color:'var(--gold)'}}>Pro</span></span>
        </Link>
        <nav style={{display:'flex',alignItems:'center',gap:2}}>
          {LINKS.map(([l,h])=><Link key={l} href={h} style={{padding:'7px 14px',borderRadius:8,fontSize:14,fontWeight:500,color:'var(--t2)',textDecoration:'none'}}>{l}</Link>)}
        </nav>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <Link href="/auth/login" style={{padding:'8px 16px',borderRadius:9,fontSize:14,color:'var(--t2)',textDecoration:'none'}}>Sign in</Link>
          <Link href="/auth/signup" style={{padding:'9px 20px',borderRadius:10,fontSize:14,fontWeight:700,background:'var(--gold)',color:'var(--bg)',textDecoration:'none',boxShadow:'0 2px 14px rgba(201,168,76,0.3)'}}>Get started free</Link>
        </div>
      </div>
    </header>
  )
}