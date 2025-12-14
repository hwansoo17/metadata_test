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
          src="https://genaiollms.com/meta-loader.v1.js"
          data-id="a96c029c878d"
          data-token="a96c029c878d"
          data-watch-url="true"
          data-mode="override"></script>

        <script
          src="https://botlog.genaiollms.com/bot-log.js"
          defer
          data-pid="a96c029c878d"
          data-ptoken="a96c029c878d"></script>
        <noscript>
          <img
            src="https://botlog.genaiollms.com/bot-ns.gif?pid=a96c029c878d&ptoken=a96c029c878d&domain=https://b-cube.store"
            width="1"
            height="1"
            alt=""
            style="position:absolute;left:-9999px;top:-9999px"
          />
        </noscript>
        <link
          rel="prefetch"
          href="https://botlog.genaiollms.com/bot-link.gif?pid=a96c029c878d&ptoken=a96c029c878d&domain=https://b-cube.store"
          as="image"
        />
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
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
