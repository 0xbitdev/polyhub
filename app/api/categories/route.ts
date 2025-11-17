import { NextResponse } from "next/server"

function normalizeBase(rawBase: string) {
  const withProto = /^https?:\/\//i.test(rawBase) ? rawBase : `http://${rawBase}`
  return withProto.endsWith("/") ? withProto : `${withProto}/`
}

export async function GET() {
  try {
    const rawBase = process.env.REST_API_HOST || process.env.NEXT_PUBLIC_REST_API_HOST
    if (!rawBase) {
      // Return empty list so UI doesn't hang on loading
      return NextResponse.json([], { status: 200, headers: { "x-warning": "REST_API_HOST not configured" } })
    }

    const base = normalizeBase(rawBase)
    const url = `${base}categories`

    // Add timeout to avoid hanging requests
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    try {
      const res = await fetch(url, { next: { revalidate: 60 }, signal: controller.signal })
      if (!res.ok) {
        // Return empty list so UI can proceed without categories
        return NextResponse.json([], { status: 200, headers: { "x-upstream-status": String(res.status) } })
      }

      const data = await res.json()
      const list: any[] = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []
      const topLevel = list.filter((c) => !c?.parentCategory)
      topLevel.sort((a, b) => String(a?.label || "").localeCompare(String(b?.label || "")))
      return NextResponse.json(topLevel, { status: 200 })
    } finally {
      clearTimeout(timeout)
    }
  } catch (err: any) {
    // On error (including abort), return empty list so client stops loading
    return NextResponse.json([], { status: 200, headers: { "x-error": err?.message || "unknown" } })
  }
}
