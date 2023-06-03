import { useIsFetching } from "@tanstack/react-query"

import pacifico from "@/font-pacifico"

import Sidebar from "../Sidebar"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isFetching = useIsFetching()

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />

        <main
          className={`${pacifico.variable} flex flex-col w-full py-8 px-12 bg-base-200`}
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
