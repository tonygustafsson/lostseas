import { NextResponse } from "next/server"

import { hasGodModeAccess } from "@/utils/godMode"

export async function GET() {
  if (!(await hasGodModeAccess())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({ unlocked: true })
}
