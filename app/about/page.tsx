import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "About — FinVest Pro", description: "Learn about FinVest Pro, India's AI investment advisory platform." }
const TEAM = [
  { name:"AI Risk Engine", icon:"📊", desc:"Scores 10 behavioral + financial parameters to determine your exact risk tolerance." },
  { name:"SIP Milestone Engine", icon:"🎯", desc:"Compound interest formula with step-up SIP and milestone checkpoints." },
  { name:"Retirement Engine", icon:"🏖️", desc:"Inflation-adjusted corpus calculation with post-retirement withdrawal modelling." },
  { name:"Global Event Engine", icon:"🌐", desc:"Maps RBI policy, Budget, elections, and global macro events to portfolio impact." },
]
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060A0F] text-[#F0F4F8]">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/home" className="flex items-center gap-2 font-bold">📈 Finvest<span className="text-[#C9A84C]">Pro</span></Link>
        <div className="flex gap-4 text-sm">
          <Link href="/home" className="text-[#8A9BB0] hover:text-[#F0F4F8]">Home</Link>
          <Link href="/pricing" className="text-[#8A9BB0] hover:text-[#F0F4F8]">Pricing</Link>
          <Link href="/auth/login" className="text-[#C9A84C]">Sign In</Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About FinVest Pro</h1>
          <p className="text-[#8A9BB0] text-lg max-w-2xl mx-auto leading-relaxed">
            We built FinVest Pro because most Indian investors deserve better than generic advice. 
            AI should make professional financial planning accessible to everyone.
          </p>
        </div>
        <div className="bg-[#111820] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#C9A84C]">Our Mission</h2>
          <p className="text-[#8A9BB0] leading-relaxed text-lg">
            To democratize investment intelligence for 236 million Indian investors using AI — providing the same quality of analysis that was previously available only to HNI clients of large wealth management firms.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-8 text-center">The Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {TEAM.map(t => (
            <div key={t.name} className="bg-[#111820] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-semibold mb-2">{t.name}</h3>
              <p className="text-sm text-[#8A9BB0] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/auth/signup" className="inline-block px-8 py-3 bg-[#C9A84C] text-[#060A0F] font-bold rounded-xl hover:bg-[#E4C06A] transition-all">
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  )
}