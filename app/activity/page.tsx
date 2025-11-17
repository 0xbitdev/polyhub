"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, ArrowDownRight, Filter, Search, ActivityIcon, ShoppingBag } from 'lucide-react'
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock activity data
const activities = [
  {
    id: "1",
    type: "buy",
    market: "Will the Fed cut rates in December 2025?",
    marketId: "fed-decision-december",
    position: "Yes",
    shares: 150,
    price: 0.67,
    total: 100.5,
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    type: "sell",
    market: "Will Bitcoin reach $100K by end of 2025?",
    marketId: "bitcoin-100k",
    position: "No",
    shares: 50,
    price: 0.52,
    total: 26,
    timestamp: "5 hours ago",
    status: "completed",
  },
  {
    id: "3",
    type: "buy",
    market: "Will there be a major AI breakthrough in 2025?",
    marketId: "ai-breakthrough",
    position: "Yes",
    shares: 200,
    price: 0.72,
    total: 144,
    timestamp: "1 day ago",
    status: "completed",
  },
  {
    id: "4",
    type: "sell",
    market: "Who will win the 2025 Presidential Election?",
    marketId: "election-2025",
    position: "Yes",
    shares: 100,
    price: 1.0,
    total: 100,
    timestamp: "2 days ago",
    status: "completed",
  },
  {
    id: "5",
    type: "buy",
    market: "Will SpaceX successfully land on Mars in 2025?",
    marketId: "space-mission",
    position: "No",
    shares: 300,
    price: 0.77,
    total: 231,
    timestamp: "3 days ago",
    status: "completed",
  },
  {
    id: "6",
    type: "buy",
    market: "Will global emissions decrease by 10% in 2025?",
    marketId: "climate-target",
    position: "Yes",
    shares: 120,
    price: 0.38,
    total: 45.6,
    timestamp: "4 days ago",
    status: "pending",
  },
]

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredActivities = activities.filter((activity) => {
    const tabMatch =
      activeTab === "all" ||
      (activeTab === "buys" && activity.type === "buy") ||
      (activeTab === "sells" && activity.type === "sell")
    const searchMatch = activity.market.toLowerCase().includes(searchTerm.toLowerCase())
    return tabMatch && searchMatch
  })

  const totalVolume = activities.reduce((sum, activity) => sum + activity.total, 0)
  const totalTrades = activities.length
  const buyCount = activities.filter((a) => a.type === "buy").length
  const sellCount = activities.filter((a) => a.type === "sell").length

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 w-full overflow-x-hidden ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"} pb-20 lg:pb-0`}>
        <DashboardHeader isCollapsed={isSidebarCollapsed} />

        <main className="p-4 md:p-6 lg:p-8 max-w-full">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  Market Activity
                </h1>
                <p className="text-sm text-muted-foreground">Complete history of your transactions</p>
              </div>
              <div className="flex gap-2">
                <div className="text-center p-2 rounded-lg bg-card border border-border">
                  <div className="text-base font-bold">{totalTrades}</div>
                  <div className="text-xs text-muted-foreground">Trades</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-base font-bold text-emerald-500">{buyCount}</div>
                  <div className="text-xs text-muted-foreground">Buys</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <div className="text-base font-bold text-rose-500">{sellCount}</div>
                  <div className="text-xs text-muted-foreground">Sells</div>
                </div>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 rounded-lg border-border/50 bg-card/50 text-sm"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-muted/50 rounded-lg">
                <TabsTrigger value="all" className="rounded-md text-sm">All</TabsTrigger>
                <TabsTrigger value="buys" className="rounded-md text-sm">Buys</TabsTrigger>
                <TabsTrigger value="sells" className="rounded-md text-sm">Sells</TabsTrigger>
              </TabsList>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 rounded-lg text-sm"
                onClick={() => {
                  console.log("[v0] Filter button clicked")
                  setShowFilters(!showFilters)
                }}
              >
                <Filter className="w-3 h-3" />
                Filters
              </Button>
            </div>

            <TabsContent value={activeTab} className="space-y-0 border border-border/50 rounded-lg bg-card/50 overflow-hidden">
              {filteredActivities.map((activity, index) => (
                <Link key={activity.id} href={`/markets/${activity.marketId}`}>
                  <div className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
                    index !== filteredActivities.length - 1 ? "border-b border-border/50" : ""
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "buy" 
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500" 
                          : "bg-gradient-to-br from-rose-500 to-red-500"
                      }`}>
                        {activity.type === "buy" ? (
                          <ArrowDownRight className="w-4 h-4 text-white" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                              <Badge className={`rounded-full text-xs px-2 py-0 ${
                                activity.type === "buy"
                                  ? "bg-emerald-500 text-white"
                                  : "bg-rose-500 text-white"
                              }`}>
                                {activity.type.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="rounded-full text-xs px-2 py-0">
                                {activity.position}
                              </Badge>
                              {activity.status === "pending" && (
                                <Badge className="rounded-full bg-amber-500 text-xs px-2 py-0">Pending</Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-sm line-clamp-2">{activity.market}</h3>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-base font-bold">${activity.total.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                          </div>
                        </div>

                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <span>Shares: <span className="font-semibold text-foreground">{activity.shares}</span></span>
                          <span>Price: <span className="font-semibold text-foreground">${activity.price.toFixed(2)}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <ActivityIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-bold mb-1">No activity found</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {searchTerm ? `No transactions match "${searchTerm}"` : "Start trading to see your activity"}
                  </p>
                  {!searchTerm && (
                    <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <Link href="/markets">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Explore Markets
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
