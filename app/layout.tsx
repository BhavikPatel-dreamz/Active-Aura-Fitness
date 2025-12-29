import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bebas_Neue, Poppins } from 'next/font/google';
import { getLogos, getFavicon} from '@/lib/api';

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
  const [logo, favicon] = await Promise.all([
    getLogos(),
    getFavicon(),
  ]);

  const faviconUrl = favicon?.url || logo?.url;
  const version = favicon?.id || '1';

  return {
    title: {
      default: 'Active Aura Fitness',
      template: '%s | Active Aura Fitness',
    },

    icons: {
      icon: `${faviconUrl}?v=${version}`,
      apple: `${faviconUrl}?v=${version}`,
      shortcut: `${faviconUrl}?v=${version}`,
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
