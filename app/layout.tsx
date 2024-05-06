import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { cn } from '@/lib/utils';
import OtherProvider from '@/components/other-provider';
import AuthProvider from './auth-provider';
import PublicLayout from './publicLayout';
import { siteDescription } from '@/lib/config/constants';

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
  description: siteDescription,
  category: "web development, programming, javascript, react, next.js, css, html, software development, technology, blog, vakaks, joseph watson, john jerry cosky bien-aime, joe watson, cosky bien aime, joe watson sbf, jerry bien aime, sbf, joe",
  twitter: {
    site: "@vakaks",
    card: "summary_large_image",
    description: siteDescription,
  },
  authors: [
    {
      name: "Joseph Watzson",
      url: "https://www.linkedin.com/in/joseph-watzson"
    },
    {
      name: "John Jerry Bien-aime",
      url: "https://www.linkedin.com/in/john-jerry-bien-aime-650582124"
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
  bookmarks: "VAKAKS - Blog",
  openGraph: {
    siteName: "VAKAKS Blogs",
    description: siteDescription,
    type: "website",
    title: "Blog - VAKAKS",
    url: "https://blogs.vakaks.com",
    locale: "en_US",
  },
  robots: "index, follow",
  publisher: "VAKAKS"
};

const isDevMode = process.env.NODE_ENV === "development";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4245479224018715" />
      </head>
      <body className={
        cn(
          inter.variable, anton.variable, GeistSans.variable, GeistMono.variable,
        )
      }>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            <PublicLayout>
              {children}
            </PublicLayout>
          </AuthProvider>
          <OtherProvider />
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
