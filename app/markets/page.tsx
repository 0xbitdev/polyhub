"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Flame, Sparkles, Clock, BarChart3, ArrowUpRight, Grid3x3, List, ChevronLeft, ChevronRight } from 'lucide-react'
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { fetchGammaEvents, mapPolymarketToUi } from "@/lib/polymarket"
import { useMarket } from "@/context/market"
import { useRouter } from "next/navigation"

// No local fallback markets: data must come from API

// Mock data for sports events
const sportsEvents = [
  {
    id: "nfl-chiefs-bills",
    sport: "NFL",
    status: "LIVE",
    quarter: "Q3",
    volume: "$1.35M",
    homeTeam: { name: "Kansas City Chiefs", abbr: "KC", record: "8-2", logo: "🏈" },
    awayTeam: { name: "Buffalo Bills", abbr: "BUF", record: "7-3", logo: "🏈" },
    homeOdds: 48,
    awayOdds: 42,
    spread: "BUF -2.5",
    total: "O 48.5",
    priceChange: 5,
  },
  {
    id: "nba-lakers-celtics",
    sport: "NBA",
    status: "LIVE",
    quarter: "Q2",
    volume: "$892K",
    homeTeam: { name: "Los Angeles Lakers", abbr: "LAL", record: "12-8", logo: "🏀" },
    awayTeam: { name: "Boston Celtics", abbr: "BOS", record: "15-5", logo: "🏀" },
    homeOdds: 45,
    awayOdds: 52,
    spread: "BOS -3.5",
    total: "O 225.5",
    priceChange: -3,
  },
  {
    id: "nfl-49ers-seahawks",
    sport: "NFL",
    status: "UPCOMING",
    quarter: "12:00 PM",
    volume: "$2.1M",
    homeTeam: { name: "San Francisco 49ers", abbr: "SF", record: "6-4", logo: "🏈" },
    awayTeam: { name: "Seattle Seahawks", abbr: "SEA", record: "5-5", logo: "🏈" },
    homeOdds: 58,
    awayOdds: 42,
    spread: "SF -4.5",
    total: "O 44.5",
    priceChange: 8,
  },
  {
    id: "nba-warriors-suns",
    sport: "NBA",
    status: "UPCOMING",
    quarter: "7:30 PM",
    volume: "$1.2M",
    homeTeam: { name: "Golden State Warriors", abbr: "GSW", record: "10-10", logo: "🏀" },
    awayTeam: { name: "Phoenix Suns", abbr: "PHX", record: "11-9", logo: "🏀" },
    homeOdds: 52,
    awayOdds: 48,
    spread: "GSW -1.5",
    total: "O 230.5",
    priceChange: 2,
  },
  {
    id: "soccer-madrid-barca",
    sport: "Soccer",
    status: "LIVE",
    quarter: "65'",
    volume: "$3.5M",
    homeTeam: { name: "Real Madrid", abbr: "RMA", record: "18-2-1", logo: "⚽" },
    awayTeam: { name: "Barcelona", abbr: "BAR", record: "17-3-1", logo: "⚽" },
    homeOdds: 47,
    awayOdds: 53,
    spread: "Draw 25%",
    total: "O 2.5",
    priceChange: -2,
  },
  {
    id: "nhl-bruins-rangers",
    sport: "NHL",
    status: "LIVE",
    quarter: "P2",
    volume: "$645K",
    homeTeam: { name: "Boston Bruins", abbr: "BOS", record: "14-6-2", logo: "🏒" },
    awayTeam: { name: "New York Rangers", abbr: "NYR", record: "13-7-2", logo: "🏒" },
    homeOdds: 51,
    awayOdds: 49,
    spread: "BOS -0.5",
    total: "O 6.5",
    priceChange: 4,
  },
]

