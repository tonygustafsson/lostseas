import Image from "next/image"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  icon?: ReactNode
  image?: string
  indicator?: string
  body: ReactNode
  actions?: ReactNode
  disabled?: boolean
  fullWidth?: boolean
}

const MerchandiseCard = ({
  title,
  icon,
  image,
  indicator,
  body,
  actions,
  disabled,
  fullWidth,
}: Props) => (
  <Card
    className={cn(
      "shadow-background/20 @container relative w-full gap-0 py-0 shadow-lg transition-shadow duration-300 motion-reduce:transition-none",
      !fullWidth && "max-w-sm",
      disabled && "cursor-not-allowed opacity-50"
    )}
    aria-disabled={disabled}
  >
    {image && (
      <>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 overflow-hidden select-none">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-cover opacity-80 transition-opacity duration-150 motion-reduce:transition-none",
              !disabled && "group-hover/card:opacity-100"
            )}
          />
          <div className="via-card/10 to-card absolute inset-0 bg-linear-to-b from-transparent" />
        </div>

        <div className="h-40 shrink-0" aria-hidden="true" />
      </>
    )}

    <CardHeader
      className={cn(
        "relative z-10 flex-1 gap-2 rounded-t-2xl px-4 pt-4 pb-3",
        image && "-mt-12"
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span
            aria-hidden="true"
            className="border-accent/60 bg-background text-accent flex size-11 shrink-0 items-center justify-center rounded-full border shadow-md @max-[250px]:size-9 [&_svg]:size-6 @max-[250px]:[&_svg]:size-5"
          >
            {icon}
          </span>
        )}
        <CardTitle className="flex min-w-0 flex-1 items-center gap-2 font-serif text-xl font-semibold @max-[250px]:text-base">
          {title}

          {indicator && (
            <Badge variant="default" className="shrink-0 text-xs">
              {indicator}
            </Badge>
          )}
        </CardTitle>
      </div>

      <div className="text-muted-foreground text-sm">{body}</div>
    </CardHeader>

    {actions && (
      <CardContent className="relative z-10 flex flex-col gap-4 px-4 pt-0 pb-4 text-sm">
        {actions}
      </CardContent>
    )}
  </Card>
)

export default MerchandiseCard
