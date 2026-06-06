import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Refund Policy — FinVest Pro" }
export default function Page() {
  return (
    <div className="min-h-screen bg-[#060A0F] text-[#F0F4F8]">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/home" className="flex items-center gap-2 font-bold">📈 Finvest<span className="text-[#C9A84C]">Pro</span></Link>
        <Link href="/auth/login" className="text-sm text-[#C9A84C]">Sign In</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
        <p className="text-[#8A9BB0] text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        <div className="prose prose-invert max-w-none text-[#8A9BB0] leading-relaxed [&_h2]:text-[#F0F4F8] [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-[#F0F4F8]">
          
        <h2>Refund Window</h2>
        <p>We offer a <strong>7-day refund</strong> on all subscription plans from the date of purchase, provided you have not used more than 3 engine sessions.</p>
        <h2>How to Request a Refund</h2>
        <p>Email <strong>support@finvestpro.in</strong> with your registered email and Order ID within 7 days of purchase. Refunds are processed within 5-7 business days to your original payment method.</p>
        <h2>Non-Refundable Cases</h2>
        <p>Refunds are not provided after 7 days, for annual plans after the first 7 days, or if the account has violated our Terms of Service.</p>
        <h2>Partial Refunds</h2>
        <p>We do not offer partial refunds for unused subscription days. You retain access to your plan until the end of the billing period.</p>
        <h2>Contact</h2>
        <p>Refund queries: <strong>support@finvestpro.in</strong></p>

        </div>
      </div>
    </div>
  )
}