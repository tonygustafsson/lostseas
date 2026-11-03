import { Sailboat } from "lucide-react"

import Flag from "@/components/icons/Flag"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { NATIONS, TOWNS } from "@/constants/locations"
import { cn } from "@/lib/utils"
import { getJourneyLength, getJourneySupplies } from "@/utils/journey"

type Props = {
  player: Player
  destination: Town
  isPending: boolean
  onConfirm: () => void
  onCancel: () => void
}

const NationRelationBadge = ({
  playerNation,
  townNation,
}: {
  playerNation: Nation
  townNation: Nation
}) => {
  if (townNation === playerNation) {
    return <Badge className="bg-success/10 text-success">Home port</Badge>
  }

  if (NATIONS[playerNation].warWith === townNation) {
    return <Badge variant="destructive">Enemy</Badge>
  }

  return <Badge variant="outline">Neutral port</Badge>
}

const DestinationConfirm = ({
  player,
  destination,
  isPending,
  onConfirm,
  onCancel,
}: Props) => {
  const days = getJourneyLength(player.character.town, destination)
  const supplies = getJourneySupplies(player, days)
  const townNation = TOWNS[destination].nation
  const rows = [
    {
      item: "food",
      needed: supplies.food,
      onBoard: player.inventory?.food || 0,
    },
    {
      item: "water",
      needed: supplies.water,
      onBoard: player.inventory?.water || 0,
    },
  ]
  const shortages = rows.filter(({ needed, onBoard }) => onBoard < needed)
  const hasEnoughSupplies = !shortages.length

  return (
    <div className="absolute inset-x-4 top-1/2 mx-auto max-w-80 -translate-y-1/2">
      <div className="gilded-frame animate-in fade-in-0 slide-in-from-bottom-4 flex flex-col gap-4 rounded-lg p-6 duration-200">
        <div className="flex items-center gap-4">
          <Flag nation={townNation} size={32} decorative />

          <div className="flex flex-col gap-1">
            <p className="text-gold text-xs tracking-widest uppercase">
              Voyage to
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-lg leading-tight">
                {destination}
              </h3>

              <NationRelationBadge
                playerNation={player.character.nationality}
                townNation={townNation}
              />
            </div>

            <p className="text-muted-foreground text-sm">
              {days} {days === 1 ? "day" : "days"} at sea
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {rows.map(({ item, needed, onBoard }) => {
            const isShort = onBoard < needed
            const leftOnArrival = onBoard - needed

            // Share of today's stock still in the hold when you arrive.
            // A shortage fills the bar red instead.
            const remaining = isShort
              ? 100
              : (leftOnArrival / (onBoard || 1)) * 100

            return (
              <div key={item} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground flex items-center gap-2 capitalize">
                    <MerchandiseIcon item={item} size="xs" />
                    {item}
                  </span>

                  <span className={cn("tabular-nums", isShort && "text-error")}>
                    {onBoard} →{" "}
                    {isShort ? `${-leftOnArrival} short` : leftOnArrival}
                  </span>
                </div>

                <Progress
                  value={remaining}
                  aria-label={
                    isShort
                      ? `${item}: ${-leftOnArrival} short for the voyage`
                      : `${item}: ${leftOnArrival} of ${onBoard} left on arrival`
                  }
                  variant={isShort ? "default" : "gilded"}
                  className={cn(isShort && "*:bg-error")}
                />
              </div>
            )
          })}
        </div>

        {!hasEnoughSupplies && (
          <p className="text-error text-sm">
            Buy{" "}
            {shortages
              .map(
                ({ item, needed, onBoard }) =>
                  `${needed - onBoard} more ${item}`
              )
              .join(" and ")}{" "}
            at the shop before sailing here.
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button
            size="sm"
            disabled={!hasEnoughSupplies || isPending}
            onClick={onConfirm}
          >
            <Sailboat />
            Set sail
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DestinationConfirm
