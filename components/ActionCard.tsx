import Image from "next/image"
import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  title?: string
  message: string | ReactNode
  actions?: ReactNode
  icon?: ReactNode
  image?: string
}

const ActionCard = ({ title, message, actions, icon, image }: Props) => (
  <div className="@container mb-8 w-full">
    <Card className="shadow-background/20 border-accent/30 relative w-full gap-0 border py-0 shadow-lg @3xl:flex-row">
      {image && (
        <div className="pointer-events-none relative h-48 shrink-0 select-none @3xl:h-auto @3xl:w-2/5">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="to-card absolute inset-0 bg-linear-to-b from-transparent from-60% @3xl:bg-linear-to-r" />
        </div>
      )}

      <CardContent
        className={cn(
          "relative z-10 flex min-w-0 flex-1 flex-col justify-center p-6 @3xl:p-8",
          image && "-mt-12 @3xl:mt-0 @3xl:min-h-72"
        )}
      >
        <div className="flex items-center gap-4">
          {icon && (
            <span
              aria-hidden="true"
              className="bg-accent/10 text-accent flex size-12 shrink-0 items-center justify-center rounded-xl [&_svg]:size-6"
            >
              {icon}
            </span>
          )}
          {title && (
            <h2 className="font-serif text-2xl font-bold @3xl:text-3xl">
              {title}
            </h2>
          )}
        </div>

        <div className="text-muted-foreground mt-4 max-w-3xl text-base">
          {typeof message === "string" ? <p>{message}</p> : message}
        </div>

        {actions && <div className="mt-6 flex flex-wrap gap-4">{actions}</div>}
      </CardContent>
    </Card>
  </div>
)

export default ActionCard
