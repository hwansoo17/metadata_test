import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { headers } from 'next/headers';
import Link from 'next/link';
import { buildMetadata } from './seo/metadata-factory';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata() {
  const pathname = (await headers()).get('x-pathname') || '/';
  console.log('Generating metadata for pathname:', pathname);

  return buildMetadata({ pathname });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
