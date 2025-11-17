"use client"

import { useState } from "react"
import { useWallet } from "@/components/wallet-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"

export function WalletStatus() {
  const { isWalletConnected, solBalance, refreshBalance } = useWallet()
  const [loading, setLoading] = useState(false)

  if (!isWalletConnected) return null

  const handleRefresh = async () => {
    try {
      setLoading(true)
      await refreshBalance()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary">SOL: {solBalance !== null ? solBalance.toFixed(4) : "—"}</Badge>
      <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={loading} aria-label="Refresh balance">
        <RotateCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      </Button>
    </div>
  )
}
