import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Privacy Policy — FinVest Pro" }

const lastUpdated = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

const SECTIONS = [
  { title: "Information We Collect",    body: "We collect information you provide: name, email, financial goals, risk profile answers, and investment data. We also collect usage analytics to improve our platform." },
  { title: "How We Use Your Information", body: "Your data is used to provide personalized investment analysis, generate risk profiles, calculate SIP recommendations, and improve our AI engines. We never sell your data." },
  { title: "Data Security",             body: "All data is encrypted in transit (TLS) and at rest. We use Firebase Authentication and Firestore with row-level security rules. Payments are processed by Cashfree — we never store card details." },
  { title: "Third-Party Services",      body: "We use Firebase (Google) for authentication and database, Cashfree for payments, and market data APIs for financial information. Each has their own privacy policy." },
  { title: "Your Rights",               body: "You may request deletion of your account and all associated data at any time by contacting support@finvestpro.in.", link: { text: "support@finvestpro.in", href: "mailto:support@finvestpro.in" } },
  { title: "Contact",                   body: "Privacy concerns: privacy@finvestpro.in", link: { text: "privacy@finvestpro.in", href: "mailto:privacy@finvestpro.in" } },
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
          <div style={{ width: "48px", height: "48px", borderRadius: "var(--r-lg)", background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.20)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "20px" }}>🔒</div>
          <h1 className="display-md" style={{ color: "var(--text-primary)", marginBottom: "8px" }}>Privacy Policy</h1>
          <p className="body-md" style={{ marginBottom: "12px" }}>Your data is yours. Here is exactly how we handle it.</p>
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
          <p className="body-sm" style={{ color: "var(--text-secondary)" }}>We are committed to protecting your privacy and will notify you within 72 hours of any data breach that may affect your personal information.</p>
        </div>
      </div>
    </div>
  )
}



You are out of free messages until 12:20 AM
