import { useIsFetching } from "@tanstack/react-query"

import pacifico from "@/font-pacifico"

import Header from "../Header"
import Spinner from "../Spinner"

export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isFetching = useIsFetching()

  return (
    <>
      <Header />

      <main
        className={`${pacifico.variable} flex flex-col p-4 items-center mt-16 justify-center w-full`}
      >
        {children}
      </main>

      {isFetching && <Spinner />}
    </>
  )
}
