import pacifico from "@/font-pacifico"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Header from "../Header"
import Spinner from "../Spinner"

export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isStale } = useGetPlayer()

  return (
    <>
      <Header />

      <main
        className={`${pacifico.variable} flex flex-col p-4 items-center mt-16 justify-center w-full`}
      >
        {children}
      </main>

      {isLoading && !isStale && <Spinner />}
    </>
  )
}