// No local dummy markets: always load from Polymarket index

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFilter, setSelectedFilter] = useState("Trending")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const sliderImages = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner1-lLoguxgmSpAJHP3qDV5CEDN5fl0Z98.png",
      title: "",
      subtitle: ""
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner2-GfcPvrgAuVCdCqZKpthvbONeweyZYf.png",
      title: "",
      subtitle: ""
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner3-gAISFWF9jUp4t8jsmdmp0Q11CQ8TbC.png",
      title: "",
      subtitle: ""
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [sliderImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const [apiCategories, setApiCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  const [apiMarkets, setApiMarkets] = useState<any[]>([]) // Primary source: Polymarket index
  const [marketsLoading, setMarketsLoading] = useState(true)

  const filteredMarkets = apiMarkets.filter((market) => {
    const matchesSearch =
      market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || market.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categoriesRef = useRef(null)
  const categoriesTriggeredRef = useRef(false)

  useEffect(() => {
    const el = categoriesRef.current
    if (!el) return

    let cancelled = false
    const triggerFetch = async () => {
      try {
        if (categoriesTriggeredRef.current) return
        categoriesTriggeredRef.current = true
        setCategoriesLoading(true)
        const res = await fetch("/api/categories")
        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)
        const data = await res.json()
        const list = Array.isArray(data) ? data : []
        if (!cancelled) setApiCategories(list)
      } catch (err) {
        console.error("Error loading categories:", err)
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          observer.disconnect()
          triggerFetch()
        }
      }, { rootMargin: "100px" })
      observer.observe(el)
      return () => {
        cancelled = true
        observer.disconnect()
      }
    }

    const idle = (window as any)?.requestIdleCallback as undefined | ((cb: () => void) => number)
    let idleId: number | undefined
    if (idle) {
      idleId = idle(() => triggerFetch()) as unknown as number
      return () => {
        cancelled = true
        if ((window as any)?.cancelIdleCallback && idleId) (window as any).cancelIdleCallback(idleId)
      }
    } else {
      const t = window.setTimeout(() => triggerFetch(), 300)
      return () => {
        cancelled = true
        window.clearTimeout(t)
      }
    }
  }, [])

  const categories = useMemo(() => ["All", ...apiCategories.map((c) => String(c.label))], [apiCategories])

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(async () => {
      try {
        setMarketsLoading(true)

        // Primary source: Polymarket Gamma API
        const pm = await fetchGammaEvents()
        let list = Array.isArray(pm) ? pm.map(mapPolymarketToUi) : []

        // Client-side search filtering (if query present)
        const q = searchQuery.trim().toLowerCase()
        if (q) {
          list = list.filter((m: any) => (String(m.title || "") + " " + String(m.category || "")).toLowerCase().includes(q))
        }

        if (!cancelled) setApiMarkets(list)
      } catch (err: any) {
        // Avoid noisy error output for expected network/CORS failures — warn instead
        console.warn("Error loading markets from Gamma API:", String(err?.message ?? err ?? ""))
        if (!cancelled) setApiMarkets([])
      } finally {
        if (!cancelled) setMarketsLoading(false)
      }
    }, 300)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [searchQuery])

  const { setSelectedMarket } = useMarket()
  const router = useRouter()

  const handleClickMarket = (market: any) => (e?: any) => {
    // store selected market in context and navigate
    try {
      setSelectedMarket(market)
    } catch {}
    // navigate
    router.push(`/markets/${market.id}`)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"} pb-20 lg:pb-0`}>
        <DashboardHeader isCollapsed={isSidebarCollapsed} />

        <main className="p-4 md:p-6 lg:p-8">
          {/* Layout horizontal dengan slider dan 2 card stats berjejer */}
          

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 md:p-6 mb-6 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-11 rounded-xl border-border/50 bg-background/50 focus:border-blue-500/50"
              />
            </div>

            <div className="flex items-center justify-between mt-5 mb-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedFilter === "Trending" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("Trending")}
                  size="sm"
                  className="rounded-full gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </Button>
                <Button
                  variant={selectedFilter === "Hot" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("Hot")}
                  size="sm"
                  className="rounded-full gap-2"
                >
                  <Flame className="w-4 h-4" />
                  Hot
                </Button>
                <Button
                  variant={selectedFilter === "New" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("New")}
                  size="sm"
                  className="rounded-full gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  New
                </Button>
                <Button
                  variant={selectedFilter === "Ending Soon" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("Ending Soon")}
                  size="sm"
                  className="rounded-full gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Ending Soon
                </Button>
              </div>

              <div className="hidden lg:flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-xl"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-xl"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div ref={categoriesRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categoriesLoading && (
                <Badge variant="secondary" className="rounded-full">Loading...</Badge>
              )}
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer whitespace-nowrap rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-7">
              {marketsLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <Card key={`skeleton-${i}`} className="overflow-hidden rounded-2xl">
                    <div className="relative h-40 w-full bg-muted animate-pulse" />
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-full bg-muted rounded animate-pulse" />
                    </CardContent>
                  </Card>
                ))}

              {!marketsLoading && filteredMarkets.map((market) => (
                <a key={market.id} onClick={handleClickMarket(market)} className="block">
                  <Card className="group overflow-hidden rounded-2xl border-border/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer h-full bg-card/50">
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={market.image || "/placeholder.svg?height=160&width=400"}
                        alt={market.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> 

                      {market.priceChange !== undefined && (
                        <Badge
                          className={`absolute top-2 right-2 backdrop-blur-sm rounded-full flex items-center gap-1 ${
                            market.priceChange >= 0
                              ? "bg-emerald-500/90 text-white"
                              : "bg-rose-500/90 text-white"
                          }`}
                        >
                          <ArrowUpRight className={`w-3 h-3 ${market.priceChange < 0 ? 'rotate-90' : ''}`} />
                          {Math.abs(market.priceChange)}%
                        </Badge>
                      )}

                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-white/90 text-xs">
                        <BarChart3 className="w-3 h-3" />
                        <span className="font-semibold">{market.volume}</span>
                        <span className="text-white/70">•</span>
                        <Clock className="w-3 h-3" />
                        <span className="text-white/70">{market.endDate}</span>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug mb-3 min-h-[2.5rem]">
                        {market.title}
                      </h3>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Yes {market.yesPrice}%</span>
                          <span>No {market.noPrice}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400"
                            style={{ width: `${market.yesPrice}%` }}
                          />
                          <div
                            className="bg-gradient-to-r from-rose-400 to-rose-500"
                            style={{ width: `${market.noPrice}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2 text-center">
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{market.yesPrice}¢</div>
                        </div>
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2 text-center">
                          <div className="text-xs text-rose-600 dark:text-rose-400 font-bold">{market.noPrice}¢</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {!marketsLoading && filteredMarkets.map((market) => (
                <a key={market.id} onClick={handleClickMarket(market)} className="block">
                  <Card className="group rounded-2xl border-border/50 hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer bg-card/50">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={market.image || "/placeholder.svg?height=80&width=96"}
                            alt={market.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <Badge variant="secondary" className="rounded-full mb-1 text-xs">
                                {market.category}
                              </Badge>
                              <h3 className="font-bold text-sm text-foreground line-clamp-2">
                                {market.title}
                              </h3>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">Volume</div>
                              <div className="text-sm font-bold">{market.volume}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}

          {!marketsLoading && filteredMarkets.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No markets found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
