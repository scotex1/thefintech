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
          <Toaster position="bottom-right" toastOptions={{
            style:{ background:'#111820', color:'#F0F4F8', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px' },
            success:{ iconTheme:{ primary:'#22C55E', secondary:'#111820' } },
            error:  { iconTheme:{ primary:'#EF4444', secondary:'#111820' } },
          }}/>
        </Providers>
      </body>
    </html>
  )
}