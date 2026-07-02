import type { Metadata } from 'next'
import LegalShell from '@/components/layout/LegalShell'

export const metadata: Metadata = { title: 'Privacy Policy — FinVest Pro' }

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
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
    </LegalShell>
  )
}
