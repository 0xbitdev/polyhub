"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check, ArrowRight, Info, Wallet, TrendingUp, Clock } from 'lucide-react'
import { useWallet } from "@/components/wallet-provider"
import { useToast } from "@/hooks/use-toast"

export default function DepositPage() {
  const { isWalletConnected, walletAddress } = useWallet()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState("")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

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

    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Deposit Initiated",
      description: `Depositing ${amount} SOL to your account`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className={`${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"} pb-20 lg:pb-0`}>
        <DashboardHeader isCollapsed={isSidebarCollapsed} />
        
        <main className="p-4 md:p-6 lg:p-8">
          <div className="max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Add Funds
              </h1>
              <p className="text-muted-foreground">Deposit SOL to your PolyHub account to start trading</p>
            </div>

            {/* Main Deposit Card */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                {/* Deposit Address Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-lg font-semibold text-foreground">Your Deposit Address</h2>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send SOL to this address from any wallet or exchange
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-muted/50 rounded-xl px-4 py-3 font-mono text-sm text-foreground break-all border border-border">
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
                  <h2 className="text-lg font-semibold text-foreground mb-4">Quick Deposit</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Amount (SOL)</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-xl h-14"
                      />
                      {isWalletConnected && <p className="text-xs text-muted-foreground mt-2">Available: 10.5 SOL</p>}
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setAmount("1")} className="h-10">
                        1 SOL
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setAmount("5")} className="h-10">
                        5 SOL
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setAmount("10")} className="h-10">
                        10 SOL
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setAmount("25")} className="h-10">
                        25 SOL
                      </Button>
                    </div>

                    <Button
                      onClick={handleDeposit}
                      className="w-full h-12 text-base font-semibold gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                      disabled={!isWalletConnected || !amount || Number(amount) <= 0}
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
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Network</div>
                  <div className="font-semibold text-foreground">Solana</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-500/20">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Min. Deposit</div>
                  <div className="font-semibold text-foreground">0.1 SOL</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Processing</div>
                  <div className="font-semibold text-foreground">~1 minute</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
