import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bebas_Neue, Poppins } from 'next/font/google';
import { getLogos } from '@/lib/api';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: ['400'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: [
    '100','200','300','400','500','600','700','800','900'
  ],
  style: ['normal', 'italic'],
});



export async function generateMetadata(): Promise<Metadata> {
  const logo = await getLogos();

  return {
    title: {
      default: 'Active Aura Fitness',
      template: '%s | Active Aura Fitness',
    },
    description:
      'Personalized fitness plans, body reset programs, and free consultations.',
    keywords: [
      'weight loss',
      'fitness',
      'body reset',
      'personal training',
      'Active Aura',
    ],
    icons: {
      icon: logo.url,          
      apple: logo.url,
    },
    openGraph: {
      title: 'Active Aura Fitness',
      description:
        'Science-backed body reset and weight loss programs.',
      url: 'https://active-aura-fitness.vercel.app',
      siteName: 'Active Aura Fitness',
      images: [
        {
          url: logo.url,
          width: 1200,
          height: 630,
          alt: 'Active Aura Fitness',
        },
      ],
      type: 'website',
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
