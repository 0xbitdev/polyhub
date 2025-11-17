"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, DollarSign, Users, Info, Plus, X, ImageIcon, Wallet } from 'lucide-react'
import { useWallet } from "@/components/wallet-provider"

export default function CreateVotePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [outcomes, setOutcomes] = useState<string[]>(["Yes", "No"])
  const [newOutcome, setNewOutcome] = useState("")
  const { isWalletConnected, connectWallet } = useWallet()

  const addOutcome = () => {
    if (newOutcome.trim() && !outcomes.includes(newOutcome.trim())) {
      setOutcomes([...outcomes, newOutcome.trim()])
      setNewOutcome("")
    }
  }

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} pb-20 lg:pb-0`}>
        <DashboardHeader />
        
        {!isWalletConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Connect your wallet to create new prediction markets and participate in voting
            </p>
            <Button 
              onClick={connectWallet}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 gap-2 px-8 h-12 text-base font-semibold"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Create New Market
              </h1>
              <p className="text-muted-foreground">
                Create a prediction market for real-world events
              </p>
            </div>

            <div className="grid gap-6">
              {/* Market Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Market Details
                  </CardTitle>
                  <CardDescription>
                    Provide clear and specific information about your market
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Market Question</Label>
                    <Input 
                      id="title"
                      placeholder="e.g., Will Bitcoin reach $100,000 by December 2024?"
                      className="text-base"
                    />
                    <p className="text-xs text-muted-foreground">
                      Make it clear, specific, and verifiable
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Provide context and details about the market..."
                      className="min-h-[120px] text-base"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include resolution criteria and any important details
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select a category</option>
                      <option value="crypto">Crypto</option>
                      <option value="sports">Sports</option>
                      <option value="politics">Politics</option>
                      <option value="finance">Finance</option>
                      <option value="tech">Technology</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-0 my-5 my-5 my-0">
                    <Label htmlFor="image">Market Image (Optional)</Label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="flex-1">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                      <Button variant="ghost" size="icon">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground my-5 my-0">
                      Add a relevant image to make your market more engaging
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Outcomes Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Outcomes
                  </CardTitle>
                  <CardDescription>
                    Define the possible outcomes for this market
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          value={outcome}
                          onChange={(e) => {
                            const newOutcomes = [...outcomes]
                            newOutcomes[index] = e.target.value
                            setOutcomes(newOutcomes)
                          }}
                          className="flex-1"
                        />
                        {outcomes.length > 2 && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeOutcome(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <Input 
                      value={newOutcome}
                      onChange={(e) => setNewOutcome(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addOutcome()}
                      placeholder="Add custom outcome..."
                    />
                    <Button onClick={addOutcome} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground my-5 my-0">
                    Binary markets (Yes/No) are most common, but you can add more outcomes
                  </p>
                </CardContent>
              </Card>

              {/* Market Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Market Settings
                  </CardTitle>
                  <CardDescription>
                    Configure timing and liquidity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Market Closing Date</Label>
                      <Input 
                        id="endDate"
                        type="datetime-local"
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground">
                        When trading stops
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resolutionDate">Resolution Date</Label>
                      <Input 
                        id="resolutionDate"
                        type="datetime-local"
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground">
                        When the outcome is determined
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initialLiquidity">Initial Liquidity (SOL)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="initialLiquidity"
                        type="number"
                        placeholder="0.00"
                        className="pl-9 text-base"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add liquidity to enable trading (minimum 1 SOL recommended)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tradingFee">Trading Fee (%)</Label>
                    <Input 
                      id="tradingFee"
                      type="number"
                      placeholder="2"
                      defaultValue="2"
                      className="text-base"
                      step="0.1"
                      min="0"
                      max="10"
                    />
                    <p className="text-xs text-muted-foreground my-5 my-0">
                      Fee charged on each trade (2% is standard)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 items-stretch sm:items-center justify-between p-6 bg-card/50 backdrop-blur-xl rounded-xl border border-border/50">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-1">
                    <strong>Note:</strong> Markets are immutable once created
                  </p>
                  <p>Make sure all details are correct before publishing</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                    Cancel
                  </Button>
                  <Button 
                    size="lg"
                    className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    Create Market
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
