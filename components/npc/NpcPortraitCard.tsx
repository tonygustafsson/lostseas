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

/** A townsperson with a round portrait beside what they have to say */
const NpcPortraitCard = ({ npc, title, children, actions, footer }: Props) => (
  <div className="@container mb-8 w-full">
    <Card className="border-gold/30 border py-0">
      <CardContent className="flex flex-col items-center gap-6 p-6 @xl:flex-row @xl:items-start @3xl:gap-8 @3xl:p-8">
        <div className="border-gold relative size-32 shrink-0 overflow-hidden rounded-full border-2 @3xl:size-40">
          <Image
            src={getNpcImage(npc)}
            alt=""
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="font-serif text-2xl font-bold @3xl:text-3xl">
            {title}
          </h2>

          <div className="text-muted-foreground mt-4 max-w-3xl text-base">
            {children}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {actions}
          </div>

          {footer && (
            <div className="text-muted-foreground mt-6 max-w-3xl text-sm">
              {footer}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
)

export default NpcPortraitCard
