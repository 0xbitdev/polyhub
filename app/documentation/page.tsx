"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Wallet, TrendingUp, Shield, Zap, Code2, MessageCircle } from 'lucide-react'

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_darkmode-3FpeYOibVCv8cbsZp2n71xBSm6aedZ.png"
              alt="PolyHub"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/documentation" className="text-sm font-medium text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/api-docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              API
            </Link>
          </nav>

          <Link href="/markets">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
              <BookOpen className="w-4 h-4" />
              Documentation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need to Know
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive guides and documentation to help you start trading predictions on PolyHub
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Wallet, 
                title: "Getting Started", 
                desc: "Learn how to connect your wallet and make your first trade",
                link: "#getting-started"
              },
              { 
                icon: TrendingUp, 
                title: "Trading Guide", 
                desc: "Master the art of prediction market trading",
                link: "#trading"
              },
              { 
                icon: Shield, 
                title: "Security & Privacy", 
                desc: "Understanding ZK technology and how we protect your data",
                link: "#security"
              },
              { 
                icon: Zap, 
                title: "Platform Features", 
                desc: "Explore staking, governance, and advanced features",
                link: "#features"
              },
              { 
                icon: Code2, 
                title: "Developer API", 
                desc: "Build on PolyHub with our comprehensive API",
                link: "/api-docs"
              },
              { 
                icon: MessageCircle, 
                title: "FAQ & Support", 
                desc: "Find answers to common questions",
                link: "#faq"
              }
            ].map((item, i) => (
              <Link key={i} href={item.link}>
                <div className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="getting-started" className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Getting Started with PolyHub</h2>
            
            <div className="space-y-8">
              <div className="bg-card border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Step 1: Connect Your Wallet</h3>
                <p className="text-muted-foreground mb-4">
                  PolyHub supports all major Solana wallets including Phantom, Solflare, and Ledger. Click the "Connect Wallet" button in the top right corner and select your preferred wallet.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Make sure you have a Solana wallet installed</li>
                  <li>Ensure you have SOL for transaction fees</li>
                  <li>Never share your seed phrase with anyone</li>
                </ul>
              </div>

              <div className="bg-card border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Step 2: Browse Markets</h3>
                <p className="text-muted-foreground mb-4">
                  Explore prediction markets across various categories including crypto, sports, politics, and more. Use filters to find markets that match your interests and expertise.
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Step 3: Make Your First Trade</h3>
                <p className="text-muted-foreground mb-4">
                  Select a market, choose your prediction (Yes or No), enter the amount you want to trade, and confirm the transaction in your wallet. Your shares will appear in your portfolio immediately.
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Step 4: Track Your Performance</h3>
                <p className="text-muted-foreground">
                  Monitor your positions in the Portfolio page. Track your profit/loss, view your trading history, and analyze your prediction accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Security & Privacy with ZK Technology</h2>
            
            <div className="bg-card border rounded-2xl p-8 mb-8">
              <p className="text-muted-foreground mb-6">
                PolyHub uses cutting-edge Zero-Knowledge (ZK) technology to ensure maximum security and privacy for all transactions. Here's how we protect you:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">🔐 Private Transactions</h4>
                  <p className="text-sm text-muted-foreground">
                    Your trading activity remains completely private. ZK proofs allow verification without revealing sensitive transaction details.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">🛡️ Non-Custodial Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Your funds stay in your wallet. PolyHub never has access to your private keys or can control your assets.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">✅ Transparent Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    While your details are private, all market outcomes and resolutions are publicly verifiable on the blockchain.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">⚡ Fast & Secure</h4>
                  <p className="text-sm text-muted-foreground">
                    ZK technology enables instant transaction verification without compromising on security or privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
