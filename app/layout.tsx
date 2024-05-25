import { TransactionProvider } from '@/context/TransactionContext';
import { Poppins } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

const poppin = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DeFi Application',
  description: 'Web3 Application for the executing of transactions faster and efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppin.className}`}>
        <TransactionProvider>
          {children}
        </TransactionProvider>
      </body>
    </html>
  );
}
