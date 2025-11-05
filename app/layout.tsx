'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Header } from '@/components/Core/general/header';
import { Sidebar } from '@/components/Core/general/sidebar';
import { Toaster, ToastProvider, ToastViewport } from '@/hooks/use-toast';
import { Inter } from 'next/font/google';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

function shouldExcludeLayout(pathname: string): boolean {
  const excludedPaths = [
    '/',
    '/login',
    '/signup',
    '/password-recovery',
  ];

  if (excludedPaths.includes(pathname)) {
    return true;
  }

  const excludedPrefixes = ['/account', '/onboarding', '/setup'];

  if (excludedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }

  const excludedPatterns = [/^\/account\/login/, /^\/public\//];

  if (excludedPatterns.some((pattern) => pattern.test(pathname))) {
    return true;
  }

  return false;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isExcludedPage = shouldExcludeLayout(pathname);
  const router = useRouter();

  const excludedPaths = [
    '/',
    '/account/login',
    '/account/signup',
    '/account',
    '/password-recovery',
    '/account/forgot-password',
    '/api/auth/google',
    '/privacy',
    '/terms'
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !excludedPaths.includes(pathname)) {
      router.push("/account/login");
    }
  }, [pathname, router]);

  return (
    <html
      lang='en'
      className={inter.className}>
      <body className='h-full'>
        <div className='flex h-screen bg-white'>
          {!isExcludedPage && <Sidebar />}
          <div className='flex-1 flex flex-col overflow-hidden'>
            {!isExcludedPage && <Header />}
            <main className='flex-1 overflow-auto bg-[#fbfaf9]'>
              <ToastProvider>
                {children}
                <Toaster />
                <ToastViewport />
              </ToastProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}