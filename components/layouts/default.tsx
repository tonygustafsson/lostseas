import { useIsFetching } from "@tanstack/react-query"

import { almendra, andika } from "@/fonts"

import DesktopMenu from "../menu/DesktopMenu"
import MobileMenu from "../menu/MobileMenu"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isFetching = useIsFetching({
    predicate: (query) => {
      if ((query.state.data as Player)?.character?.journey) {
        // Prevent loading screen while on journey
        return false
      }

      return true
    },
  })

  return (
    <>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <MobileMenu className="lg:hidden" />
        <DesktopMenu className="hidden lg:block" />

        <main
          className={`${almendra.variable} ${andika.variable} flex min-h-screen w-full flex-col bg-base-200 px-2 py-4 pb-32 lg:px-12 lg:py-8`}
        >
          {children}
        </main>
      </div>

      {!!isFetching && (
        <div className="global-loading-indicator">
          <div className="spinner"></div>
        </div>
      )}
    </>
  )
}
