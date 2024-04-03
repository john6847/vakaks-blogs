import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={
        cn(
          inter.variable, anton.variable,
        )
      }>{children}</body>
    </html>
  );
}
