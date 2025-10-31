import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist } from 'next/font/google';
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Boundary from '@/components/internal/Boundary';
import { BoundaryProvider } from '@/components/internal/BoundaryProvider';
import type { Metadata } from 'next';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import { getIsAuthenticated } from '@/features/auth/auth-queries';

const GeistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 16 App Router Commerce',
  title: 'Next 16 Commerce',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const loggedIn = getIsAuthenticated();

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <AuthProvider loggedIn={loggedIn}>
          <BoundaryProvider>
            <Boundary rendering="static" hydration="server">
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="3xl:px-60 mb-4 flex flex-1 flex-col gap-6 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-40">
                  {children}
                </main>
              </div>
              <Footer />
            </Boundary>
          </BoundaryProvider>
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
