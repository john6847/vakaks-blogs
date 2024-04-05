import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { cn } from '@/lib/utils';
import { Header } from '@/components/header/header';
import OtherProvider from '@/components/other-provider';
import PublicLayout from './publicLayout';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Blog - VAKAKS",
  description: "A blog about web development, programming, and more.",
  authors: [
    {
      name: "JOSEPH WATZSON"
    },
    {
      name: "John Jerry Cosky Bien-Aimé"
    }
  ],
  keywords: [
    "web development",
    "programming", "javascript",
    "react", "next.js", "css",
    "html", "software development",
    "technology", "blog", "vakaks",
    "joseph watson", "john jerry cosky bien-aime",
    "joe watson", "cosky bien aime",
    "joe watson sbf", "jerry bien aime",
    "sbf", "joe"
  ],
};

const isDevMode = process.env.NODE_ENV === "development";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={
        cn(
          inter.variable, anton.variable, GeistSans.variable, GeistMono.variable,
        )
      }>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
            <PublicLayout>
              {children}
            </PublicLayout>
          <OtherProvider/>
        </ThemeProvider>

        {
          !isDevMode && (
            <>
              <SpeedInsights />
              <Analytics />
            </>
          )
        }
      </body>
    </html>
  );
}
