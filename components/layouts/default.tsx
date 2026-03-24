import { almendra, andika } from "@/fonts"

import DesktopMenu from "../menu/DesktopMenu"
import MobileMenu from "../menu/MobileMenu"
import PageSpinner from "../PageSpinner"
import { SidebarProvider } from "../ui/sidebar"
import { TooltipProvider } from "../ui/tooltip"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex w-full">
          <MobileMenu className="lg:hidden" />
          <DesktopMenu className="hidden lg:block" />

          <main
            className={`${almendra.variable} ${andika.variable} flex min-h-screen w-full flex-col bg-mauve-800 px-2 py-4 pb-32 lg:px-12 lg:py-8`}
          >
            {children}
          </main>

          <PageSpinner />
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}
