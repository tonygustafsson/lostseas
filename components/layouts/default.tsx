import { useIsFetching } from "@tanstack/react-query"

import pacifico from "@/font-pacifico"

import Header from "../Header"
import Spinner from "../Spinner"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isFetching = useIsFetching()

  return (
    <>
      <Header />

      <main className={`${pacifico.variable} flex flex-col p-24`}>
        {children}
      </main>

      {isFetching && <Spinner />}
    </>
  )
}
