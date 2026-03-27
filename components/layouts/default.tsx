import Image from "next/image"
import Link from "next/link"

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
        <MobileMenu className="lg:hidden" />
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
            className={`${almendra.variable} ${andika.variable} flex min-h-screen w-full flex-col bg-mist-950 px-2 py-4 pb-32 lg:py-8 xl:px-12`}
          >
            {children}
          </main>
        </div>

        <PageSpinner />
      </TooltipProvider>
    </SidebarProvider>
  )
}
