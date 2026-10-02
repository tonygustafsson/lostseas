import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import type { FormEventHandler, ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type BankActionCardProps = {
  image: string
  icon: LucideIcon
  title: string
  description: string
  notice?: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  children: ReactNode
}

const BankActionCard = ({
  image,
  icon: Icon,
  title,
  description,
  notice,
  onSubmit,
  children,
}: BankActionCardProps) => (
  <Card className="border-accent/20 bg-card/95 @container relative w-full gap-0 py-0 shadow-lg shadow-black/20 ring-white/10">
    <form onSubmit={onSubmit} className="relative flex h-full w-full flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 overflow-hidden select-none">
        <Image
          src={image}
          alt={description}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="via-background/10 to-background absolute inset-0 bg-linear-to-b from-transparent" />
      </div>
      <div className="h-40 shrink-0" aria-hidden="true" />

      <CardHeader className="relative z-10 -mt-12 flex-1 gap-2 rounded-t-2xl px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <span className="border-accent/60 bg-background/90 text-accent flex size-11 shrink-0 items-center justify-center rounded-full border shadow-md @max-[250px]:size-9">
            <Icon aria-hidden="true" className="size-6 @max-[250px]:size-5" />
          </span>
          <CardTitle className="font-serif text-xl font-semibold @max-[250px]:text-base">
            {title}
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>

        {notice && (
          <p className="text-destructive pt-1 text-sm font-semibold">
            {notice}
          </p>
        )}
      </CardHeader>

      <CardContent className="relative z-10 flex flex-col gap-4 px-4 pt-0 pb-4 text-sm">
        {children}
      </CardContent>
    </form>
  </Card>
)

export default BankActionCard
