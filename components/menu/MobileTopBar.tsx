import Link from "next/link"

import { almendra } from "@/fonts"

type Props = {
  className?: string
}

const MobileTopBar = ({ className }: Props) => (
  <header
    className={`${almendra.variable} bg-sidebar relative mb-2 overflow-hidden shadow-lg shadow-black/40 ${className}`}
  >
    <div className="bg-gold/10 absolute inset-x-0 -top-16 mx-auto h-24 w-64 rounded-full blur-2xl" />

    <Link
      href="/"
      className="relative flex items-center justify-center gap-4 px-4 py-2"
    >
      <div className="to-gold/60 h-px flex-1 bg-linear-to-r from-transparent" />

      <span className="from-gold-light via-gold to-gold-dark bg-linear-to-b bg-clip-text font-serif text-2xl tracking-widest text-transparent uppercase">
        Lost Seas
      </span>

      <div className="to-gold/60 h-px flex-1 bg-linear-to-l from-transparent" />
    </Link>

    <div className="via-gold/70 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
  </header>
)

export default MobileTopBar
