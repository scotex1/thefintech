import type { Metadata } from "next"
import { LegalLayout } from "@/components/LegalLayout"

export const metadata: Metadata = { title: "Terms of Service — FinVest Pro" }

export default function Page() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using FinVest Pro."
      icon="📋"
      sections={[
        {
          title: "Acceptance of Terms",
          content: (
            <p>
              By using FinVest Pro, you agree to these terms. Our platform provides financial
              analysis tools for informational purposes. We are not a SEBI-registered investment
              advisor unless explicitly stated.
            </p>
          ),
        },
        {
          title: "Not Financial Advice",
          content: (
            <p>
              All analysis, recommendations, and projections on FinVest Pro are for educational
              and informational purposes only. They do not constitute financial advice. Always
              consult a qualified financial advisor before investing.
            </p>
          ),
        },
        {
          title: "Investment Risk Disclaimer",
          content: (
            <p>
              Investments in securities are subject to market risks. Past performance does not
              guarantee future returns. The value of investments may go up or down. FinVest Pro
              is not liable for investment losses.
            </p>
          ),
        },
        {
          title: "Account Responsibilities",
          content: (
            <p>
              You are responsible for maintaining the security of your account credentials.
              Do not share your password with anyone.
            </p>
          ),
        },
        {
          title: "Subscription and Payments",
          content: (
            <p>
              Subscriptions are billed in advance. Cancellations take effect at the end of the
              billing period. Refunds are subject to our Refund Policy.
            </p>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              Legal queries:{" "}
              <a
                href="mailto:legal@finvestpro.in"
                style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}
              >
                legal@finvestpro.in
              </a>
            </p>
          ),
        },
      ]}
      footerNote={
        <p>
          By continuing to use FinVest Pro, you acknowledge that you have read, understood, and
          agree to be bound by these Terms of Service.
        </p>
      }
    />
  )
}
