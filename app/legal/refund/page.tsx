import type { Metadata } from 'next'
import LegalShell from '@/components/layout/LegalShell'

export const metadata: Metadata = { title: 'Refund Policy — FinVest Pro' }

export default function RefundPage() {
  return (
    <LegalShell title="Refund Policy">
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
    </LegalShell>
  )
}
