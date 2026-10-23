import {
  Anchor,
  ArrowRight,
  Coins,
  Hourglass,
  Sailboat,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getBestReturns, getVentureImage, VENTURES } from "@/constants/ventures"
import { cn } from "@/lib/utils"
import { getCurrentDate } from "@/utils/date"
import { formatGold, formatNumber } from "@/utils/number"

type Props = {
  ventureId: VentureId
  share?: VentureShare
  day: number
  gold: number
  disabled?: boolean
  onInvest: () => void
  onCollect: () => void
}

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) => (
  <div className="bg-background/60 flex flex-col items-center gap-1 rounded-lg border p-2 text-center">
    <dt className="text-muted-foreground flex items-center gap-1 text-sm">
      <span aria-hidden="true" className="text-gold [&_svg]:size-4">
        {icon}
      </span>
      {label}
    </dt>

    <dd className="text-sm font-semibold tabular-nums">{value}</dd>
  </div>
)

const VentureCard = ({
  ventureId,
  share,
  day,
  gold,
  disabled,
  onInvest,
  onCollect,
}: Props) => {
  const venture = VENTURES[ventureId]
  const hasReturned = !!share && share.returnDay <= day
  const isAtSea = !!share && !hasReturned
  const daysLeft = share ? share.returnDay - day : 0
  const voyageProgress = share
    ? ((day - share.investedDay) / (share.returnDay - share.investedDay)) * 100
    : 0
  const canAfford = gold >= venture.stake
  const isRisky = venture.risk === "High" || venture.risk === "Very high"

  return (
    <article
      className={cn(
        "bg-card flex flex-col overflow-hidden rounded-xl border shadow-lg",
        hasReturned && "border-gold ring-gold/40 ring-2"
      )}
    >
      <div className="relative aspect-video">
        <Image
          src={getVentureImage(ventureId)}
          alt=""
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover opacity-75"
        />

        <div className="to-card absolute inset-0 bg-linear-to-b from-transparent from-40%" />

        <Badge
          variant="outline"
          className={cn(
            "bg-background/80 absolute top-2 right-2 backdrop-blur-sm",
            isRisky && "text-destructive"
          )}
        >
          {venture.risk} risk
        </Badge>

        <header className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
          <h3 className="font-serif text-xl font-semibold drop-shadow-md">
            {venture.name}
          </h3>

          <p className="text-foreground flex items-center gap-2 text-sm drop-shadow-md">
            {venture.origin}
            <ArrowRight className="text-gold size-4" />
            {venture.destination}
          </p>
        </header>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
        <p className="text-foreground text-sm leading-relaxed">
          {venture.description}
        </p>

        <dl className="grid grid-cols-3 gap-2">
          <Stat
            icon={<Coins />}
            label="Stake"
            value={formatNumber(venture.stake)}
          />
          <Stat
            icon={<Hourglass />}
            label="Voyage"
            value={`${venture.days} days`}
          />
          <Stat
            icon={<TrendingUp />}
            label="Up to"
            value={formatNumber(getBestReturns(venture))}
          />
        </dl>

        <div className="mt-auto">
          {hasReturned && (
            <div className="flex flex-col gap-2">
              <p className="text-gold flex items-center gap-2 font-serif">
                <Anchor className="size-4" />
                The party has returned to port.
              </p>

              <Button
                variant="highlight"
                className="w-full font-serif"
                disabled={disabled}
                onClick={onCollect}
              >
                <Coins />
                Collect
              </Button>
            </div>
          )}

          {isAtSea && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2 italic">
                  <Sailboat className="size-4" />
                  At sea
                </span>

                <span className="text-muted-foreground tabular-nums">
                  Back {getCurrentDate(share.returnDay)} ({daysLeft}{" "}
                  {daysLeft === 1 ? "day" : "days"})
                </span>
              </div>

              <Progress
                value={voyageProgress}
                className="*:data-[slot=progress-indicator]:bg-gold"
                aria-label={`Voyage progress for ${venture.name}`}
              />
            </div>
          )}

          {!share && (
            <div className="flex flex-col gap-2">
              <Button
                variant="secondary"
                className="w-full font-serif"
                disabled={disabled || !canAfford}
                onClick={onInvest}
              >
                Invest {formatGold(venture.stake)}
              </Button>

              {!canAfford && (
                <p className="text-muted-foreground text-xs italic">
                  You need {formatGold(venture.stake)} in your purse. Withdraw
                  savings or take a loan first.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default VentureCard
