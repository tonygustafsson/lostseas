import pacifico from "@/font-pacifico"

import Header from "../Header"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      <main className={`${pacifico.variable} flex flex-col p-24`}>
        {children}
      </main>
    </>
  )
}
