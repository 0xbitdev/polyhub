import { NextResponse } from "next/server"

function normalizeBase(rawBase: string) {
  const withProto = /^https?:\/\//i.test(rawBase) ? rawBase : `http://${rawBase}`
  return withProto.endsWith("/") ? withProto : `${withProto}/`
}

function formatVolume(num: number | string | undefined) {
  const n = typeof num === "number" ? num : Number(num ?? 0)
  if (!isFinite(n) || n <= 0) return "$0"
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toFixed(0)}`
}

function priceToPercent(val: unknown): number {
  const n = Number(val)
  if (!Number.isFinite(n)) return 0
  if (n >= 0 && n <= 1) return Math.round(n * 100)
  return Math.max(0, Math.min(100, Math.round(n)))
}

function toShortDate(iso: string | number | Date | undefined) {
  try {
    const d = new Date(iso as any)
    if (isNaN(d.getTime())) return ""
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  } catch {
    return ""
  }
}

function parseMaybeJsonArray(input: unknown): any[] {
  if (!input) return []
  if (Array.isArray(input)) return input
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const rawBase = process.env.REST_API_HOST || process.env.NEXT_PUBLIC_REST_API_HOST
    if (!rawBase) {
      return NextResponse.json({}, { status: 200, headers: { "x-warning": "REST_API_HOST not configured" } })
    }

  const base = normalizeBase(rawBase)
  const { id } = await ctx.params
    const url = `https://polylab-62d9abf7ece0.herokuapp.com/api/polymarket/markets/${encodeURIComponent(id)}`

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    try {
      const res = await fetch(url, { next: { revalidate: 30 }, signal: controller.signal })
      if (!res.ok) {
        return NextResponse.json({}, { status: res.status, headers: { "x-upstream-status": String(res.status) } })
      }
      const data = await res.json()
      const m: any = Array.isArray(data) ? data[0] : Array.isArray(data?.data) ? data.data[0] ?? data.data : data

      if (!m) return NextResponse.json({}, { status: 404 })

      // Prefer outcomes/outcomePrices mapping if available
      const outcomes = parseMaybeJsonArray(m?.outcomes)
      const outcomePrices = parseMaybeJsonArray(m?.outcomePrices)
      const findIndex = (label: string) => outcomes.findIndex((o) => String(o).trim().toLowerCase() === label)
      const idxYes = findIndex("yes")
      const idxNo = findIndex("no")

      let yesPct: number | undefined
      let noPct: number | undefined
      if (idxYes >= 0 && idxYes < outcomePrices.length) yesPct = priceToPercent(outcomePrices[idxYes])
      if (idxNo >= 0 && idxNo < outcomePrices.length) noPct = priceToPercent(outcomePrices[idxNo])

      // Fallback to tokens if outcomes not present
      if (typeof yesPct === "undefined" || typeof noPct === "undefined") {
        const tokens = Array.isArray(m?.tokens) ? m.tokens : []
        if (tokens.length >= 2 && typeof tokens[0]?.price !== "undefined" && typeof tokens[1]?.price !== "undefined") {
          yesPct = typeof yesPct === "undefined" ? priceToPercent(tokens[0].price) : yesPct
          noPct = typeof noPct === "undefined" ? priceToPercent(tokens[1].price) : noPct
        }
      }

      const yes = typeof m?.yesPrice === "number"
        ? m.yesPrice
        : typeof yesPct === "number"
        ? yesPct
        : priceToPercent((m?.pYes ?? m?.probYes ?? 0.5) as number)

      const no = typeof m?.noPrice === "number"
        ? m.noPrice
        : typeof noPct === "number"
        ? noPct
        : Math.max(0, 100 - yes)

      const vol = m?.volume ?? m?.volumeUSD ?? m?.totalVolumeUSD ?? 0
      const cat = m?.category?.label ?? m?.category ?? m?.tags?.[0] ?? "General"
      const end = m?.endDate ?? m?.closeTime ?? m?.endTime ?? m?.resolutionTime ?? m?.end_date_iso
      const change = m?.priceChange ?? m?.change24h ?? m?.changePercent ?? 0

      const normalized = {
        id: String(m?.id ?? m?.slug ?? m?.marketId ?? m?.market_slug ?? id),
        title: String(m?.title ?? m?.question ?? m?.label ?? "Untitled Market"),
        category: String(cat),
        volume: formatVolume(vol),
        yesPrice: Math.max(0, Math.min(100, Number.isFinite(yes) ? Number(yes) : 0)),
        noPrice: Math.max(0, Math.min(100, Number.isFinite(no) ? Number(no) : 0)),
        endDate: toShortDate(end),
        image: m?.image ?? m?.icon ?? null,
        priceChange: Number.isFinite(change) ? Number(change) : 0,
      }

      return NextResponse.json(normalized, { status: 200 })
    } finally {
      clearTimeout(timeout)
    }
  } catch (err: any) {
    return NextResponse.json({}, { status: 200, headers: { "x-error": err?.message || "unknown" } })
  }
}
