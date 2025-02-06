import React from 'react';

import { Montserrat } from 'next/font/google';
import Script from 'next/script';

import { Providers } from '@/providers';

import type { Metadata } from 'next';

import './globals.css';

const inter = Montserrat({ subsets: ['latin'] });

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
        url: '/og-image-large.png',
        width: 1200,
        height: 630,
      },
      {
        url: '/og-image-small.png',
        width: 400,
        height: 400,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Django India Community',
    description: 'Connect with Django developers across India.',
    images: [
      {
        url: '/og-twitter.jpg',
        width: 300,
        height: 157,
      },
      {
        url: '/og-twitter-square.jpg',
        width: 600,
        height: 600,
      },
      {
        url: '/og-image-large-twitter.jpg',
        width: 1200,
        height: 675,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          id='gtm-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KL53GH4J');
            `,
          }}
        />
      </head>
      <Providers>
        <body className={`bg-[#F2ECE4] ${inter.className}`}>
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-KL53GH4J'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          {children}
        </body>
      </Providers>
    </html>
  );
}
