
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Terms of Service — FinVest Pro" }

const lastUpdated = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

const SECTIONS = [
  { title: "Acceptance of Terms",         body: "By using FinVest Pro, you agree to these terms. Our platform provides financial analysis tools for informational purposes. We are not a SEBI-registered investment advisor unless explicitly stated." },
  { title: "Not Financial Advice",        body: "All analysis, recommendations, and projections on FinVest Pro are for educational and informational purposes only. They do not constitute financial advice. Always consult a qualified financial advisor before investing." },
  { title: "Investment Risk Disclaimer",  body: "Investments in securities are subject to market risks. Past performance does not guarantee future returns. The value of investments may go up or down. FinVest Pro is not liable for investment losses." },
  { title: "Account Responsibilities",    body: "You are responsible for maintaining the security of your account credentials. Do not share your password with anyone." },
  { title: "Subscription and Payments",   body: "Subscriptions are billed in advance. Cancellations take effect at the end of the billing period. Refunds are subject to our Refund Policy." },
  { title: "Contact",                     body: "Legal queries: legal@finvestpro.in", link: { text: "legal@finvestpro.in", href: "mailto:legal@finvestpro.in" } },
]

export default function Page() {
  return (
    <div className="page-root">
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: "64px", borderBottom: "1px solid var(--border-default)", background: "rgba(7,8,10,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/home" style={{ display: "flex", alignItems: "center", gap: "9px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "var(--text-primary)", textDecoration: "none" }}>
          <span style={{ width: 30, height: 30, borderRadius: "var(--r-sm)", background: "var(--gold-dim)", border: "1px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>📈</span>
          Fin<span style={{ color: "var(--gold)" }}>Vest Pro</span>
        </Link>
        <Link href="/auth/login" style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--gold)", textDecoration: "none", padding: "6px 14px", border: "1px solid var(--border-gold)", borderRadius: "var(--r-md)" }}>Sign In</Link>
      </nav>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 32px 100px" }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "var(--r-lg)", background: "rgba(201,168,76,0.10)", border: "1px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "20px" }}>📋</div>
          <h1 className="display-md" style={{ color: "var(--text-primary)", marginBottom: "8px" }}>Terms of Service</h1>
          <p className="body-md" style={{ marginBottom: "12px" }}>Please read these terms carefully before using FinVest Pro.</p>
          <span className="badge badge-gray">Last updated: {lastUpdated}</span>
        </div>
        <div className="divider" style={{ marginBottom: "48px" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SECTIONS.map((s, i) => (
            <div key={i} className="fade-up" style={{ padding: "28px 0", borderBottom: i < SECTIONS.length - 1 ? "1px solid var(--border-subtle)" : "none", display: "flex", gap: "20px", alignItems: "flex-start", animationDelay: `${i * 50}ms` }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "var(--r-sm)", background: "var(--bg-subtle)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-tertiary)", flexShrink: 0, marginTop: "2px" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="heading-md" style={{ color: "var(--text-primary)", marginBottom: "10px" }}>{s.title}</h2>
                <p className="body-md" style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
                  {s.link
                    ? s.body.split(s.link.text).map((part, pi, arr) => (
                        <span key={pi}>{part}{pi < arr.length - 1 && <a href={s.link!.href} style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>{s.link!.text}</a>}</span>
                      ))
                    : s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="surface-xs" style={{ marginTop: "48px", padding: "20px 24px" }}>
          <p className="body-sm" style={{ color: "var(--text-secondary)" }}>By continuing to use FinVest Pro, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
        </div>
      </div>
    </div>
  )
}
