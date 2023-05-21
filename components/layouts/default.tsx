import pacifico from "@/font-pacifico"
import { useUser } from "@/hooks/queries/useUser"

import Header from "../Header"
import Spinner from "../Spinner"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isStale } = useUser()

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
