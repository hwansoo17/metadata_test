import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://api.searchos.io/meta-loader.v1.js"
          data-id="695b8fa38f58f2e81a6049fd"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <nav
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              fontWeight: 600,
            }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/showcase">Showcase</Link>
            <Link href="/meta">Meta</Link>
            <Link href="/node-test">Node Test</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
