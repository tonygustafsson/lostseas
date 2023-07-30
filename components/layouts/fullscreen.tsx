import { almendra, andika } from "@/fonts"

import DesktopMenu from "../menu/DesktopMenu"
import MobileMenu from "../menu/MobileMenu"

export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <MobileMenu className="lg:hidden" />
      <DesktopMenu className="hidden lg:block" />

      <main
        className={`${almendra.variable} ${andika.variable} min-h-screen flex flex-col w-full bg-base-200`}
      >
        {children}
      </main>
    </div>
  )
}
