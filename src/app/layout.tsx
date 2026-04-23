import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FileOra | The Intelligent File Workspace",
  description: "Convert, edit, and optimize your files with AI-powered precision. No login required. No watermarks. Built for creators.",
  keywords: "file converter, pdf editor, ai summary, image optimizer, free file tools",
  openGraph: {
    title: "FileOra | Intelligent File Workspace",
    description: "The ultimate all-in-one tool for file management. Process batches of files in seconds.",
    url: "https://fileora.app",
    siteName: "FileOra",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FileOra",
    description: "Handle files with intelligent speed.",
    images: ["/logo.png"],
  },
  icons: {
    icon: '/logo.png',
  }
};

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import DragOverlay from '@/components/DragOverlay';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider>
          <DragOverlay />
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
