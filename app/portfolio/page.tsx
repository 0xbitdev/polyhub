"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Target, Award, Plus, Copy, Check, ArrowRight, Wallet, Info, Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Input } from "@/components/ui/input"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/components/wallet-provider"

// Mock portfolio data
const positions = [
  {
    id: "1",
    market: "Will the Fed cut rates in December 2025?",
    position: "Yes",
    shares: 150,
    avgPrice: 0.67,
    currentPrice: 0.72,
    value: 108,
    profit: 7.5,
    status: "active",
  },
  {
    id: "2",
    market: "Will Bitcoin reach $100K by end of 2025?",
    position: "No",
    shares: 200,
    avgPrice: 0.55,
    currentPrice: 0.52,
    value: 104,
    profit: -6,
    status: "active",
  },
  {
    id: "3",
    market: "Who will win the 2024 Presidential Election?",
    position: "Yes",
    shares: 100,
    avgPrice: 0.48,
    currentPrice: 1.0,
    value: 100,
    profit: 52,
    status: "resolved",
  },
]

export default function PortfolioPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const { isWalletConnected, connectWallet } = useWallet()

  const depositAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
    setCopied(true)
    toast({
      title: "Address Copied",
      description: "Deposit address copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeposit = () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      })
      return
    }

    if (!depositAmount || Number(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Deposit Initiated",
      description: `Depositing ${depositAmount} SOL to your account`,
    })
    setIsAddFundsOpen(false)
    setDepositAmount("")
  }

  const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0)
  const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0)
  const activePositions = positions.filter((p) => p.status === "active")
  const resolvedPositions = positions.filter((p) => p.status === "resolved")

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"} pb-20 lg:pb-0`}>
        <DashboardHeader isCollapsed={isSidebarCollapsed} />

        <main className="p-4 md:p-6 lg:p-8">
          {!isWalletConnected ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Connect Your Wallet
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Connect your wallet to view your portfolio, track your positions, and manage your funds
              </p>
              <Button 
                onClick={connectWallet}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 gap-2 px-8 h-12 text-base font-semibold"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </Button>
              <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl w-full">
                <div className="p-4 rounded-xl bg-card border border-border/50">
                  <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-sm font-semibold text-foreground mb-1">Track Positions</div>
                  <div className="text-xs text-muted-foreground">Monitor all your active and resolved positions</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                  <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <div className="text-sm font-semibold text-foreground mb-1">View P&L</div>
                  <div className="text-xs text-muted-foreground">See your profits and losses in real-time</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                  <DollarSign className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                  <div className="text-sm font-semibold text-foreground mb-1">Manage Funds</div>
                  <div className="text-xs text-muted-foreground">Add or withdraw funds from your account</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Page header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    My Portfolio
                  </h1>
                  <p className="text-muted-foreground">Track your positions and performance</p>
                </div>
                <Button onClick={() => setIsAddFundsOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 gap-2">
                  <Plus className="w-4 h-4" />
                  Add Funds
                </Button>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 border-border/50 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Total Value</span>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-xl font-bold">${totalValue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Portfolio value</p>
                </Card>

                <Card className="p-4 border-border/50 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Total P&L</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      totalProfit >= 0 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-rose-500 to-red-500'
                    }`}>
                      {totalProfit >= 0 ? <TrendingUp className="w-4 h-4 text-white" /> : <TrendingDown className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${totalProfit >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {totalProfit >= 0 ? "+" : ""}${totalProfit.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Profit & Loss</p>
                </Card>

                <Card className="p-4 border-border/50 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Active Positions</span>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-xl font-bold">{activePositions.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Open markets</p>
                </Card>

                <Card className="p-4 border-border/50 bg-gradient-to-br from-amber-500/10 to-orange-500/5 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Win Rate</span>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-xl font-bold">
                    {resolvedPositions.length > 0 ? Math.round((resolvedPositions.filter(p => p.profit > 0).length / resolvedPositions.length) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Success rate</p>
                </Card>
              </div>

              {/* Positions tabs */}
              <Tabs defaultValue="active">
                <TabsList className="mb-6 bg-muted/50 rounded-xl">
                  <TabsTrigger value="active" className="rounded-lg">Active Positions</TabsTrigger>
                  <TabsTrigger value="resolved" className="rounded-lg">Resolved</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-3">
                  {activePositions.map((position) => (
                    <Card key={position.id} className="border-border/50 hover:border-blue-500/50 transition-all hover:shadow-lg bg-card/50">
                      <CardContent className="p-5">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-base">{position.market}</h3>
                              <Badge variant={position.position === "Yes" ? "default" : "secondary"} className="rounded-full">
                                {position.position}
                              </Badge>
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span><Target className="w-4 h-4 inline mr-1" />{position.shares} shares</span>
                              <span>Avg: ${position.avgPrice.toFixed(2)}</span>
                              <span>Current: ${position.currentPrice.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-center p-3 rounded-xl bg-muted/50">
                              <div className="text-xs text-muted-foreground">Value</div>
                              <div className="text-lg font-bold">${position.value.toFixed(2)}</div>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-muted/50">
                              <div className="text-xs text-muted-foreground">P&L</div>
                              <div className={`text-lg font-bold ${position.profit >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                                {position.profit >= 0 ? "+" : ""}${position.profit.toFixed(2)}
                              </div>
                            </div>
                            <Button variant="outline" className="rounded-xl">Sell</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="resolved" className="space-y-3">
                  {resolvedPositions.map((position) => (
                    <Card key={position.id} className="border-border/50 bg-card/50">
                      <CardContent className="p-5">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-base">{position.market}</h3>
                              <Badge className="rounded-full bg-emerald-500">Won</Badge>
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>Shares: {position.shares}</span>
                              <span>Avg: ${position.avgPrice.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="text-center p-3 rounded-xl bg-muted/50">
                              <div className="text-xs text-muted-foreground">Payout</div>
                              <div className="text-lg font-bold">${position.value.toFixed(2)}</div>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-emerald-500/10">
                              <div className="text-xs text-muted-foreground">Profit</div>
                              <div className="text-lg font-bold text-emerald-500">+${position.profit.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>

      <Drawer open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Add Funds
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="px-4 md:px-6 pb-6 space-y-6">
            {/* Deposit Address Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-base font-semibold text-foreground">Your Deposit Address</h3>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send SOL to this address from any wallet or exchange
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-muted/50 rounded-xl px-3 py-2.5 font-mono text-xs md:text-sm text-foreground break-all border border-border">
                  {depositAddress}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyAddress}
                  className="flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Quick Deposit Section */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">Quick Deposit</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Amount (SOL)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="text-lg h-12"
                  />
                  {isWalletConnected && <p className="text-xs text-muted-foreground mt-2">Available: 10.5 SOL</p>}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" onClick={() => setDepositAmount("1")} className="h-9">
                    1 SOL
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDepositAmount("5")} className="h-9">
                    5 SOL
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDepositAmount("10")} className="h-9">
                    10 SOL
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDepositAmount("25")} className="h-9">
                    25 SOL
                  </Button>
                </div>

                <Button
                  onClick={handleDeposit}
                  className="w-full h-12 text-base font-semibold gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                  disabled={!isWalletConnected || !depositAmount || Number(depositAmount) <= 0}
                >
                  {!isWalletConnected ? (
                    <>
                      <Wallet className="w-4 h-4" />
                      Connect Wallet to Deposit
                    </>
                  ) : (
                    <>
                      Deposit Now
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Network</div>
                <div className="text-sm font-semibold text-foreground">Solana</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border border-indigo-500/20">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-2">
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Min. Deposit</div>
                <div className="text-sm font-semibold text-foreground">0.1 SOL</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Processing</div>
                <div className="text-sm font-semibold text-foreground">~1 min</div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
