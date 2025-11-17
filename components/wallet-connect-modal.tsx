"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Wallet, Sparkles, Shield, Zap } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect } from "react"

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWalletSelect: (walletName: string) => void
}

export function WalletConnectModal({ open, onOpenChange, onWalletSelect }: WalletConnectModalProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const wallets = [
    {
      name: "phantom",
      label: "Phantom",
      description: "Most popular Solana wallet",
      icon: "/phantom.png",
      badge: "Recommended"
    },
    {
      name: "solflare",
      label: "Solflare",
      description: "Secure Solana wallet",
      icon: "/solflare.png"
    },
    {
      name: "metamask",
      label: "MetaMask",
      description: "Requires Solana Snap",
      icon: "/metamask.png"
    }
  ]

  const content = (
    <>
      {/* header is rendered by DialogHeader / DrawerHeader for accessibility */}

      <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/10">
        <div className="flex flex-col items-center text-center gap-1">
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="text-xs text-muted-foreground">Secure</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1">
          <Zap className="w-5 h-5 text-blue-500" />
          <span className="text-xs text-muted-foreground">Fast</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <span className="text-xs text-muted-foreground">Easy</span>
        </div>
      </div>

      <div className="space-y-3">
        {wallets.map((wallet) => (
          <Button
            key={wallet.name}
            variant="outline"
            className="w-full h-auto py-4 justify-start gap-4 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-indigo-500/10 hover:border-blue-500/30 transition-all group relative overflow-hidden"
            onClick={() => {
              onOpenChange(false)
              onWalletSelect(wallet.name)
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.label} width={32} height={32} className="rounded-lg" />
            </div>
            <div className="flex flex-col items-start flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">{wallet.label}</span>
                {wallet.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    {wallet.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{wallet.description}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all" />
          </Button>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground mt-6">
        By connecting a wallet, you agree to our Terms of Service
      </p>
    </>
  )

  // Mobile: Bottom Sheet
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <DrawerTitle>Connect Wallet</DrawerTitle>
                <p className="text-sm text-muted-foreground">Choose your preferred wallet to continue</p>
              </div>
            </div>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  // Desktop: Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle>Connect Wallet</DialogTitle>
              <p className="text-sm text-muted-foreground">Choose your preferred wallet to continue</p>
            </div>
          </div>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
