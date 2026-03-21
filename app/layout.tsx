import "@/styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import { Metadata, Viewport } from "next"

import Providers from "@/components/Providers"
import { almendra, andika } from "@/fonts"
import { cn } from "@/lib/utils"
import { getDehydratedPlayerState } from "@/utils/app/getDehydratedPlayerState"

export const metadata: Metadata = {
  title: {
    default: "Lost Seas",
    template: "%s - Lost Seas",
  },
  manifest: "/site.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#2d89ef",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dehydratedState = await getDehydratedPlayerState()

  return (
    <html
      lang="en"
      className={cn(almendra.variable, andika.variable, "font-sans", "dark")}
    >
      <body>
        <Providers dehydratedState={dehydratedState}>{children}</Providers>

        <Analytics />
      </body>
    </html>
  )
}
