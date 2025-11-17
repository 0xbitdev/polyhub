import { NextResponse } from "next/server"
import { PublicKey, Connection } from "@solana/web3.js"

export async function POST(req: Request) {
  try {
    const { address } = (await req.json()) as { address?: string }
    if (!address) {
      return NextResponse.json({ error: "Missing address" }, { status: 400 })
    }
    let pubkey: PublicKey
    try {
      pubkey = new PublicKey(address)
    } catch {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 })
    }

    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")
    try {
      const lamports = await connection.getBalance(pubkey)
      return NextResponse.json({ lamports })
    } catch (e: any) {
      const message = typeof e?.message === "string" ? e.message : "Failed to fetch balance"
      const status = message.includes("403") ? 403 : 502
      return NextResponse.json({ error: message }, { status })
    }
  } catch (e: any) {
    const message = typeof e?.message === "string" ? e.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
