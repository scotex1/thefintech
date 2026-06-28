import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Help Center — FinVest Pro" }
export default function Page() {
  return (
    <div className="min-h-screen bg-[#060A0F] text-[#F0F4F8]">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/home" className="flex items-center gap-2 font-bold">📈 Finvest<span className="text-[#C9A84C]">Pro</span></Link>
        <Link href="/auth/login" className="text-sm text-[#C9A84C]">Sign In</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-[#8A9BB0] text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        <div className="prose prose-invert max-w-none text-[#8A9BB0] leading-relaxed [&_h2]:text-[#F0F4F8] [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-[#F0F4F8]">
          
        <h2>Getting Started</h2>
        <p>After creating your account, take the <strong>Risk Profiler quiz</strong> first — it determines your investment profile and unlocks personalized recommendations across all engines.</p>
        <h2>Engines Guide</h2>
        <p><strong>Risk Profiler (Free):</strong> 10-question quiz, instant results.<br/>
        <strong>Market News (Free):</strong> AI-curated news, updated every 5 minutes.<br/>
        <strong>Goal Planner (Basic+):</strong> Enter target amount and months, get monthly SIP.<br/>
        <strong>Retirement Planner (Basic+):</strong> Enter age and expenses, get corpus calculation.<br/>
        <strong>Stock Analysis (Pro+):</strong> Enter NSE/BSE symbol for full AI analysis.<br/>
        <strong>Portfolio Optimizer (Pro+):</strong> Enter holdings to get MPT-based recommendations.<br/>
        <strong>Global Events (Pro+):</strong> Macro events mapped to your portfolio impact.</p>
        <h2>Payment Issues</h2>
        <p>If your payment was deducted but plan was not activated, email <strong>support@finvestpro.in</strong> with your Order ID within 24 hours.</p>
        <h2>Contact Support</h2>
        <p>Email: <strong>support@finvestpro.in</strong><br/>Response time: within 24 hours on business days.</p>

        </div>
      </div>
    </div>
  )
}
