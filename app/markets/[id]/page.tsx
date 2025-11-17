"use client"

import { use, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, Wallet, ArrowLeft, TrendingDown, Clock, DollarSign, Users, Github, Moon, Sun } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "@/components/theme-provider"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useWallet } from "@/components/wallet-provider"
import { WalletStatus } from "@/components/wallet-status"

// Mock market data (fallback)
const marketData = {
  "fed-decision-december": {
    title: "Will the Fed cut rates in December 2025?",
    category: "Economics",
    description:
      'This market resolves to "Yes" if the Federal Reserve announces a rate cut of at least 0.25% at their December 2025 meeting. The market will resolve based on the official Federal Reserve announcement.',
    volume: "$2.4M",
    yesPrice: 67,
    noPrice: 33,
    endDate: "Dec 18, 2025",
    liquidity: "$450K",
    traders: 1234,
    image: "/placeholder.svg?height=400&width=800",
    contractAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  },
}

type UIMarket = {
  id: string
  title: string
  category: string
  description?: string
  volume: string
  yesPrice: number
  noPrice: number
  endDate: string
  liquidity?: string
  traders?: number | null
  image?: string | null
  change24hPct?: number
}

function normalizeBase(rawBase: string | undefined) {
  if (!rawBase) return ""
  const withProto = /^https?:\/\//i.test(rawBase) ? rawBase : `http://${rawBase}`
  return withProto.endsWith("/") ? withProto : `${withProto}/`
}

function priceToPercent(val: unknown): number {
  const n = Number(val)
  if (!Number.isFinite(n)) return 0
  if (n >= 0 && n <= 1) return Math.round(n * 100)
  return Math.max(0, Math.min(100, Math.round(n)))
}

function toShortDate(iso?: string | number | Date | null) {
  try {
    if (!iso) return ""
    const d = new Date(iso as any)
    if (isNaN(d.getTime())) return ""
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  } catch {
    return ""
  }
}

