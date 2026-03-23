import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  icon: ReactNode
  indicator?: string
  body: ReactNode
  actions?: ReactNode
  disabled?: boolean
  fullWidth?: boolean
}

const MerchandiseCard = ({
  title,
  icon,
  indicator,
  body,
  actions,
  disabled,
  fullWidth,
}: Props) => (
  <Card
    className={cn(
      "w-full gap-0 overflow-hidden py-0 shadow-xl",
      !fullWidth && "lg:w-80",
      disabled && "cursor-not-allowed opacity-50"
    )}
    aria-disabled={disabled}
  >
    <CardHeader className="bg-muted/70 px-6 py-2">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <div className="bg-background ring-border flex size-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1">
            {icon}
          </div>

          <CardTitle className="font-serif text-xl leading-tight">
            {title}
          </CardTitle>

          {indicator && <Badge className="shrink-0 text-xs">{indicator}</Badge>}
        </div>
      </div>
    </CardHeader>

    <CardContent className="px-6 pt-4 pb-2 text-sm">{body}</CardContent>

    {actions ? (
      <CardFooter className="flex items-center justify-between gap-2 px-6 pt-4 pb-6">
        {actions}
      </CardFooter>
    ) : null}
  </Card>
)

export default MerchandiseCard
