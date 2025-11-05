import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import { PrerenderReady } from './prerender-ready';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="prerender-ready-init" strategy="beforeInteractive">
          {(`
            window.prerenderReady = false;
          `).trim()}
        </Script>
        <header>
          <nav>
            <Link href="/">Home</Link> | <Link href="/about">About</Link>
          </nav>
        </header>
        <PrerenderReady />
        {children}
      </body>
    </html>
  );
}
