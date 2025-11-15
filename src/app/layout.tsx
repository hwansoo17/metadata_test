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
          src="http://localhost:3000/meta-loader.v1.js"
          data-id="ad3ac09c81fa"
          data-token="ad3ac09c81fa"
          data-watch-url="true"
          data-mode="override"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          async
          src="https://genaiollms.com/embed.v1.js"
          data-id="3b56f71f1978"
          data-token="3b56f71f1978"
          data-lang="auto"
          data-scope="entire"
          data-variant="stable"
          data-jsonld="auto"></script>
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
            <Link href="/meta">Meta</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
