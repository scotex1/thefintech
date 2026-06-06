import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Terms of Service — FinVest Pro" }
export default function Page() {
  return (
    <div className="min-h-screen bg-[#060A0F] text-[#F0F4F8]">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/home" className="flex items-center gap-2 font-bold">📈 Finvest<span className="text-[#C9A84C]">Pro</span></Link>
        <Link href="/auth/login" className="text-sm text-[#C9A84C]">Sign In</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-[#8A9BB0] text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        <div className="prose prose-invert max-w-none text-[#8A9BB0] leading-relaxed [&_h2]:text-[#F0F4F8] [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-[#F0F4F8]">
          
        <h2>1. Acceptance of Terms</h2>
        <p>By using FinVest Pro, you agree to these terms. Our platform provides financial analysis tools for informational purposes. We are not a SEBI-registered investment advisor unless explicitly stated.</p>
        <h2>2. Not Financial Advice</h2>
        <p>All analysis, recommendations, and projections on FinVest Pro are for educational and informational purposes only. They do not constitute financial advice. Always consult a qualified financial advisor before investing.</p>
        <h2>3. Investment Risk Disclaimer</h2>
        <p>Investments in securities are subject to market risks. Past performance does not guarantee future returns. The value of investments may go up or down. FinVest Pro is not liable for investment losses.</p>
        <h2>4. Account Responsibilities</h2>
        <p>You are responsible for maintaining the security of your account credentials. Do not share your password with anyone.</p>
        <h2>5. Subscription and Payments</h2>
        <p>Subscriptions are billed in advance. Cancellations take effect at the end of the billing period. Refunds are subject to our Refund Policy.</p>
        <h2>6. Contact</h2>
        <p>Legal queries: <strong>legal@finvestpro.in</strong></p>

        </div>
      </div>
    </div>
  )
}