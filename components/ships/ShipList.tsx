"use client"

import ShipCard from "@/components/ships/ShipCard"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRemoveShipBlocker } from "@/utils/ship"

export default function ShipList() {
  const { data: player } = useGetPlayer()

  if (!player) {
    return null
  }

  const ships = Object.values(player.ships || []).filter(
    (ship) => SHIP_TYPES[ship.type]
  )

  if (!ships.length) {
    return <p>You do not have any ships currently.</p>
  }

  const removeShipBlocker = getRemoveShipBlocker(player)

  return (
    <div className="@container w-full">
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        {ships.map((ship) => (
          <ShipCard
            key={`ships-${ship.id}`}
            ship={ship}
            removeBlocker={removeShipBlocker}
          />
        ))}
      </div>
    </div>
  )
}
