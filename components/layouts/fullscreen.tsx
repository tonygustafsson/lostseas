import { almendra, andika } from "@/fonts"

import DesktopMenu from "../menu/DesktopMenu"
import MobileMenu from "../menu/MobileMenu"

export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <MobileMenu className="lg:hidden" />
      <DesktopMenu />

      <main
        className={`${almendra.variable} ${andika.variable} flex min-h-screen w-full flex-col bg-slate-800`}
      >
        {children}
      </main>
    </div>
  )
}
