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
          data-id="b83de752b668"
          data-token="b83de752b668"
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
        <header>
          <nav>
            <Link href="/">Home</Link> | <Link href="/about">About</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
