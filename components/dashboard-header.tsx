"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, Wallet, Bell } from 'lucide-react'
import { useTheme } from "@/components/theme-provider"
import { useWallet } from "@/components/wallet-provider"
import { WalletStatus } from "@/components/wallet-status"
import { useState } from "react"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface DashboardHeaderProps {
  isCollapsed?: boolean
}

export function DashboardHeader({ isCollapsed = false }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { isWalletConnected, connect, walletAddress } = useWallet()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { toast } = useToast()

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

  return (
    <>
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
        onWalletSelect={handleWalletSelect}
      />
      
      <header className="sticky top-0 z-30 bg-card/50 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="lg:hidden flex items-center gap-2">
              <Image
                src="/images/design-mode/logo_darkmode(1).png"
                alt="PolyHub"
                width={120}
                height={32}
                className="h-7 w-auto"
              />
            </div>
            
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl relative text-muted-foreground hover:text-foreground hover:bg-accent">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs border-2 border-card">
                3
              </Badge>
            </Button>
            
            
            <Button 
              onClick={handleConnectWallet} 
              variant={isWalletConnected ? "outline" : "default"}
              className={
                isWalletConnected 
                  ? "gap-2 rounded-xl border-border text-foreground hover:bg-accent hover:text-foreground" 
                  : "gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              }
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isWalletConnected && walletAddress
                  ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                  : "Connect"}
              </span>
            </Button>
            
            <WalletStatus />
          </div>
        </div>
      </header>
    </>
  )
}
