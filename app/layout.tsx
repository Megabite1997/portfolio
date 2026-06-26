import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description = profile.summary;

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title,
  description,
  keywords: [
    "Tada Chaipanya",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Go",
    "Golang",
    "AWS",
    "TypeScript",
    "Software Engineer",
  ],
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: profile.website,
    title,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
