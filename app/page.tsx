"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Moon, Sun, TrendingUp, Shield, Zap, BarChart3, CheckCircle2, ArrowRight, Target, Coins, Vote, Rocket, Users, DollarSign, Trophy, Play, Copy, Twitter, Send, MessageCircle, Github } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "@/components/theme-provider"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useWallet } from "@/components/wallet-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LandingPage() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const { toast } = useToast()
  const { theme, toggleTheme } = useTheme()
  const { connect, isWalletConnected, walletAddress } = useWallet()

  const handleWalletSelect = async (walletName: string) => {
    await connect(walletName as any)
  }

  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/design-mode/logo_darkmode(1).png"
              alt="PolyHub"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#roadmap" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Roadmap
            </a>
            <Link href="/markets" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Markets
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setWalletModalOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isWalletConnected && walletAddress
                ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-gradient-to-b from-background via-background to-accent/20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 1px),
              radial-gradient(circle at 60% 70%, rgba(255,255,255,0.3) 1px, transparent 1px),
              radial-gradient(circle at 80% 10%, rgba(255,255,255,0.5) 1.5px, transparent 1.5px),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '200px 200px, 300px 250px, 350px 300px, 180px 180px',
          }} />
          
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-primary/30 animate-float"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Decentralized Prediction Markets
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2.5">
              The Future of<br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent text-6xl">
                Prediction Markets
              </span>
            </h1>
            <p className="text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto text-lg">
              Trade predictions on politics, sports, crypto, and more. Transparent, decentralized, and powered by blockchain technology with Zero-Knowledge privacy protection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/markets">
                <Button size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  Explore Markets
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-border hover:bg-accent hover:text-accent-foreground"
                onClick={() => setWalletModalOpen(true)}
              >
                <Play className="mr-2 w-5 h-5" />
                Get Started
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Total Volume", value: "$24.5M", icon: DollarSign },
                { label: "Active Markets", value: "1,234", icon: BarChart3 },
                { label: "Total Traders", value: "50K+", icon: Users },
                { label: "Avg Win Rate", value: "68%", icon: Trophy }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-card hover:bg-accent/50 transition-all">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Address Section */}
      <section id="contact-address" className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border-2 border-green-200/40 bg-card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                      <path d="M12 2L15 8H9L12 2Z" fill="currentColor" />
                      <path d="M12 22L9 16H15L12 22Z" fill="currentColor" />
                      <path d="M2 12L8 15V9L2 12Z" fill="currentColor" />
                      <path d="M22 12L16 9V15L22 12Z" fill="currentColor" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-semibold">Contract Address</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Official PolyHub smart contract on Solana blockchain</p>
              </div>

              <div className="flex-none w-full md:w-2/3 lg:w-1/2">
                <div className="flex items-center bg-muted/10 rounded-lg px-4 py-3 border border-muted/20">
                  <div className="flex-1 text-sm break-words">PLYXXXXXXXXXXXXXXXXXXXXXXXXXXpump</div>
                  <button
                    type="button"
                    onClick={async () => {
                      const address = 'PLYXXXXXXXXXXXXXXXXXXXXXXXXXXpump'
                      try {
                        await navigator.clipboard.writeText(address)
                        toast({ title: 'Copied', description: 'Contact address copied to clipboard' })
                      } catch (err) {
                        toast({ title: 'Copy failed', description: 'Unable to copy address' })
                      }
                    }}
                    className="ml-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-accent/5 hover:bg-accent/10 transition-colors"
                    aria-label="Copy contact address"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Always verify the contract address before any transactions. Never trust third-party sources.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How PolyHub Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start trading predictions in four simple steps
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Zap, title: "Connect Wallet", desc: "Link your Solana wallet securely to start trading" },
              { step: "02", icon: Target, title: "Browse Markets", desc: "Explore predictions across crypto, sports, politics & more" },
              { step: "03", icon: TrendingUp, title: "Make Predictions", desc: "Buy shares on outcomes you believe will happen" },
              { step: "04", icon: Trophy, title: "Earn Rewards", desc: "Collect your winnings when your predictions are correct" },
            ].map((item, i) => (
              <div key={i} className="group relative p-8 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg mx-8">
                  {item.step}
                </div>
                <div className="mb-6 mt-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose PolyHub
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for successful prediction trading
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "ZK-Powered Privacy", desc: "Advanced Zero-Knowledge (ZK) technology ensures your transactions remain private while maintaining full transparency and security" },
              { icon: Zap, title: "Lightning Fast", desc: "Powered by Solana for instant transaction processing and low fees" },
              { icon: BarChart3, title: "Real-Time Analytics", desc: "Advanced charts and statistics to make informed trading decisions" },
              { icon: Coins, title: "Deep Liquidity", desc: "Active markets with deep liquidity pools for seamless trading" },
              { icon: Vote, title: "Community Governance", desc: "Participate in platform decisions through decentralized voting" },
              { icon: Rocket, title: "Staking Rewards", desc: "Earn passive income by staking your tokens in liquidity pools" },
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Categories Section */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Diverse Market Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trade predictions across various categories
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Crypto", icon: "₿", count: "234" },
              { name: "Sports", icon: "⚽", count: "189" },
              { name: "Politics", icon: "🗳️", count: "156" },
              { name: "Technology", icon: "💻", count: "98" },
              { name: "Finance", icon: "📈", count: "145" },
              { name: "Entertainment", icon: "🎬", count: "87" },
              { name: "Science", icon: "🔬", count: "67" },
              { name: "Climate", icon: "🌍", count: "45" },
            ].map((category, i) => (
              <div key={i} className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 hover:scale-105 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg text-center mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground text-center">{category.count} markets</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <Rocket className="w-4 h-4" />
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Development Roadmap
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our path from concept to full-featured prediction market platform
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                month: "October 2025",
                status: "completed",
                title: "Project Foundation",
                items: [
                  "Initial project planning & research",
                  "Tech stack selection",
                  "Core architecture design",
                  "Development environment setup"
                ]
              },
              {
                month: "November 2025",
                status: "in-progress",
                title: "Token Launch & Community",
                items: [
                  "Launch $POLY token on Solana",
                  "Build community on Discord & Twitter",
                  "Start marketing campaign",
                  "Early adopter rewards program"
                ]
              },
              {
                month: "December 2025",
                status: "upcoming",
                title: "Core Platform Development",
                items: [
                  "Build prediction market features",
                  "Wallet integration (Phantom, Solflare)",
                  "Basic trading interface",
                  "User dashboard & portfolio"
                ]
              },
              {
                month: "January 2026",
                status: "upcoming",
                title: "Platform Beta Launch",
                items: [
                  "Beta testing with early users",
                  "Bug fixes & optimization",
                  "Market creation tools",
                  "Mobile responsive design"
                ]
              },
              {
                month: "February 2026",
                status: "upcoming",
                title: "Advanced Features",
                items: [
                  "Staking & rewards system",
                  "Advanced analytics dashboard",
                  "Social features & leaderboards",
                  "API for third-party integrations"
                ]
              },
              {
                month: "March 2026",
                status: "upcoming",
                title: "Official Public Launch",
                items: [
                  "Full platform launch",
                  "Marketing & PR campaign",
                  "Partnership announcements",
                  "Mobile app development starts"
                ]
              }
            ].map((phase, i) => (
              <div key={i} className="group relative p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all">
                <div className="absolute -top-3 right-4">
                  {phase.status === 'completed' && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Done
                    </div>
                  )}
                  {phase.status === 'in-progress' && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      Now
                    </div>
                  )}
                  {phase.status === 'upcoming' && (
                    <div className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold border">
                      Planned
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="inline-flex px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                    {phase.month}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">{phase.title}</h3>

                <ul className="space-y-2.5">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about PolyHub
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "What is PolyHub?",
                  a: "PolyHub is a decentralized prediction market platform built on Solana blockchain. Users can trade predictions on various future events including crypto prices, sports outcomes, political elections, and more."
                },
                {
                  q: "How do prediction markets work?",
                  a: "Prediction markets allow you to buy and sell shares representing the outcome of future events. If your prediction is correct, you earn profits. Share prices reflect the collective wisdom of all traders."
                },
                {
                  q: "How secure are my transactions on PolyHub?",
                  a: "PolyHub uses advanced Zero-Knowledge (ZK) technology to ensure maximum security and privacy. Your transaction details remain private while still being verifiable on the blockchain. All funds are secured by smart contracts and your wallet remains in your control at all times. ZK proofs guarantee that your trading activity is protected without compromising the transparency of the market."
                },
                {
                  q: "What wallets are supported?",
                  a: "We support all major Solana wallets including Phantom, Solflare, Ledger, and more. You can connect your wallet in seconds to start trading."
                },
                {
                  q: "Are there any fees?",
                  a: "PolyHub charges a small platform fee (2%) on winning trades. Gas fees on Solana are minimal (less than $0.01 per transaction)."
                },
                {
                  q: "How do I withdraw my winnings?",
                  a: "Winnings are automatically credited to your connected wallet. You can withdraw to any Solana address or exchange at any time."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of users making predictions and earning rewards on PolyHub
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90"
                onClick={() => setWalletModalOpen(true)}
              >
                Connect Wallet Now
                <Rocket className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/markets">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                >
                  Explore Markets
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/design-mode/logo_darkmode(1).png"
                  alt="PolyHub"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The decentralized prediction market platform. Trade predictions, earn rewards.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://twitter.com/polyhub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://discord.gg/polyhub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label="Discord"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="https://t.me/polyhub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/polyhub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/markets" className="hover:text-primary transition-colors">Markets</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                <li><Link href="/staking" className="hover:text-primary transition-colors">Staking</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/documentation" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/api-docs" className="hover:text-primary transition-colors">API</Link></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 PolyHub. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <WalletConnectModal 
        open={walletModalOpen} 
        onOpenChange={setWalletModalOpen}
        onWalletSelect={handleWalletSelect}
      />
    </div>
  )
}
