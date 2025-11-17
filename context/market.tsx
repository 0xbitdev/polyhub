"use client"

import React, { createContext, useContext, useState } from "react"

type MarketContextType = {
  selectedMarket: any | null
  setSelectedMarket: (m: any | null) => void
  clearSelectedMarket: () => void
}

const MarketContext = createContext<MarketContextType | undefined>(undefined)

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [selectedMarket, setSelected] = useState<any | null>(null)

  const setSelectedMarket = (m: any | null) => setSelected(m)
  const clearSelectedMarket = () => setSelected(null)

  return (
    <MarketContext.Provider value={{ selectedMarket, setSelectedMarket, clearSelectedMarket }}>
      {children}
    </MarketContext.Provider>
  )
}

export function useMarket() {
  const ctx = useContext(MarketContext)
  if (!ctx) throw new Error("useMarket must be used within MarketProvider")
  return ctx
}
