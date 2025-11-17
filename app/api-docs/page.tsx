"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Code2, Copy, Check, BookOpen, Terminal, Key, Zap, Shield, Globe } from 'lucide-react'
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

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
            <Link href="/documentation" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/api-docs" className="text-sm font-medium text-foreground transition-colors">
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

      {/* Hero Section */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
              <Terminal className="w-4 h-4" />
              Developer API
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              PolyHub API Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Build powerful prediction market applications with our RESTful API. Access real-time market data, place trades, and integrate PolyHub into your platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Key className="mr-2 w-5 h-5" />
                Get API Key
              </Button>
              <Button size="lg" variant="outline">
                <BookOpen className="mr-2 w-5 h-5" />
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Sub-100ms response times with global CDN" },
              { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security with 99.9% uptime" },
              { icon: Globe, title: "Global Access", desc: "Accessible from anywhere with rate limiting" }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Getting Started</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">1. Get Your API Key</h3>
                <p className="text-muted-foreground mb-4">
                  Sign up for a free API key at{" "}
                  <a href="https://polyhub.trade/api" className="text-primary hover:underline">
                    polyhub.trade/api
                  </a>
                </p>
                <div className="bg-card border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm">Your API Key</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard("ph_live_1234567890abcdef", "apikey")}
                    >
                      {copiedCode === "apikey" ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <code className="text-xs text-muted-foreground">ph_live_xxxxxxxxxxxxxxxxxxx</code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">2. Make Your First Request</h3>
                <div className="bg-card border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b bg-accent">
                    <span className="text-sm font-medium">cURL</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(
                        `curl https://api.polyhub.trade/v1/markets \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
                        "curl"
                      )}
                    >
                      {copiedCode === "curl" ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code>{`curl https://api.polyhub.trade/v1/markets \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  method: "GET",
                  endpoint: "/v1/markets",
                  title: "Get All Markets",
                  desc: "Retrieve a list of all active prediction markets",
                  example: `{
  "markets": [
    {
      "id": "btc-100k-2025",
      "question": "Will Bitcoin reach $100k in 2025?",
      "category": "crypto",
      "volume": 245000,
      "yes_price": 0.65,
      "no_price": 0.35,
      "ends_at": "2025-12-31T23:59:59Z"
    }
  ]
}`
                },
                {
                  method: "GET",
                  endpoint: "/v1/markets/:id",
                  title: "Get Market Details",
                  desc: "Get detailed information about a specific market",
                  example: `{
  "id": "btc-100k-2025",
  "question": "Will Bitcoin reach $100k in 2025?",
  "description": "Market resolves YES if BTC hits $100k...",
  "category": "crypto",
  "volume": 245000,
  "liquidity": 50000,
  "yes_price": 0.65,
  "no_price": 0.35,
  "total_traders": 1234,
  "created_at": "2025-01-01T00:00:00Z",
  "ends_at": "2025-12-31T23:59:59Z"
}`
                },
                {
                  method: "POST",
                  endpoint: "/v1/trades",
                  title: "Place a Trade",
                  desc: "Place a buy or sell order on a market",
                  example: `// Request Body
{
  "market_id": "btc-100k-2025",
  "outcome": "yes",
  "amount": 100,
  "wallet_signature": "..."
}

// Response
{
  "trade_id": "trade_xyz",
  "status": "confirmed",
  "shares": 153.84
}`
                },
                {
                  method: "GET",
                  endpoint: "/v1/user/portfolio",
                  title: "Get User Portfolio",
                  desc: "Retrieve user's positions and trading history",
                  example: `{
  "total_value": 5420.50,
  "positions": [
    {
      "market_id": "btc-100k-2025",
      "outcome": "yes",
      "shares": 153.84,
      "avg_price": 0.65,
      "current_value": 100
    }
  ]
}`
                }
              ].map((endpoint, i) => (
                <AccordionItem key={i} value={`endpoint-${i}`} className="border rounded-2xl px-6 bg-card">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        endpoint.method === "GET" 
                          ? "bg-blue-500/10 text-blue-500" 
                          : "bg-green-500/10 text-green-500"
                      }`}>
                        {endpoint.method}
                      </span>
                      <div>
                        <div className="font-semibold">{endpoint.title}</div>
                        <code className="text-xs text-muted-foreground">{endpoint.endpoint}</code>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 space-y-4">
                      <p className="text-muted-foreground">{endpoint.desc}</p>
                      <div className="bg-accent rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b">
                          <span className="text-sm font-medium">Example Response</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(endpoint.example, `example-${i}`)}
                          >
                            {copiedCode === `example-${i}` ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <pre className="p-4 text-xs overflow-x-auto">
                          <code>{endpoint.example}</code>
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Rate Limits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { plan: "Free", requests: "1,000", price: "$0" },
                { plan: "Pro", requests: "100,000", price: "$49/mo" },
                { plan: "Enterprise", requests: "Unlimited", price: "Custom" }
              ].map((tier, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-card">
                  <h3 className="text-lg font-bold mb-2">{tier.plan}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{tier.requests}</div>
                  <p className="text-sm text-muted-foreground mb-4">requests/month</p>
                  <div className="text-xl font-bold">{tier.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
