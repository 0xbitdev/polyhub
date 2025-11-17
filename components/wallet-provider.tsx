"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { toast } from "@/hooks/use-toast"

type WalletType = "phantom" | "solflare" | "metamask"

interface WalletContextType {
  isWalletConnected: boolean
  walletAddress: string | null
  walletName: WalletType | null
  solBalance: number | null
  connect: (type: WalletType) => Promise<void>
  disconnectWallet: () => void
  refreshBalance: () => Promise<void>
}

declare global {
  interface Window {
    solana?: any
    solflare?: any
    ethereum?: any
  }
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [walletName, setWalletName] = useState<WalletType | null>(null)
  const [solBalance, setSolBalance] = useState<number | null>(null)

  // Use official Solana mainnet RPC directly
  const connection = useMemo(() => new Connection("https://api.mainnet-beta.solana.com", "confirmed"), [])

  const fetchBalance = async (address: string) => {
    // First try server route (still official RPC), avoids browser-origin 403
    try {
      const res = await fetch("/api/solana/balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      })
      if (res.ok) {
        const data = (await res.json()) as { lamports: number }
        setSolBalance(data.lamports / LAMPORTS_PER_SOL)
        return
      }
      // If server route returns 403/502, fall through to client attempt as a backup
    } catch (e) {
      // ignore and try client-side as fallback
    }

    // Fallback to client-side web3 call
    try {
      const lamports = await connection.getBalance(new PublicKey(address))
      setSolBalance(lamports / LAMPORTS_PER_SOL)
    } catch (err: any) {
      console.error("Failed to fetch SOL balance:", err)
      setSolBalance(null)
      const msg = String(err?.message || "")
      const is403 = msg.includes("403") || msg.toLowerCase().includes("forbidden")
      toast({
        title: "Gagal mengambil saldo",
        description: is403
          ? "Akses RPC resmi Solana ditolak (403). Silakan coba lagi nanti."
          : "Tidak dapat mengambil saldo SOL saat ini.",
        variant: "destructive",
      })
    }
  }

  const connect = async (type: WalletType) => {
    try {
      if (type === "phantom") {
        const provider = window?.solana
        if (!provider?.isPhantom) {
          toast({
            title: "Phantom tidak ditemukan",
            description: "Silakan install Phantom Wallet terlebih dahulu.",
            variant: "destructive",
          })
          return
        }
        const res = await provider.connect({ onlyIfTrusted: false })
        const pubkey: string = (res?.publicKey || provider.publicKey)?.toString()
        if (!pubkey) throw new Error("NO_PUBLIC_KEY")
        setIsWalletConnected(true)
        setWalletAddress(pubkey)
        setWalletName("phantom")
        await fetchBalance(pubkey)
        return
      }

      if (type === "solflare") {
        const provider = window?.solflare
        if (!provider?.isSolflare) {
          toast({
            title: "Solflare tidak ditemukan",
            description: "Silakan install Solflare Wallet terlebih dahulu.",
            variant: "destructive",
          })
          return
        }
        const res = await provider.connect()
        const pubkey: string = (res?.publicKey || provider.publicKey)?.toString()
        if (!pubkey) throw new Error("NO_PUBLIC_KEY")
        setIsWalletConnected(true)
        setWalletAddress(pubkey)
        setWalletName("solflare")
        await fetchBalance(pubkey)
        return
      }

      if (type === "metamask") {
        const eth = window?.ethereum
        if (!eth?.isMetaMask) {
          toast({
            title: "MetaMask tidak ditemukan",
            description: "Silakan install MetaMask terlebih dahulu.",
            variant: "destructive",
          })
          return
        }

        // Try to trigger Solana Snap install if SNAP_ID is configured
        const SNAP_ID = process.env.NEXT_PUBLIC_SOLANA_SNAP_ID // e.g., 'npm:@solana/snap'
        if (!SNAP_ID) {
          toast({
            title: "Butuh MetaMask Snap",
            description:
              "Konfigurasi NEXT_PUBLIC_SOLANA_SNAP_ID untuk meminta Snap Solana via MetaMask, lalu coba lagi.",
            variant: "destructive",
          })
          // Still bring up MetaMask to show something
          try {
            await eth.request({ method: "eth_requestAccounts" })
          } catch {}
          return
        }

        try {
          await eth.request({
            method: "wallet_requestSnaps",
            params: { [SNAP_ID]: {} },
          })
          toast({
            title: "Meminta Snap Solana",
            description: "Lihat jendela MetaMask untuk melanjutkan instalasi Snap.",
          })
        } catch (e: any) {
          const msg = typeof e?.message === "string" ? e.message : ""
          toast({
            title: "Gagal meminta Snap",
            description: msg || "Tidak dapat memulai instalasi Snap.",
            variant: "destructive",
          })
        }
        return
      }
    } catch (err: any) {
      // Handle user cancellation and other errors
      const msg = typeof err?.message === "string" ? err.message : ""
      const code = err?.code ?? err?.error?.code
      if (code === 4001 || msg.includes("User rejected") || msg.toLowerCase().includes("cancel")) {
        toast({
          title: "Koneksi dibatalkan",
          description: "Anda membatalkan permintaan koneksi wallet.",
          variant: "destructive",
        })
      } else {
        console.error("Wallet connect error:", err)
        toast({
          title: "Gagal menghubungkan wallet",
          description: msg || "Terjadi kesalahan saat menghubungkan wallet.",
          variant: "destructive",
        })
      }
      // Ensure no partial state left
      setIsWalletConnected(false)
      setWalletAddress(null)
      setWalletName(null)
      setSolBalance(null)
    }
  }

  const disconnectWallet = () => {
    try {
      // Try to disconnect providers if available
      if (walletName === "phantom" && window?.solana?.isPhantom && window?.solana?.disconnect) {
        window.solana.disconnect()
      }
      if (walletName === "solflare" && window?.solflare?.isSolflare && window?.solflare?.disconnect) {
        window.solflare.disconnect()
      }
    } catch (e) {
      // ignore
    }
    setIsWalletConnected(false)
    setWalletAddress(null)
    setWalletName(null)
    setSolBalance(null)
  }

  const refreshBalance = async () => {
    if (walletAddress) {
      await fetchBalance(walletAddress)
    }
  }

  return (
    <WalletContext.Provider
      value={{ isWalletConnected, walletAddress, walletName, solBalance, connect, disconnectWallet, refreshBalance }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
