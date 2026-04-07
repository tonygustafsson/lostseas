import Image from "next/image"
import Link from "next/link"

import { almendra, crimsonText } from "@/fonts"

import DesktopMenu from "../menu/DesktopMenu"
import MobileBottomNav from "../menu/MobileBottomNav"
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
        <MobileBottomNav className="lg:hidden" />
        <DesktopMenu className="hidden lg:block" />

        <div className="flex w-full flex-col">
          <Link
            href="/"
            className="mb-2 flex w-full items-center justify-center gap-2 bg-gray-900 p-2 font-serif text-xl lg:hidden"
          >
            <Image
              src="/img/logo.svg"
              alt="Lost Seas logotype"
              width={32}
              height={22}
            />
            Lost Seas
          </Link>

          <main
            className={`${almendra.variable} ${crimsonText.variable} flex min-h-screen w-full flex-col bg-mist-950 px-2 py-4 pb-32 lg:py-8 xl:px-12`}
          >
            {children}
          </main>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}
