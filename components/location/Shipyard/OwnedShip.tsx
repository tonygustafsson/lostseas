import Image from "next/image"

import ShipHealthBadge from "@/components/ships/ShipHealthBadge"
import { Badge } from "@/components/ui/badge"

type Props = {
  ship: Ship
  /** A warning or why the action can't be done, shown under the name */
  note?: string | null
  /** An info button, shown right after the ship's name */
  info?: React.ReactNode
  /** The button for what can be done with the ship, like Repair or Sell */
  children: React.ReactNode
}

/** One of the player's own ships, in a compact row with one action. */
const OwnedShip = ({ ship, note, info, children }: Props) => (
  <li className="bg-card flex flex-wrap items-center gap-4 rounded-xl border p-3">
    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg select-none">
      <Image
        src={`/img/cards/shipyard/${ship.type.toLowerCase()}.png`}
        alt=""
        fill
        sizes="64px"
        className="object-cover"
      />
    </div>

    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <div className="flex min-w-0 items-center gap-1">
        {/* Never cut off: a long name wraps onto the next line instead */}
        <p className="font-serif text-lg font-semibold wrap-break-word">
          {ship.name}
        </p>
        {/* Nudged up to line up with the serif name */}
        {info && <span className="flex -translate-y-0.5">{info}</span>}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-background text-muted-foreground">
          {ship.type}
        </Badge>
        <ShipHealthBadge health={ship.health} />
      </div>

      {note && <p className="text-error mt-2 text-xs">{note}</p>}
    </div>

    {/* On a phone the action gets its own full-width row, leaving the name room */}
    <div className="w-full *:w-full sm:w-auto sm:*:w-auto">{children}</div>
  </li>
)

export default OwnedShip
