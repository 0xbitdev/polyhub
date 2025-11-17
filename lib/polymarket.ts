export type PolymarketIndex = any

function safeGet(obj: any, path: (string | number)[]) {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

/**
 * Fetch Polymarket index.json and extract markets array.
 * The structure targeted is:
 *  root.props.pageProps.dehydratedState.queries[].state.data.pages[].events[].markets[]
 */
export async function fetchPolymarketMarkets(indexUrl = "https://polymarket.com/_next/data/2HN46DhElo-W6o1CF7m5u/index.json") {
  try {
    const res = await fetch(indexUrl)
    if (!res.ok) return []
    const json = await res.json()

    const queries = safeGet(json, ["props", "pageProps", "dehydratedState", "queries"]) || []
    const markets: any[] = []

    for (const q of queries) {
      const state = q && q.state
      const data = state && state.data
      const pages = Array.isArray(data?.pages) ? data.pages : []
      for (const page of pages) {
        const events = Array.isArray(page?.events) ? page.events : []
        for (const ev of events) {
          const evMarkets = Array.isArray(ev?.markets) ? ev.markets : []
          for (const m of evMarkets) {
            markets.push(m)
          }
        }
      }
    }

    return markets
  } catch (err) {
    console.error("Failed to fetch polymarket index", err)
    return []
  }
}

/**
 * Fetch events/markets from Polymarket Gamma API pagination endpoint.
 * Default URL provided by the user.
 * Returns an array of market-like objects.
 */
export async function fetchGammaEvents(url = "/api/gamma-events") {
  // Call local proxy route from browser. If running server-side, return []
  if (typeof window === "undefined") return []

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 7000)
    let res: Response
    try {
      res = await fetch(url, { signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }

    if (!res || !res.ok) {
      console.warn("fetchGammaEvents: non-ok response", res?.status)
      return []
    }

    const json = await res.json()
    // Expect the proxy to already return an array of market-like objects
    return Array.isArray(json) ? json : []
  } catch (err: any) {
    console.warn("fetchGammaEvents failed:", String(err?.message ?? err ?? ""))
    return []
  }
}

// Map a Polymarket market object to the minimal UI shape used by the app
export function mapPolymarketToUi(m: any) {
  const id = String(m?.id ?? m?.slug ?? m?.marketId ?? m?.market_slug ?? m?._id ?? m?.hash ?? "").trim()
  const title = String(m?.title ?? m?.question ?? m?.label ?? "").trim()
  const category = String(m?.category?.label ?? m?.category ?? (m?.tags && m.tags[0]) ?? "Other")
  const image = m?.image ?? m?.icon ?? null
  // volume: try known fields
  const vol = m?.volumeNum ?? m?.volume ?? m?.events?.[0]?.volume ?? null
  const volume = typeof vol === "number" ? `$${(vol).toLocaleString()}` : typeof vol === "string" ? vol : "$0"

  const rawEnd = m?.closeTime ?? m?.endDate ?? m?.endTime ?? m?.resolutionTime ?? m?.end_date_iso ?? null
  let endDate: string | null = null
  try {
    if (rawEnd) {
      const d = new Date(rawEnd)
      if (!isNaN(d.getTime())) endDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      else endDate = String(rawEnd)
    }
  } catch {
    endDate = rawEnd ? String(rawEnd) : null
  }

  // Prices: pYes/pNo are probabilities in 0..1 on Polymarket
  const yesPrice = typeof m?.pYes === "number" ? Math.round(m.pYes * 100) : typeof m?.yesPrice === "number" ? Math.round(m.yesPrice) : undefined
  const noPrice = typeof m?.pNo === "number" ? Math.round(m.pNo * 100) : typeof m?.noPrice === "number" ? Math.round(m.noPrice) : (typeof yesPrice === "number" ? Math.max(0, 100 - yesPrice) : undefined)

  const liquidity = m?.liquidityNum ?? m?.liquidity ?? m?.events?.[0]?.liquidity ?? null
  const traders = m?.traders ?? m?.traderCount ?? m?.events?.[0]?.traders ?? null
  const priceChange = m?.oneDayPriceChange ?? m?.change24h ?? m?.changePercent ?? 0

  const description = m?.description ?? m?.summary ?? m?.question ?? ""

    return {
    id,
    title,
    category,
    description,
    image,
    volume,
    endDate,
    liquidity: typeof liquidity === "number" ? `$${liquidity.toLocaleString()}` : liquidity ?? undefined,
    traders: typeof traders === "number" ? traders : null,
    yesPrice: typeof yesPrice === "number" ? Math.max(0, Math.min(100, yesPrice)) : 50,
    noPrice: typeof noPrice === "number" ? Math.max(0, Math.min(100, noPrice)) : 50,
    priceChange: typeof priceChange === "number" ? priceChange : 0,
    change24hPct: typeof priceChange === "number" ? priceChange : 0,
  }
}
