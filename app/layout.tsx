import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'FinVest Pro — AI Investment Intelligence',
  description: 'AI-powered investment advisory platform for Indian investors',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            gutter={10}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--bg-overlay)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--r-lg)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                boxShadow: 'var(--shadow-lg)',
                padding: '12px 16px',
                maxWidth: '380px',
              },
              success: {
                duration: 3500,
                iconTheme: { primary: '#10B981', secondary: 'var(--bg-overlay)' },
                style: {
                  background: 'var(--bg-overlay)',
                  border: '1px solid var(--border-gain)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--r-lg)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: 'var(--shadow-gain)',
                },
              },
              error: {
                duration: 5000,
                iconTheme: { primary: '#F43F5E', secondary: 'var(--bg-overlay)' },
                style: {
                  background: 'var(--bg-overlay)',
                  border: '1px solid var(--border-loss)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--r-lg)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: 'var(--shadow-loss)',
                },
              },
              loading: {
                iconTheme: { primary: 'var(--gold)', secondary: 'var(--bg-overlay)' },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
