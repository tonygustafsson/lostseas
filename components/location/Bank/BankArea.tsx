import Image from "next/image"
import type { ReactNode } from "react"

type Props = {
  image: string
  title: string
  description: ReactNode
  children: ReactNode
}

const BankArea = ({ image, title, description, children }: Props) => (
  <section className="bg-card relative flex flex-col gap-6 overflow-hidden rounded-2xl border p-6 md:p-8">
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover opacity-60"
      />
      <div className="from-card/50 to-card/90 absolute inset-0 bg-linear-to-b" />
    </div>

    <header className="relative z-10 flex flex-col gap-2">
      <h2 className="text-accent font-serif text-2xl font-semibold">{title}</h2>

      <p className="text-foreground text-sm leading-relaxed">{description}</p>
    </header>

    <div className="relative z-10 mt-auto flex flex-col gap-4">{children}</div>
  </section>
)

export default BankArea
