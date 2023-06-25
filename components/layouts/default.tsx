import { useIsFetching } from "@tanstack/react-query"

import { actor, almendra } from "@/fonts"

import Menu from "../menu"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isFetching = useIsFetching()

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <Menu />

        <main
          className={`${almendra.variable} ${actor.variable} flex flex-col w-full py-8 px-2 lg:px-12 bg-base-200`}
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
