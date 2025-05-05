import { NextResponse } from "next/server"
import { fetch_data } from "./weibo.service"

export async function GET() {
  try {
    const hotList = await fetch_data()

    return NextResponse.json(hotList)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Weibo hot search" },
      { status: 500 }
    )
  }
}

export const dynamic = "force-dynamic"
