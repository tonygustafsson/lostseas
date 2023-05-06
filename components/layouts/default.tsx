import { useSession } from "next-auth/react"

import pacifico from "@/font-pacifico"

import Header from "../Header"
import Spinner from "../Spinner"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()

  return (
    <>
      <Header />

      <main className={`${pacifico.variable} flex flex-col p-24`}>
        {children}
      </main>

      {status === "loading" && <Spinner />}
    </>
  )
}
