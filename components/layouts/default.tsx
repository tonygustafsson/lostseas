import { useEffect } from "react"

import pacifico from "@/font-pacifico"
import { useGetUser } from "@/hooks/queries/useUser"

import Header from "../Header"
import Spinner from "../Spinner"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isStale } = useGetUser()

  useEffect(() => {
    console.log({ isLoading, isStale })
  }, [isLoading, isStale])

  return (
    <>
      <Header />

      <main className={`${pacifico.variable} flex flex-col p-24`}>
        {children}
      </main>

      {isLoading && !isStale && <Spinner />}
    </>
  )
}
