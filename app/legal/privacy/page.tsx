import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Privacy Policy — FinVest Pro" }
export default function Page() {
  return (
    <div className="min-h-screen bg-[#060A0F] text-[#F0F4F8]">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/home" className="flex items-center gap-2 font-bold">📈 Finvest<span className="text-[#C9A84C]">Pro</span></Link>
        <Link href="/auth/login" className="text-sm text-[#C9A84C]">Sign In</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-[#8A9BB0] text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        <div className="prose prose-invert max-w-none text-[#8A9BB0] leading-relaxed [&_h2]:text-[#F0F4F8] [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-[#F0F4F8]">
          
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide: name, email, financial goals, risk profile answers, and investment data. We also collect usage analytics to improve our platform.</p>
        <h2>2. How We Use Your Information</h2>
        <p>Your data is used to provide personalized investment analysis, generate risk profiles, calculate SIP recommendations, and improve our AI engines. We never sell your data.</p>
        <h2>3. Data Security</h2>
        <p>All data is encrypted in transit (TLS) and at rest. We use Firebase Authentication and Firestore with row-level security rules. Payments are processed by Cashfree — we never store card details.</p>
        <h2>4. Third-Party Services</h2>
        <p>We use Firebase (Google) for authentication and database, Cashfree for payments, and market data APIs for financial information. Each has their own privacy policy.</p>
        <h2>5. Your Rights</h2>
        <p>You may request deletion of your account and all associated data at any time by contacting support@finvestpro.in.</p>
        <h2>6. Contact</h2>
        <p>Privacy concerns: <strong>privacy@finvestpro.in</strong></p>

        </div>
      </div>
    </div>
  )
}