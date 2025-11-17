import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { MarketProvider } from "@/context/market"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
})

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "PolyHub - Decentralized Prediction Markets",
  description: "Trade on future outcomes with transparent blockchain-powered prediction markets",  
  icons: {
    icon: [
      {
        url: "/favicon.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.jpg",
        media: "(prefers-color-scheme: dark)",
      } 
    ],
    apple: "/favicon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <WalletProvider>
            <MarketProvider>
              {children}
              <Toaster />
            </MarketProvider>
          </WalletProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
