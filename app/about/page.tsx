import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Target, Globe, Shield, Users } from 'lucide-react'
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_darkmode-3FpeYOibVCv8cbsZp2n71xBSm6aedZ.png"
              alt="PolyHub"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Markets
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary">
              About
            </Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </nav>
          <Link href="/markets">
            <Button variant="outline" size="sm">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 text-foreground">About PolyHub</h1>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            We're building the world's most trusted decentralized prediction market platform, where anyone can trade on
            the outcome of future events.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To democratize access to prediction markets and create a transparent, efficient marketplace for
                forecasting future events.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that collective intelligence, when properly incentivized, can provide the most accurate
                predictions about future outcomes.
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">$2.5B+</div>
                  <div className="text-sm text-muted-foreground">Total Trading Volume</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500K+</div>
                  <div className="text-sm text-muted-foreground">Active Traders</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Markets Created</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">
                All trades and market resolutions are recorded on-chain, ensuring complete transparency and
                immutability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Accessibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                Anyone, anywhere can participate in our markets with just a crypto wallet and internet connection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is driven by a global community of traders, forecasters, and market makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Start trading on the most exciting prediction markets today.
          </p>
          <Link href="/markets">
            <Button size="lg" className="text-base px-8 py-6">
              Start Trading
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
