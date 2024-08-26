import { Montserrat } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  title: 'Django India',
  description:
    'Join the Django India Community to connect with fellow developers, learn best practices, and grow your skills in Django, Python, and web development.',
  keywords:
    'Django, India, Python, Web Development, Community, Programming, Framework, Open Source,',
  authors: [{ name: 'Django India Community', url: 'https://djangoindia.org' }],
  openGraph: {
    title: 'Django India Community',
    description: 'Connect with Django developers across India.',
    url: 'https://djangoindia.org',
    siteName: 'Django India',
    images: [
      {
        url: '/djangoindia_logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Django India Community',
    description: 'Connect with Django developers across India.',
    images: ['/djangoindia_twitter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`bg-orange-50 ${inter.className}`}>{children}</body>
    </html>
  )
}
