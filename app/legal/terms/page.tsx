import type { Metadata } from 'next'
import LegalShell from '@/components/layout/LegalShell'

export const metadata: Metadata = { title: 'Terms of Service — FinVest Pro' }

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service">
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
    </LegalShell>
  )
}
