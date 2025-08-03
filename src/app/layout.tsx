import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ShowTrackAI - Elite Livestock Management',
  description: 'Professional livestock management app for FFA students with AI-powered insights',
  keywords: ['FFA', 'agriculture', 'livestock', 'education', 'animal management'],
  authors: [{ name: 'ShowTrackAI Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0ea5e9',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ShowTrackAI',
  },
  openGraph: {
    title: 'ShowTrackAI - Elite Livestock Management',
    description: 'Professional livestock management app for FFA students',
    type: 'website',
    siteName: 'ShowTrackAI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ShowTrackAI" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#65a30d" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}