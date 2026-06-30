import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title:'Profile — FinVest Pro' }
const INP: React.CSSProperties = {width:'100%',padding:'11px 14px',fontSize:14,color:'var(--t1)',background:'var(--bg4)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:11,outline:'none',fontFamily:'inherit'}

export default function ProfilePage() {
  return (
    <div style={{maxWidth:660}}>
      <div style={{marginBottom:32}}>
        <p style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:8}}>Account</p>
        <h1 className="pf" style={{fontSize:'clamp(1.8rem,3vw,2.2rem)',fontWeight:800,letterSpacing:'-0.02em'}}>Your Profile</h1>
      </div>

      {/* Avatar + plan */}
      <div style={{display:'flex',alignItems:'center',gap:20,padding:'24px',borderRadius:20,marginBottom:16,background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)'}}>
        <div style={{width:68,height:68,borderRadius:20,background:'linear-gradient(135deg,rgba(201,168,76,0.22),rgba(201,168,76,0.06))',border:'1px solid rgba(201,168,76,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-d)',fontSize:26,fontWeight:700,color:'var(--gold)',flexShrink:0}}>U</div>
        <div style={{flex:1}}>
          <p style={{fontSize:18,fontWeight:700,color:'var(--t1)',marginBottom:3}}>Your Name</p>
          <p style={{fontSize:13,color:'var(--t3)',marginBottom:10}}>user@example.com</p>
          <span style={{fontSize:11,padding:'3px 12px',borderRadius:99,fontWeight:600,background:'rgba(113,113,128,0.15)',color:'#8080A0',border:'1px solid rgba(113,113,128,0.2)'}}>Free Plan</span>
        </div>
        <Link href="/pricing" style={{padding:'9px 18px',borderRadius:10,background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'var(--gold)',textDecoration:'none',fontSize:13,fontWeight:600,flexShrink:0}}>Upgrade</Link>
      </div>

      {/* Plan status */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderRadius:16,marginBottom:20,background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.12)'}}>
        <div>
          <p style={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>Free Plan — Active</p>
          <p style={{fontSize:12,color:'var(--t3)',marginTop:2}}>Includes Risk Profiler and Market News</p>
        </div>
        <span className="dot"/>
      </div>

      {/* Form */}
      <div style={{background:'var(--bg3)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:22,padding:'28px'}}>
        <h2 className="pf" style={{fontSize:19,fontWeight:700,marginBottom:22,color:'var(--t1)'}}>Personal Information</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
          {[{l:'Full Name',p:'Rahul Sharma'},{l:'Phone Number',p:'+91 98765 43210'},{l:'City',p:'Mumbai'},{l:'Occupation',p:'Software Engineer'}].map(f=>(
            <div key={f.l} style={{display:'flex',flexDirection:'column',gap:7}}>
              <label style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>{f.l}</label>
              <input style={INP} placeholder={f.p}/>
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:7,marginBottom:22}}>
          <label style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Annual Income Range</label>
          <select style={{...INP,cursor:'pointer'}}>
            <option>Below ₹3 lakh</option>
            <option>₹3–7 lakh</option>
            <option>₹7–15 lakh</option>
            <option>₹15–30 lakh</option>
            <option>Above ₹30 lakh</option>
          </select>
        </div>
        <button style={{padding:'12px 24px',borderRadius:11,background:'var(--gold)',color:'var(--bg)',fontSize:14,fontWeight:700,border:'none',cursor:'pointer',fontFamily:'inherit',boxShadow:'0 2px 14px rgba(201,168,76,0.25)'}}>Save Changes</button>
      </div>

      {/* Danger zone */}
      <div style={{background:'var(--bg3)',border:'1px solid rgba(255,78,106,0.15)',borderRadius:22,padding:'24px',marginTop:16}}>
        <h3 className="pf" style={{fontSize:16,fontWeight:700,marginBottom:8,color:'var(--red)'}}>Danger Zone</h3>
        <p style={{fontSize:13,color:'var(--t3)',marginBottom:16}}>Permanently delete your account and all associated data.</p>
        <button style={{padding:'9px 20px',borderRadius:10,background:'rgba(255,78,106,0.1)',color:'var(--red)',fontSize:13,fontWeight:600,border:'1px solid rgba(255,78,106,0.2)',cursor:'pointer',fontFamily:'inherit'}}>Delete Account</button>
      </div>
    </div>
  )
}