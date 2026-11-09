import Image from "next/image"
import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { getNpcImage } from "@/constants/npcs"

type Props = {
  npc: Npc
  title: string
  children: ReactNode
  actions: ReactNode
  /** Shown last, below the actions */
  footer?: ReactNode
}

/** A townsperson with a round portrait beside what they have to say, gilded like the game menu */
const NpcPortraitCard = ({ npc, title, children, actions, footer }: Props) => (
  <div className="@container mb-8 w-full">
    <Card className="relative overflow-hidden py-0">
      <div className="bg-gold/10 absolute -top-16 left-0 h-32 w-64 rounded-full blur-2xl" />

      <div className="via-gold/70 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />

      <div className="via-gold/40 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />

      <CardContent className="relative flex flex-col items-center gap-6 p-6 @xl:flex-row @xl:items-start @3xl:gap-8 @3xl:p-8">
        <div className="from-gold-light via-gold to-gold-dark shrink-0 rounded-full bg-linear-to-b p-0.5">
          <div className="bg-card rounded-full p-1">
            <div className="relative size-32 overflow-hidden rounded-full @3xl:size-40">
              <Image
                src={getNpcImage(npc)}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="from-gold-light via-gold to-gold-dark bg-linear-to-b bg-clip-text font-serif text-2xl font-bold text-transparent @3xl:text-3xl">
            {title}
          </h2>

          <div className="from-gold/60 mt-4 h-px w-32 bg-linear-to-r to-transparent" />

          <div className="text-muted-foreground mt-4 max-w-3xl text-base">
            {children}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {actions}
          </div>

          {footer && (
            <div className="text-muted-foreground mt-6 max-w-3xl text-sm italic">
              <div className="from-gold/40 mb-4 h-px bg-linear-to-r to-transparent" />

              {footer}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
)

export default NpcPortraitCard
