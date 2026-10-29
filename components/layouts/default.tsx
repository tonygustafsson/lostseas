import { almendra, crimsonText } from "@/fonts"

import DesktopMenu from "../menu/DesktopMenu"
import MobileBottomNav from "../menu/MobileBottomNav"
import MobileTopBar from "../menu/MobileTopBar"
import { SidebarProvider } from "../ui/sidebar"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <MobileBottomNav className="lg:hidden" />
      <DesktopMenu className="hidden lg:block" />

      <div className="flex w-full flex-col">
        <MobileTopBar className="lg:hidden" />

        <main
          className={`${almendra.variable} ${crimsonText.variable} bg-background flex min-h-dvh w-full flex-col px-2 py-4 pb-32 lg:py-8 xl:px-12`}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
