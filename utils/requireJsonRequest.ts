import { NextResponse } from "next/server"

// Requiring JSON prevents cross-site form submissions to cookie-authenticated
// actions. Cross-origin JSON requests require a CORS preflight.
export const requireJsonRequest = (req: Request) => {
  const contentType = req.headers.get("content-type")?.split(";")[0].trim()

  if (contentType?.toLowerCase() !== "application/json") {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    )
  }
}
