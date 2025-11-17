import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PredictMarket</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Markets
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-sm font-medium text-primary">
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
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Everything you need to know about PredictMarket and how it works.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">What is PredictMarket?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                PredictMarket is a decentralized prediction market platform where users can trade on the outcome of
                future events. Markets are created for various topics including politics, sports, crypto, and more.
                Users buy and sell shares representing different outcomes, with prices reflecting the collective
                probability of each outcome.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">How do prediction markets work?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Prediction markets allow you to buy and sell shares on the outcome of future events. If you think an
                event will happen, you buy "Yes" shares. If you think it won't, you buy "No" shares. When the market
                resolves, winning shares are worth $1 each, and losing shares are worth $0. The current price reflects
                the market's collective probability of the outcome.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">How do I start trading?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                To start trading, you need to connect a crypto wallet (like MetaMask) and fund it with USDC or another
                supported stablecoin. Once connected, browse available markets, select an outcome you want to trade on,
                enter the amount you want to invest, and confirm your trade. Your shares will appear in your portfolio.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">What wallets are supported?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We support all major Ethereum wallets including MetaMask, WalletConnect, Coinbase Wallet, and Rainbow.
                You'll need to have some USDC or ETH in your wallet to start trading and pay for gas fees.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">How are markets resolved?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Markets are resolved based on verifiable real-world outcomes. We use a combination of trusted data
                sources and community verification to ensure accurate resolutions. Once a market is resolved, winning
                shares can be redeemed for $1 each, and funds are automatically distributed to winners.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">What fees does PredictMarket charge?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                PredictMarket charges a small trading fee (typically 2%) on winning positions. There are no fees for
                deposits or withdrawals, though you'll need to pay standard blockchain gas fees for transactions. All
                fees are transparently displayed before you confirm any trade.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">Can I sell my shares before the market resolves?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! You can sell your shares at any time before the market resolves. The price you receive will be the
                current market price, which fluctuates based on supply and demand. This allows you to lock in profits or
                cut losses before the final outcome is known.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border border-border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">Is PredictMarket legal?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                PredictMarket operates as a decentralized prediction market platform. The legality varies by
                jurisdiction. We recommend checking your local laws regarding prediction markets and online trading
                before participating. Users are responsible for ensuring their use of the platform complies with local
                regulations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Join our community or start trading to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/markets">
              <Button size="lg" className="text-base px-8 py-6">
                Start Trading
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-transparent">
              Join Discord
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
