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
        <span className="loading loading-ring loading-lg fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></span>
      )}
    </>
  )
}
