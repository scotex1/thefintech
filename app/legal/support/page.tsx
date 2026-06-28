import type { Metadata } from "next"


export const metadata: Metadata = { title: "Help Center — FinVest Pro" }

export default function Page() {
  return (
    <LegalLayout
      title="Help Center"
      subtitle="Everything you need to get the most out of FinVest Pro."
      icon="🛟"
      sections={[
        {
          title: "Getting Started",
          content: (
            <p>
              After creating your account, take the <strong style={{ color: "var(--text-primary)" }}>Risk Profiler quiz</strong> first —
              it determines your investment profile and unlocks personalized recommendations
              across all engines.
            </p>
          ),
        },
        {
          title: "Engines Guide",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { name: "Risk Profiler",        plan: "Free",   desc: "10-question quiz, instant results." },
                { name: "Market News",           plan: "Free",   desc: "AI-curated news, updated every 5 minutes." },
                { name: "Goal Planner",          plan: "Basic+", desc: "Enter target amount and months, get monthly SIP." },
                { name: "Retirement Planner",    plan: "Basic+", desc: "Enter age and expenses, get corpus calculation." },
                { name: "Stock Analysis",        plan: "Pro+",   desc: "Enter NSE/BSE symbol for full AI analysis." },
                { name: "Portfolio Optimizer",   plan: "Pro+",   desc: "Enter holdings to get MPT-based recommendations." },
                { name: "Global Events",         plan: "Pro+",   desc: "Macro events mapped to your portfolio impact." },
              ].map(engine => (
                <div
                  key={engine.name}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "12px",
                    padding: "12px 14px",
                    background: "var(--bg-overlay)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--r-md)",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                      {engine.name}
                    </span>
                    <span
                      style={{
                        marginLeft: "8px", fontSize: "0.6875rem", fontWeight: 600,
                        padding: "2px 7px", borderRadius: "var(--r-full)",
                        background: engine.plan === "Free" ? "var(--gain-dim)" : engine.plan === "Basic+" ? "var(--neutral-dim)" : "var(--gold-dim)",
                        color: engine.plan === "Free" ? "var(--gain-bright)" : engine.plan === "Basic+" ? "var(--neutral)" : "var(--gold-bright)",
                        border: `1px solid ${engine.plan === "Free" ? "var(--border-gain)" : engine.plan === "Basic+" ? "rgba(96,165,250,0.20)" : "var(--border-gold)"}`,
                      }}
                    >
                      {engine.plan}
                    </span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                      {engine.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: "Payment Issues",
          content: (
            <p>
              If your payment was deducted but plan was not activated, email{" "}
              <a href="mailto:support@finvestpro.in" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
                support@finvestpro.in
              </a>{" "}
              with your Order ID within 24 hours.
            </p>
          ),
        },
        {
          title: "Contact Support",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <p>
                Email:{" "}
                <a href="mailto:support@finvestpro.in" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
                  support@finvestpro.in
                </a>
              </p>
              <p>Response time: within 24 hours on business days.</p>
            </div>
          ),
        },
      ]}
    />
  )
}
