import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatGold } from "@/utils/number"

type Props = {
  title: string
  icon: ReactNode
  description?: string
  rewardLabel: string
  reward?: number
  onHandOver: () => void
  disabled?: boolean
}

const HandOverCard = ({
  title,
  icon,
  description,
  rewardLabel,
  reward,
  onHandOver,
  disabled = false,
}: Props) => (
  <Card className="relative">
    <span
      aria-hidden="true"
      className="text-accent pointer-events-none absolute -right-2 -bottom-2 -rotate-12 opacity-25 [&_svg]:size-32"
    >
      {icon}
    </span>

    <CardHeader className="relative">
      <CardTitle className="flex items-center gap-2 font-serif text-2xl font-semibold">
        <span className="text-accent [&_svg]:size-11 [&_svg]:shrink-0">
          {icon}
        </span>

        {title}
      </CardTitle>
    </CardHeader>

    <CardContent className="relative">
      {description && <p className="mb-4">{description}</p>}

      <Badge className="bg-success/10 text-success">
        {rewardLabel}: {formatGold(reward)}
      </Badge>
    </CardContent>

    <CardAction className="relative px-6">
      <Button size="sm" onClick={onHandOver} disabled={disabled}>
        Hand over
      </Button>
    </CardAction>
  </Card>
)

export default HandOverCard
