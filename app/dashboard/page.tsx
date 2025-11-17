"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Wallet, Activity, DollarSign, ArrowUpRight, ArrowDownRight, Clock, Users, Zap, Plus, Send, Download, BarChart3 } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  // Mock data
  const accountBalance = 1234.56
  const totalPositions = 8
  const activeMarkets = 12
  const winRate = 68.5

  const recentActivity = [
    { id: 1, type: "buy", market: "Will Bitcoin reach $100k in 2024?", amount: 50, time: "2 hours ago", profit: null },
    { id: 2, type: "sell", market: "US Presidential Election 2024", amount: 120, time: "5 hours ago", profit: 25.50 },
    { id: 3, type: "buy", market: "SpaceX Mars Mission Success", amount: 75, time: "1 day ago", profit: null },
    { id: 4, type: "sell", market: "Apple Stock > $200 by Q4", amount: 200, time: "2 days ago", profit: -15.30 },
  ]

  const trendingMarkets = [
    { 
      id: 1, 
      title: "Will Bitcoin reach $100k in 2024?", 
      volume: "$2.5M", 
      participants: 1234,
      yesPrice: 67,
      noPrice: 33,
      trend: "up"
    },
    { 
      id: 2, 
      title: "US Presidential Election 2024", 
      volume: "$5.8M", 
      participants: 3421,
      yesPrice: 52,
      noPrice: 48,
      trend: "up"
    },
    { 
      id: 3, 
      title: "SpaceX Mars Mission Success", 
      volume: "$1.2M", 
      participants: 892,
      yesPrice: 45,
      noPrice: 55,
      trend: "down"
    },
  ]

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className={`${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"} pb-20 lg:pb-0`}>
        <DashboardHeader isCollapsed={isSidebarCollapsed} />
        
        <main className="p-4 md:p-6 lg:p-8 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground">Here's your trading overview and latest activities</p>
          </div>

          {/* Account Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-emerald-500 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +12.5%
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Account Balance</p>
                <p className="text-xl font-bold">${accountBalance.toFixed(2)}</p>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Positions</p>
                <p className="text-xl font-bold">{totalPositions}</p>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Active Markets</p>
                <p className="text-xl font-bold">{activeMarkets}</p>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-emerald-500 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +5.2%
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <p className="text-xl font-bold">{winRate}%</p>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30">
                <Plus className="w-5 h-5" />
                <span className="text-sm">New Position</span>
              </Button>
              <Link href="/deposit" className="w-full">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 border-blue-500/30 hover:bg-blue-500/10">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Deposit</span>
                </Button>
              </Link>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-indigo-500/30 hover:bg-indigo-500/10">
                <Send className="w-5 h-5" />
                <span className="text-sm">Withdraw</span>
              </Button>
              <Link href="/markets" className="w-full">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 border-purple-500/30 hover:bg-purple-500/10">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm">Browse Markets</span>
                </Button>
              </Link>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === 'buy' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {activity.type === 'buy' ? (
                        <ArrowDownRight className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-1 truncate">{activity.market}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {activity.amount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </span>
                      </div>
                    </div>
                    {activity.profit !== null && (
                      <div className={`text-sm font-semibold ${
                        activity.profit > 0 ? 'text-emerald-500' : 'text-rose-500'
                      }`}>
                        {activity.profit > 0 ? '+' : ''}{activity.profit}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link href="/activity">
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </Link>
            </Card>

            {/* Trending Markets */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Trending Now
              </h2>
              <div className="space-y-3">
                {trendingMarkets.map((market) => (
                  <Link 
                    key={market.id}
                    href={`/markets/${market.id}`}
                    className="block p-4 rounded-xl border border-border/50 hover:bg-muted/30 hover:border-blue-500/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {market.title}
                      </h3>
                      {market.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-2" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-rose-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {market.participants.toLocaleString()}
                      </span>
                      <span className="font-semibold text-blue-600">{market.volume}</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-center">
                        <span className="text-xs font-semibold text-emerald-600">{market.yesPrice}%</span>
                      </div>
                      <div className="flex-1 px-2 py-1 rounded-lg bg-rose-500/10 text-center">
                        <span className="text-xs font-semibold text-rose-600">{market.noPrice}%</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/markets">
                <Button variant="outline" className="w-full mt-4">
                  View All Markets
                </Button>
              </Link>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
