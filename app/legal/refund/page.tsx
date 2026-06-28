import type { Metadata } from "next"
import { LegalLayout } from "@/components/LegalLayout"

export const metadata: Metadata = { title: "Refund Policy — FinVest Pro" }

export default function Page() {
  return (
      title="Refund Policy"
      subtitle="We want you to be completely satisfied with FinVest Pro."
      icon="💳"
      sections={[
        {
          title: "Refund Window",
          content: (
            <p>
              We offer a <strong style={{ color: "var(--text-primary)" }}>7-day refund</strong> on
              all subscription plans from the date of purchase, provided you have not used more
              than 3 engine sessions.
            </p>
          ),
        },
        {
          title: "How to Request a Refund",
          content: (
            <p>
              Email{" "}
              <a href="mailto:support@finvestpro.in" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
                support@finvestpro.in
              </a>{" "}
              with your registered email and Order ID within 7 days of purchase. Refunds are
              processed within 5–7 business days to your original payment method.
            </p>
          ),
        },
        {
          title: "Non-Refundable Cases",
          content: (
            <p>
              Refunds are not provided after 7 days, for annual plans after the first 7 days,
              or if the account has violated our Terms of Service.
            </p>
          ),
        },
        {
          title: "Partial Refunds",
          content: (
            <p>
              We do not offer partial refunds for unused subscription days. You retain access
              to your plan until the end of the billing period.
            </p>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              Refund queries:{" "}
              <a href="mailto:support@finvestpro.in" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
                support@finvestpro.in
              </a>
            </p>
          ),
        },
      ]}
      footerNote={
        <p>
          For urgent refund requests, please mention &quot;URGENT REFUND&quot; in your email subject
          line. Our team will prioritize your case.
        </p>
      }
    />
  )
}

