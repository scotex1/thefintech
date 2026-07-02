import type { Metadata } from 'next'
import LegalShell from '@/components/layout/LegalShell'

export const metadata: Metadata = { title: 'Help Center — FinVest Pro' }

export default function SupportPage() {
  return (
    <LegalShell title="Help Center">
      <h2>Getting Started</h2>
      <p>After creating your account, take the <strong>Risk Profiler quiz</strong> first — it determines your investment profile and unlocks personalized recommendations across all engines.</p>
      <h2>Engines Guide</h2>
      <p>
        <strong>Risk Profiler (Free):</strong> 10-question quiz, instant results.<br/>
        <strong>Market News (Free):</strong> AI-curated news, updated every 5 minutes.<br/>
        <strong>Goal Planner (Basic+):</strong> Enter target amount and months, get monthly SIP.<br/>
        <strong>Retirement Planner (Basic+):</strong> Enter age and expenses, get corpus calculation.<br/>
        <strong>Stock Analysis (Pro+):</strong> Enter NSE/BSE symbol for full AI analysis.<br/>
        <strong>Portfolio Optimizer (Pro+):</strong> Enter holdings to get MPT-based recommendations.<br/>
        <strong>Global Events (Pro+):</strong> Macro events mapped to your portfolio impact.
      </p>
      <h2>Payment Issues</h2>
      <p>If your payment was deducted but plan was not activated, email <strong>support@finvestpro.in</strong> with your Order ID within 24 hours.</p>
      <h2>Contact Support</h2>
      <p>Email: <strong>support@finvestpro.in</strong><br/>Response time: within 24 hours on business days.</p>
    </LegalShell>
  )
}
