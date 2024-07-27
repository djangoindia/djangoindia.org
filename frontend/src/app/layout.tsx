import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Navbar, Footer } from '@sections'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Django India',
  description: 'Welcome django india',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`bg-orange-50 ${inter.className}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
