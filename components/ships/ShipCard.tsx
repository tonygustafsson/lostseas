import Image from "next/image"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import ShipActions from "@/components/ships/ShipActions"
import ShipHealthBadge from "@/components/ships/ShipHealthBadge"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SHIP_TYPES } from "@/constants/ship"
import { getCurrentDate } from "@/utils/date"

type Props = {
  ship: Ship
  /** Why the ship cannot be removed right now, if anything */
  removeBlocker?: string
  /** What removing the ship would cause, like leaving the fleet overloaded */
  removeWarning?: string
}

export default function ShipCard({
  ship,
  removeBlocker,
  removeWarning,
}: Props) {
  const shipInfo = SHIP_TYPES[ship.type]

  return (
    <Card className="shadow-background/20 relative min-w-0 gap-4 p-4 shadow-lg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-3/4 select-none">
        <Image
          src={`/img/cards/shipyard/${ship.type.toLowerCase()}.png`}
          alt=""
          fill
          sizes="(min-width: 640px) 256px, 100vw"
          className="object-cover opacity-60"
        />
        <div className="from-card/30 via-card/70 to-card absolute inset-0 bg-linear-to-b" />
      </div>

      <div className="relative flex items-center gap-2">
        <span
          aria-hidden="true"
          className="border-accent/60 bg-background text-accent flex size-9 shrink-0 items-center justify-center rounded-full border shadow-md [&_svg]:size-5"
        >
          <MerchandiseIcon item={ship.type} />
        </span>

        <div className="min-w-0">
          <p className="truncate font-serif text-lg font-semibold">
            {ship.name}
          </p>
          <p className="text-muted-foreground text-xs">{ship.type}</p>
        </div>
      </div>

      <p className="text-muted-foreground relative line-clamp-2 text-xs">
        {shipInfo.description}
      </p>

      <div className="relative flex flex-wrap gap-2">
        <ShipHealthBadge health={ship.health} />

        <Badge variant="secondary">Cargo {shipInfo.cargoCapacity}</Badge>

        <Badge variant="secondary">
          Built {getCurrentDate(ship.createdDay)}
        </Badge>
      </div>

      <div className="relative">
        <ShipActions
          shipId={ship.id}
          shipName={ship.name}
          shipType={ship.type}
          removeBlocker={removeBlocker}
          removeWarning={removeWarning}
        />
      </div>
    </Card>
  )
}
