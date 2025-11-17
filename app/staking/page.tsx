"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Moon, Sun, Lock, TrendingUp, Clock } from 'lucide-react'
import { useTheme } from "@/components/theme-provider"
import { useWallet } from "@/components/wallet-provider"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useToast } from "@/hooks/use-toast"
import { WalletStatus } from "@/components/wallet-status"

const stakingPools = [
  {
    id: "flexible",
    name: "Flexible",
    apy: "8%",
    lockPeriod: "None",
  },
  {
    id: "30days",
    name: "30 Days",
    apy: "12%",
    lockPeriod: "30 Days",
  },
  {
    id: "90days",
    name: "90 Days",
    apy: "18%",
    lockPeriod: "90 Days",
  },
]

export default function StakingPage() {
  const { isWalletConnected, connect, walletAddress } = useWallet()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()

  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedPool, setSelectedPool] = useState(stakingPools[0])

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

  const handleStake = () => {
    toast({
      title: "Coming Soon",
      description: "Staking feature is under development",
    })
  }

  const estimatedRewards =
    stakeAmount && !isNaN(Number(stakeAmount))
      ? (Number(stakeAmount) * (Number.parseFloat(selectedPool.apy) / 100)).toFixed(2)
      : "0"

  return (
    <div className="min-h-screen bg-background">
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
            <Link href="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
            <Link href="/staking" className="text-sm font-medium text-primary">
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
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Stake $POLYLAB</h1>
            <p className="text-muted-foreground">Earn rewards by staking your POLYLAB tokens</p>
          </div>

          {/* Stats Cards */}
          {isWalletConnected && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">2,500</div>
                  <div className="text-xs text-muted-foreground mt-1">Staked</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-500">+125</div>
                  <div className="text-xs text-muted-foreground mt-1">Rewards</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">15d</div>
                  <div className="text-xs text-muted-foreground mt-1">Remaining</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stake Form */}
          <Card>
            <CardHeader>
              <CardTitle>Stake Your Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pool Selection */}
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Select Pool</label>
                <div className="grid grid-cols-3 gap-3">
                  {stakingPools.map((pool) => (
                    <button
                      key={pool.id}
                      onClick={() => setSelectedPool(pool)}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        selectedPool.id === pool.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold text-foreground mb-1">{pool.name}</div>
                      <div className="text-2xl font-bold text-primary mb-1">{pool.apy}</div>
                      <div className="text-xs text-muted-foreground">{pool.lockPeriod}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Amount</label>
                  {isWalletConnected && <span className="text-xs text-muted-foreground">Available: 5,000 POLYLAB</span>}
                </div>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="text-2xl h-16"
                />
              </div>

              {/* Estimated Rewards */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Estimated Annual Rewards</span>
                  <span className="text-lg font-bold text-primary">{estimatedRewards} POLYLAB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lock Period</span>
                  <span className="text-sm font-semibold text-foreground">{selectedPool.lockPeriod}</span>
                </div>
              </div>

              {/* Stake Button */}
              <Button
                onClick={handleStake}
                className="w-full h-14 text-lg font-semibold"
                disabled={!isWalletConnected || !stakeAmount || Number(stakeAmount) <= 0}
              >
                {!isWalletConnected ? "Connect Wallet" : "Stake Now"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Staking feature is currently under development
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
