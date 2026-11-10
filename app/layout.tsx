import "@/styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata, Viewport } from "next"

import Providers from "@/components/Providers"
import { almendra, crimsonText } from "@/fonts"
import { cn } from "@/lib/utils"
import { getDehydratedPlayerState } from "@/utils/app/getDehydratedPlayerState"

const description =
  "Sail, trade and fight your way across the Lost Seas. A free pirate trading game in your browser: trade goods between ports, recruit a crew and battle rival ships in the 17th-century Caribbean."

export const metadata: Metadata = {
  metadataBase: new URL("https://lostseas.vercel.app"),
  title: {
    default: "Lost Seas",
    template: "%s - Lost Seas",
  },
  description,
  applicationName: "Lost Seas",
  openGraph: {
    type: "website",
    siteName: "Lost Seas",
    title: "Lost Seas",
    description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lost Seas",
    description,
  },
  appleWebApp: {
    capable: true,
    title: "Lost Seas",
    statusBarStyle: "black-translucent",
  },
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
        color: "#ddb049",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#0a0d0f",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0d0f",
  viewportFit: "cover",
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
      className={cn(
        almendra.variable,
        crimsonText.variable,
        "font-sans",
        "dark"
      )}
    >
      <body>
        <Providers dehydratedState={dehydratedState}>{children}</Providers>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
