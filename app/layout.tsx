import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CustomCursor } from '@/components/layout/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aryan Chhetri - Software Engineer',
  description: 'Professional portfolio of Aryan Chhetri, Software Engineer and AI/ML Enthusiast. Specializing in full-stack development, machine learning, and automation.',
  keywords: ['Aryan Chhetri', 'Software Engineer', 'AI/ML', 'Full Stack Developer', 'LPU', 'Machine Learning', 'React', 'Python'],
  authors: [{ name: 'Aryan Chhetri' }],
  openGraph: {
    title: 'Aryan Chhetri - Software Engineer & AI/ML Enthusiast',
    description: 'Professional portfolio showcasing innovative software solutions and AI/ML projects',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Chhetri - Software Engineer',
    description: 'Professional portfolio showcasing innovative software solutions and AI/ML projects',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}</body>
    </html>
  );
}