function formatCurrencyShort(val: number | string | null | undefined): string {
  const n = typeof val === "number" ? val : Number(val ?? 0)
  if (!isFinite(n) || n <= 0) return "$0"
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toFixed(0)}`
}

function toPercentChange(val: unknown): number {
  const n = Number(val)
  if (!Number.isFinite(n)) return 0
  // If within -1..1, interpret as probability delta (multiply by 100)
  return Math.abs(n) <= 1 ? n * 100 : n
}

function parseMaybeJsonArray(input: any): any[] {
  if (!input) return []
  if (Array.isArray(input)) return input
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

// Deterministic PRNG to avoid hydration mismatch (seeded by market id)
function hashStringToInt(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return function () {
    t += 0x6D2B79F5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

// In Next.js 16, params is async; unwrap with React.use()
export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  // Initial fallback state from mock
  const initial: UIMarket = {
    id,
    title: marketData["fed-decision-december"].title,
    category: marketData["fed-decision-december"].category,
    description: marketData["fed-decision-december"].description,
    volume: marketData["fed-decision-december"].volume,
    yesPrice: marketData["fed-decision-december"].yesPrice,
    noPrice: marketData["fed-decision-december"].noPrice,
    endDate: marketData["fed-decision-december"].endDate,
    liquidity: marketData["fed-decision-december"].liquidity,
    traders: null,
    image: marketData["fed-decision-december"].image,
    change24hPct: 0,
  }

  const [market, setMarket] = useState<UIMarket>(initial)
  const [loading, setLoading] = useState<boolean>(true)
  const { isWalletConnected, connect, walletAddress } = useWallet()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<"yes" | "no">("yes")
  const [amount, setAmount] = useState("")
  const [shares, setShares] = useState("")
  const [currency, setCurrency] = useState<"POLYLAB" | "USD">("POLYLAB")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customPercentage, setCustomPercentage] = useState("")
  const [availablePercentages, setAvailablePercentages] = useState([10, 25, 50, 75, 100])
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const { toast } = useToast()
  const { theme, toggleTheme } = useTheme()

  // Fetch live market data from REST_API_HOST/markets/:id
  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        setLoading(true)
        const base = normalizeBase(process.env.REST_API_HOST)
        if (!base) {
          // No env configured; remain on fallback
          return
        }
        const url = `${base}markets/${encodeURIComponent(id)}`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) return
        const json = await res.json()
        const m: any = Array.isArray(json)
          ? json[0]
          : Array.isArray(json?.data)
          ? json.data[0] ?? json.data
          : json
        if (!m) return

        // Prefer outcomes/outcomePrices if present
        const outcomes = parseMaybeJsonArray(m?.outcomes)
        const outcomePrices = parseMaybeJsonArray(m?.outcomePrices)
        const findIndex = (label: string) => outcomes.findIndex((o) => String(o).trim().toLowerCase() === label)
        const idxYes = findIndex("yes")
        const idxNo = findIndex("no")

        let yesPct: number | undefined
        let noPct: number | undefined
        if (idxYes >= 0 && idxYes < outcomePrices.length) yesPct = priceToPercent(outcomePrices[idxYes])
        if (idxNo >= 0 && idxNo < outcomePrices.length) noPct = priceToPercent(outcomePrices[idxNo])

        // Fallback to tokens
        if (typeof yesPct === "undefined" || typeof noPct === "undefined") {
          const tokens = Array.isArray(m?.tokens) ? m.tokens : []
          if (tokens.length >= 2 && typeof tokens[0]?.price !== "undefined" && typeof tokens[1]?.price !== "undefined") {
            yesPct = typeof yesPct === "undefined" ? priceToPercent(tokens[0].price) : yesPct
            noPct = typeof noPct === "undefined" ? priceToPercent(tokens[1].price) : noPct
          }
        }

        const yes = typeof m?.yesPrice === "number" ? m.yesPrice : typeof yesPct === "number" ? yesPct : priceToPercent(m?.pYes ?? m?.probYes ?? 0.5)
        const no = typeof m?.noPrice === "number" ? m.noPrice : typeof noPct === "number" ? noPct : Math.max(0, 100 - yes)

        // Numeric aggregates
        const volNum = Number(m?.volumeNum ?? m?.volumeClob ?? m?.volume ?? m?.events?.[0]?.volume ?? 0)
        const liqNum = Number(m?.liquidityNum ?? m?.liquidityClob ?? m?.liquidity ?? m?.events?.[0]?.liquidity ?? 0)
        const tradersNum = (m?.traders ?? m?.traderCount ?? m?.events?.[0]?.traders)

        const changePct = toPercentChange(m?.oneDayPriceChange ?? m?.change24h ?? m?.changePercent ?? 0)

        const ui: UIMarket = {
          id: String(m?.id ?? m?.slug ?? m?.marketId ?? m?.market_slug ?? id),
          title: String(m?.title ?? m?.question ?? m?.label ?? initial.title),
          category: String(m?.category?.label ?? m?.category ?? m?.tags?.[0] ?? initial.category),
          description: String(m?.description ?? initial.description ?? ""),
          volume: formatCurrencyShort(volNum),
          yesPrice: Math.max(0, Math.min(100, Number(yes) || 0)),
          noPrice: Math.max(0, Math.min(100, Number(no) || 0)),
          endDate: toShortDate(m?.endDate ?? m?.closeTime ?? m?.endTime ?? m?.resolutionTime ?? m?.end_date_iso),
          liquidity: formatCurrencyShort(liqNum),
          traders: Number.isFinite(Number(tradersNum)) ? Number(tradersNum) : null,
          image: m?.image ?? m?.icon ?? initial.image ?? null,
          change24hPct: Number(changePct.toFixed(1)),
        }
        if (!cancelled) setMarket(ui)
      } catch (err: any) {
        // Ignore abort-related errors (including custom reason from abort("unmount"))
        const msg = String(err?.message ?? err ?? "")
        const name = String((err && (err as any).name) || "")
        const isAbort =
          controller.signal.aborted ||
          name === "AbortError" ||
          msg === "unmount" ||
          msg.toLowerCase().includes("abort")

        if (!isAbort) {
          console.error("Failed to load market", err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => {
      cancelled = true
      // Abort fetch on unmount/param change; ignore errors downstream
      if (!controller.signal.aborted) {
        try {
          controller.abort("unmount")
        } catch {}
      }
    }
  }, [id])

  // Build a deterministic recent activity feed based on id
  const recentActivity = useMemo(() => {
    const seed = mulberry32(hashStringToInt(id))
    const items = Array.from({ length: 4 }).map((_, idx) => {
      // address-like string
      const addr = (seed().toString(36) + seed().toString(36)).replace(/[^a-z0-9]/gi, "").slice(2, 9)
      const minutes = Math.floor(seed() * 60)
      const side = seed() > 0.5 ? "YES" : "NO"
      const amount = Math.floor(seed() * 1000)
      return { key: idx, addr, minutes, side, amount }
    })
    return items
  }, [id])

  const walletBalance = 1000 // $POLYLAB tokens

  const handleConnectWallet = () => {
    setShowWalletModal(true)
  }

  const handleWalletSelect = async (walletName: string) => {
    await connect(walletName as any)
    toast({
      title: "Wallet Connected",
      description: `Successfully connected with ${walletName}`,
    })
  }

  const handleTrade = () => {
    if (!isWalletConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to place a trade.",
        variant: "destructive",
      })
      return
    }
    // Wallet connected: show waitlist confirmation modal (feature gated)
    setShowWaitlistModal(true)
    return
  }

  const calculateShares = (inputAmount: string) => {
    const price = selectedPosition === "yes" ? market.yesPrice : market.noPrice
    const calculatedShares = ((Number.parseFloat(inputAmount) / price) * 100).toFixed(2)
    return isNaN(Number.parseFloat(calculatedShares)) ? "0" : calculatedShares
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
    setShares(calculateShares(value))
  }

  const handlePercentageClick = (percentage: number) => {
    const calculatedAmount = ((walletBalance * percentage) / 100).toFixed(2)
    setAmount(calculatedAmount)
    setShares(calculateShares(calculatedAmount))
  }

  const handleAddCustomPercentage = () => {
    const percentage = Number.parseFloat(customPercentage)
    if (percentage > 0 && percentage <= 100 && !availablePercentages.includes(percentage)) {
      setAvailablePercentages([...availablePercentages, percentage].sort((a, b) => a - b))
      setCustomPercentage("")
      setShowCustomInput(false)
      toast({
        title: "Custom Percentage Added",
        description: `${percentage}% shortcut has been added.`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Wallet Connect Modal */}
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
        onWalletSelect={handleWalletSelect}
      />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src={
                theme === "dark"
                  ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/darkmode_logo-MbR7XnqXzSbFUqNW6qD2XLrZCVn2jv.png"
                  : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lightmnode_logo-1A7a0Am0y1qrrPyiU1md10dRxvST4x.png"
              }
              alt="PolyHub"
              className="h-8"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/markets" className="text-sm font-medium text-primary">
              Markets
            </Link>
            <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </Link>
            <Link href="/activity" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Activity
            </Link>
            {/* Deposit and Staking temporarily hidden */}
            {/* <Link href="/deposit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Deposit
            </Link>
            <Link href="/staking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Staking
            </Link> */}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button onClick={handleConnectWallet} variant={isWalletConnected ? "outline" : "default"} className="gap-2">
              <Wallet className="w-4 h-4" />
              {isWalletConnected && walletAddress
                ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </Button>
            <WalletStatus />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/markets"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Market Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{market.category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Ends {market.endDate}
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl text-balance leading-tight">{market.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 w-full overflow-hidden rounded-lg mb-6">
                  {loading ? (
                    <div className="w-full h-full bg-muted animate-pulse" />
                  ) : (
                    <img
                      src={market.image || "/placeholder.svg"}
                      alt={market.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{market.description}</p>
                )}
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Market Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      Volume
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {loading ? <span className="inline-block h-6 w-24 bg-muted animate-pulse rounded" /> : market.volume}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      Liquidity
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {loading ? <span className="inline-block h-6 w-20 bg-muted animate-pulse rounded" /> : market.liquidity}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Traders
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {loading ? (
                        <span className="inline-block h-6 w-12 bg-muted animate-pulse rounded" />
                      ) : market.traders !== null ? (
                        market.traders
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">24h Change</div>
                    <div className={`text-xl font-bold ${!loading && (market.change24hPct ?? 0) < 0 ? "text-red-500" : "text-primary"}`}>
                      {loading ? (
                        <span className="inline-block h-6 w-14 bg-muted animate-pulse rounded" />
                      ) : (
                        `${(market.change24hPct ?? 0) >= 0 ? "+" : ""}${Math.abs(market.change24hPct ?? 0).toFixed(1)}%`
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">0x{row.addr}</div>
                          <div className="text-xs text-muted-foreground">{row.minutes} minutes ago</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-foreground">{row.side}</div>
                        <div className="text-xs text-muted-foreground">${row.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Place Trade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Position Selector */}
                <Tabs value={selectedPosition} onValueChange={(v) => setSelectedPosition(v as "yes" | "no")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="yes" className="gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Yes
                    </TabsTrigger>
                    <TabsTrigger value="no" className="gap-2">
                      <TrendingDown className="w-4 h-4" />
                      No
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="yes" className="space-y-4 mt-6">
                    {/* Price Display */}
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                      <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                      <div className="text-3xl font-bold text-primary">{market.yesPrice}¢</div>
                      <div className="text-xs text-muted-foreground mt-1">per share</div>
                    </div>

                    {/* Currency Toggle */}
                    <div className="flex gap-2 p-1 bg-muted rounded-lg">
                      <Button
                        variant={currency === "POLYLAB" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setCurrency("POLYLAB")}
                      >
                        $POLYLAB
                      </Button>
                      <Button
                        variant={currency === "USD" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setCurrency("USD")}
                      >
                        USD
                      </Button>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Amount ({currency === "POLYLAB" ? "$POLYLAB" : "USD"})
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="text-lg"
                      />
                    </div>

                    {isWalletConnected && currency === "POLYLAB" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Quick Amount</label>
                        <div className="flex flex-wrap gap-2">
                          {availablePercentages.map((percentage) => (
                            <Button
                              key={percentage}
                              variant="outline"
                              size="sm"
                              onClick={() => handlePercentageClick(percentage)}
                              className="flex-1 min-w-[60px]"
                            >
                              {percentage}%
                            </Button>
                          ))}
                          {!showCustomInput ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowCustomInput(true)}
                              className="flex-1 min-w-[60px]"
                            >
                              Custom
                            </Button>
                          ) : (
                            <div className="flex gap-1 flex-1 min-w-[120px]">
                              <Input
                                type="number"
                                placeholder="%"
                                value={customPercentage}
                                onChange={(e) => setCustomPercentage(e.target.value)}
                                className="h-8 text-sm"
                                min="1"
                                max="100"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAddCustomPercentage}
                                className="h-8 px-2 bg-transparent"
                              >
                                +
                              </Button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Wallet Balance: {walletBalance} $POLYLAB</p>
                      </div>
                    )}

                    {/* Shares Display */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Shares</label>
                      <Input type="text" value={shares} readOnly className="text-lg bg-muted" />
                    </div>

                    {/* Potential Return */}
                    {amount && Number.parseFloat(amount) > 0 && (
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Potential Return</span>
                          <span className="text-lg font-bold text-foreground">
                            {(Number.parseFloat(shares) - Number.parseFloat(amount)).toFixed(2)}{" "}
                            {currency === "POLYLAB" ? "$POLYLAB" : "USD"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">ROI</span>
                          <span className="text-sm font-semibold text-primary">
                            {(
                              ((Number.parseFloat(shares) - Number.parseFloat(amount)) / Number.parseFloat(amount)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Trade Button */}
                    <Button onClick={handleTrade} className="w-full text-base py-6" size="lg">
                      Buy Yes
                    </Button>
                  </TabsContent>

                  <TabsContent value="no" className="space-y-4 mt-6">
                    {/* Price Display */}
                    <div className="bg-muted rounded-lg p-4 border border-border">
                      <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                      <div className="text-3xl font-bold text-foreground">{market.noPrice}¢</div>
                      <div className="text-xs text-muted-foreground mt-1">per share</div>
                    </div>

                    {/* Currency Toggle */}
                    <div className="flex gap-2 p-1 bg-muted rounded-lg">
                      <Button
                        variant={currency === "POLYLAB" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setCurrency("POLYLAB")}
                      >
                        $POLYLAB
                      </Button>
                      <Button
                        variant={currency === "USD" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setCurrency("USD")}
                      >
                        USD
                      </Button>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Amount ({currency === "POLYLAB" ? "$POLYLAB" : "USD"})
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="text-lg"
                      />
                    </div>

                    {isWalletConnected && currency === "POLYLAB" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Quick Amount</label>
                        <div className="flex flex-wrap gap-2">
                          {availablePercentages.map((percentage) => (
                            <Button
                              key={percentage}
                              variant="outline"
                              size="sm"
                              onClick={() => handlePercentageClick(percentage)}
                              className="flex-1 min-w-[60px]"
                            >
                              {percentage}%
                            </Button>
                          ))}
                          {!showCustomInput ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowCustomInput(true)}
                              className="flex-1 min-w-[60px]"
                            >
                              Custom
                            </Button>
                          ) : (
                            <div className="flex gap-1 flex-1 min-w-[120px]">
                              <Input
                                type="number"
                                placeholder="%"
                                value={customPercentage}
                                onChange={(e) => setCustomPercentage(e.target.value)}
                                className="h-8 text-sm"
                                min="1"
                                max="100"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAddCustomPercentage}
                                className="h-8 px-2 bg-transparent"
                              >
                                +
                              </Button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Wallet Balance: {walletBalance} $POLYLAB</p>
                      </div>
                    )}

                    {/* Shares Display */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Shares</label>
                      <Input type="text" value={shares} readOnly className="text-lg bg-muted" />
                    </div>

                    {/* Potential Return */}
                    {amount && Number.parseFloat(amount) > 0 && (
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Potential Return</span>
                          <span className="text-lg font-bold text-foreground">
                            {(Number.parseFloat(shares) - Number.parseFloat(amount)).toFixed(2)}{" "}
                            {currency === "POLYLAB" ? "$POLYLAB" : "USD"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">ROI</span>
                          <span className="text-sm font-semibold text-primary">
                            {(
                              ((Number.parseFloat(shares) - Number.parseFloat(amount)) / Number.parseFloat(amount)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Trade Button */}
                    <Button onClick={handleTrade} className="w-full text-base py-6" size="lg" variant="secondary">
                      Buy No
                    </Button>
                  </TabsContent>
                </Tabs>

                {/* Wallet Connection Notice */}
                {!isWalletConnected && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm text-foreground">
                    <p className="font-medium mb-2">Connect your wallet to trade</p>
                    <p className="text-muted-foreground text-xs">
                      You need $POLYLAB tokens in your wallet to execute trades.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Waitlist Confirmation Modal */}
      <Dialog open={showWaitlistModal} onOpenChange={setShowWaitlistModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Waitlist required</DialogTitle>
            <DialogDescription>
              Please join the waitlist before you can use this feature.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowWaitlistModal(false)}>Close</Button>
            <Button onClick={() => setShowWaitlistModal(false)}>Join Waitlist</Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <img
                  src={
                    theme === "dark"
                      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/darkmode_logo-MbR7XnqXzSbFUqNW6qD2XLrZCVn2jv.png"
                      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lightmnode_logo-1A7a0Am0y1qrrPyiU1md10dRxvST4x.png"
                  }
                  alt="PolyHub"
                  className="h-6"
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The world's largest decentralized prediction market platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Markets</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/markets"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Markets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/activity"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Activity
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Community</h4>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                >
                  <svg
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                >
                  <svg
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                >
                  <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <div className="text-center text-sm text-muted-foreground">© 2025 PolyHub. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
