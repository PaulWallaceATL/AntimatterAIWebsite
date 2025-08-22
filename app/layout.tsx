import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Digital Solutions that Matter',
  description: 'Building digital solutions that transform businesses and drive innovation.',
  metadataBase: new URL('https://antimatter-ai.com'),
  openGraph: {
    title: 'Digital Solutions that Matter',
    description: 'Building digital solutions that transform businesses and drive innovation.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Solutions that Matter',
    description: 'Building digital solutions that transform businesses and drive innovation.',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#000000]">
        <Navigation />
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').catch(function(){})
            })
          }
        ` }} />
      </body>
    </html>
  )
} 