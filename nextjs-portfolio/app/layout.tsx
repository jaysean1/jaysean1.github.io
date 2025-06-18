import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ui/ToastContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Resume - Sui Qian',
  description: 'Senior Internet Product Manager | Technical Product Leader with 9 years of experience in AI & IoT solutions',
  keywords: 'Product Manager, AI, IoT, Alibaba, Technical Leader, Product Development',
  authors: [{ name: 'Sui Qian' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Sui Qian - Senior Product Manager',
    description: 'Technical Product Leader with 9 years of experience in AI & IoT solutions',
    siteName: 'Sui Qian Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sui Qian - Senior Product Manager',
    description: 'Technical Product Leader with 9 years of experience in AI & IoT solutions',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.PNG" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}