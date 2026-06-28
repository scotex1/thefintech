import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reviews — FinVest Pro",
  description: "See what Indian investors say about FinVest Pro.",
}

const REVIEWS = [
  { name: "Priya Sharma",  role: "Software Engineer, Bangalore", rating: 5, text: "Finally an app that explains risk in plain English. My SIP is now goal-based, not random. The milestone tracker keeps me motivated.", avatar: "PS", plan: "Pro" },
  { name: "Rahul Gupta",   role: "CA, Mumbai",                  rating: 5, text: "As a CA, I was skeptical. But the retirement calculator is more accurate than what I calculate manually. The inflation adjustment is perfect.", avatar: "RG", plan: "Elite" },
  { name: "Anita Verma",   role: "Teacher, Delhi",              rating: 5, text: "Used the goal planner for my daughter education fund. It gave me a clear SIP plan with monthly milestones. Highly recommended.", avatar: "AV", plan: "Basic" },
  { name: "Vikram Singh",  role: "Entrepreneur, Pune",          rating: 5, text: "The global event engine warned me about RBI rate hike impact on my debt funds 2 days before. Incredible feature.", avatar: "VS", plan: "Pro" },
  { name: "Meera Iyer",    role: "Doctor, Chennai",             rating: 5, text: "I never understood portfolio allocation until this app. The risk profiler nailed my profile exactly.", avatar: "MI", plan: "Pro" },
  { name: "Arjun Nair",    role: "IT Manager, Hyderabad",       rating: 4, text: "Stock analysis engine saves me hours of research. The fundamental + technical combo is unique in India.", avatar: "AN", plan: "Elite" },
]

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M7 1L8.73 4.52L12.63 5.07L9.82 7.81L10.46 11.7L7 9.77L3.54 11.7L4.18 7.81L1.37 5.07L5.27 4.52L7 1Z"
            fill={i < rating ? "var(--gold)" : "var(--border-default)"}
          />
        </svg>
      ))}
    </div>
  )
}

const PLAN_COLORS: Record<string, string> = {
  Basic: "badge-neutral",
  Pro:   "badge-gold",
  Elite: "badge-purple",
}

export default function TestimonialsPage() {
  return (
    <div className="page-root">

      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", height: "64px",
          borderBottom: "1px solid var(--border-default)",
          background: "rgba(7,8,10,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          position: "sticky", top: 0, zIndex: 50,
        }}
      >
        <Link
          href="/home"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem",
            color: "var(--text-primary)", textDecoration: "none",
          }}
        >
          <span style={{
            width: 30, height: 30, borderRadius: "var(--r-sm)",
            background: "var(--gold-dim)", border: "1px solid var(--border-gold)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.9rem",
          }}>📈</span>
          Fin<span style={{ color: "var(--gold)" }}>Vest Pro</span>
        </Link>
        <Link href="/auth/signup" className="btn btn-primary btn-sm">
          Get Started
        </Link>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 40px 64px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        className="ticker-bg"
      >
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "-60px", left: "50%",
          transform: "translateX(-50%)",
          width: "500px", height: "300px",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="badge badge-gold" style={{ marginBottom: "20px" }}>
            <span className="badge-dot" style={{ background: "var(--gold)" }} />
            Verified Reviews
          </div>

          <h1
            className="display-lg gradient-hero"
            style={{ marginBottom: "12px" }}
          >
            What Investors Say
          </h1>

          <p className="body-lg" style={{ marginBottom: "24px", maxWidth: "420px", margin: "0 auto 24px" }}>
            Trusted by thousands of Indian investors building wealth with AI
          </p>

          {/* Rating summary */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            padding: "10px 20px",
            background: "var(--bg-raised)",
            border: "1px solid var(--border-gold)",
            borderRadius: "var(--r-full)",
            boxShadow: "var(--shadow-gold)",
          }}>
            <div style={{ display: "flex", gap: "3px" }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="16" height="16" viewBox="0 0 14 14">
                  <path d="M7 1L8.73 4.52L12.63 5.07L9.82 7.81L10.46 11.7L7 9.77L3.54 11.7L4.18 7.81L1.37 5.07L5.27 4.52L7 1Z" fill="var(--gold)" />
                </svg>
              ))}
            </div>
            <span className="num-sm" style={{ color: "var(--gold-bright)", fontWeight: 600 }}>4.9</span>
            <span className="divider-v" style={{ height: "16px" }} />
            <span className="caption" style={{ color: "var(--text-secondary)" }}>from 2,400+ investors</span>
          </div>
        </div>
      </section>

      {/* ── Reviews grid ─────────────────────────────────────── */}
      <section style={{ padding: "0 40px 100px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="surface fade-up"
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "transform var(--t-base), box-shadow var(--t-base)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = ""
                ;(e.currentTarget as HTMLElement).style.boxShadow = ""
              }}
            >
              {/* Stars + plan */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <StarRating rating={r.rating} />
                <span className={`badge ${PLAN_COLORS[r.plan] ?? "badge-gray"}`}>{r.plan}</span>
              </div>

              {/* Quote */}
              <p
                className="body-md"
                style={{
                  flex: 1,
                  fontStyle: "italic",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="divider" />

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "var(--gold-dim)",
                  border: "1px solid var(--border-gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontSize: "0.75rem",
                  fontWeight: 700, color: "var(--gold-bright)",
                  flexShrink: 0,
                }}>
                  {r.avatar}
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {r.name}
                  </p>
                  <p className="caption">{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <p className="body-md" style={{ marginBottom: "20px" }}>
            Join thousands of investors growing wealth smarter
          </p>
          <Link href="/auth/signup" className="btn btn-primary btn-xl">
            Start for Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
