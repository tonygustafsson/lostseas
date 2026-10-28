import Flag from "@/components/icons/Flag"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Button } from "@/components/ui/button"
import { TOWNS } from "@/constants/locations"
import { cn } from "@/lib/utils"
import { getJourneyLength, getJourneySupplies } from "@/utils/journey"

type Props = {
  player: Player
  destination: Town
  isPending: boolean
  onConfirm: () => void
  onCancel: () => void
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
    <div className="bg-background/90 absolute inset-x-4 top-1/2 mx-auto flex max-w-80 -translate-y-1/2 flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <Flag nation={TOWNS[destination].nation} size={32} decorative />

        <div>
          <h3 className="font-serif text-lg leading-tight">{destination}</h3>

          <p className="text-muted-foreground text-sm">
            {days} {days === 1 ? "day" : "days"} at sea
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-x-4 gap-y-2 text-sm">
        <span />
        <span className="text-muted-foreground text-right">Needed</span>
        <span className="text-muted-foreground text-right">On board</span>

        {rows.map(({ item, needed, onBoard }) => (
          <div
            key={item}
            className={cn(
              "col-span-3 grid grid-cols-subgrid items-center",
              onBoard < needed && "text-error"
            )}
          >
            <span className="flex items-center gap-2 capitalize">
              <MerchandiseIcon item={item} size="xs" />
              {item}
            </span>

            <span className="text-right">{needed}</span>
            <span className="text-right">{onBoard}</span>
          </div>
        ))}
      </div>

      {!hasEnoughSupplies && (
        <p className="text-error text-sm">
          Buy{" "}
          {shortages
            .map(
              ({ item, needed, onBoard }) => `${needed - onBoard} more ${item}`
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
          Set sail
        </Button>
      </div>
    </div>
  )
}

export default DestinationConfirm
