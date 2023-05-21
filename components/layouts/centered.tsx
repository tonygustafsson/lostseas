import pacifico from "@/font-pacifico"
import { useGetUser } from "@/hooks/queries/useUser"

import Header from "../Header"
import Spinner from "../Spinner"

export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isStale } = useGetUser()

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
