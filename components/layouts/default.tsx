import { useEffect } from "react"

import pacifico from "@/font-pacifico"
import { useGetPlayer, usePlayerMutations } from "@/hooks/queries/usePlayer"

import Header from "../Header"
import Spinner from "../Spinner"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isStale } = useGetPlayer()
  const { isLoading: mutationIsLoading } = usePlayerMutations()

  useEffect(() => {
    console.log({ isLoading, isStale, mutationIsLoading })
  }, [isLoading, isStale, mutationIsLoading])

  return (
    <>
      <Header />

      <main className={`${pacifico.variable} flex flex-col p-24`}>
        {children}
      </main>

      {(isLoading || mutationIsLoading) && !isStale && <Spinner />}
    </>
  )
}
