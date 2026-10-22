import { almendra, crimsonText } from "@/fonts"

import DesktopMenu from "../menu/DesktopMenu"
import MobileBottomNav from "../menu/MobileBottomNav"

export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <MobileBottomNav className="lg:hidden" />
      <DesktopMenu className="hidden lg:block" />

      <main
        className={`${almendra.variable} ${crimsonText.variable} flex min-h-dvh w-full flex-col bg-slate-950`}
      >
        {children}
      </main>
    </div>
  )
}
