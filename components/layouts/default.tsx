import pacifico from "@/font-pacifico"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Header from "../Header"
import Spinner from "../Spinner"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useGetPlayer()

  return (
    <>
      <Header />

      <main className={`${pacifico.variable} flex flex-col p-24`}>
        {children}
      </main>

      {isLoading && <Spinner />}
    </>
  )
}
