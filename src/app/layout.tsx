import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mehran Firdous — AI Automation Architect",
  description:
    "I fix broken systems and make teams faster. n8n, Zapier, API integrations, AI agents, end-to-end automation builds.",
  keywords: ["AI automation","n8n","Zapier","automation engineer","API integration","AI agent","workflow automation","Mehran Firdous"],
  authors: [{ name: "Mehran Firdous" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  openGraph: {
    title: "Mehran Firdous — AI Automation Architect",
    description: "I fix broken systems and make teams faster.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${jetbrains.variable} antialiased`}
        style={{ fontFamily: 'var(--font-jb), monospace', background: '#0C0C0C', color: '#E5E5E5', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
