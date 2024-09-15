import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import NavBar from './NavBar';
import { Suspense } from 'react';
import Loading from './loading';
import AuthProvider from './auth/Provider';
import GoogleAnalyticsScript from './GoogleAnalyticsScript';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'NextJS Course',
  description: 'NextJS Course',
  openGraph: {
    title: '...',
    description: '...',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-theme='winter'>
      <head>
        <GoogleAnalyticsScript />
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <NavBar />
          <main className='p-5'>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
