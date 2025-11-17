import { NextResponse } from 'next/server'

const DEFAULT_URL = process.env.NEXT_PUBLIC_GAMMA_EVENTS_URL ?? "https://gamma-api.polymarket.com/events/pagination?limit=20&active=true&archived=false&tag_slug=geopolitics&closed=false&order=volume24hr&ascending=false&offset=0"

function normalizeEventsJson(json: any) {
  // Return array of market-like objects. Accept several shapes.
  const events = json?.events ?? json?.data?.events ?? []
  if (!Array.isArray(events)) return []

  const markets: any[] = []
  for (const ev of events) {
    if (Array.isArray(ev?.markets) && ev.markets.length > 0) {
      for (const m of ev.markets) markets.push(m)
    } else {
      markets.push(ev)
    }
  }
  return markets
}

export async function GET() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 7000)
    let res: Response
    try {
      // add conservative headers that some APIs require for server-side requests
      res = await fetch(DEFAULT_URL, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': 'PolyHub/1.0 (+https://polyhub.local)'
        }
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!res || !res.ok) {
      // Return empty list with 200 so client can handle gracefully
      return NextResponse.json([], { status: 200, headers: { 'x-warning': 'gamma-fetch-failed' } })
    }

    const json = await res.json()
    const markets = normalizeEventsJson(json)

    // If normalization yields nothing, attempt a few fallback heuristics
    if (!markets || markets.length === 0) {
      // Try to find arrays on top-level keys that look like events/markets
      for (const k of Object.keys(json || {})) {
        const v = json[k]
        if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'object') {
          // use this array as markets
          return NextResponse.json(v, { status: 200 })
        }
      }
      // Final fallback: return raw JSON so the client can inspect (as object)
      return NextResponse.json({ raw: json }, { status: 200 })
    }

    return NextResponse.json(markets, { status: 200 })
  } catch (err: any) {
    // On network/abort errors, return empty array so client remains stable
    return NextResponse.json([], { status: 200, headers: { 'x-warning': String(err?.message ?? 'fetch-error') } })
  }
}
