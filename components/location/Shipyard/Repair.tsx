import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import ShipHealthBadge from "@/components/ships/ShipHealthBadge"
import { Button } from "@/components/ui/button"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardRepair = () => {
  const { data: player } = useGetPlayer()
  const { repairShip } = useShipyard()

  const handleRepairShip = (id: Ship["id"]) => {
    repairShip({ id })
  }

  return (
    <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Object.entries(player?.ships || [])
        .filter(([_, { health }]) => health < 100)
        .map(([id, { name, type, health }]) => {
          const shipInfo = SHIP_TYPES[type as keyof typeof SHIP_TYPES]
          const repairCost = (100 - health) * SHIP_REPAIR_COST

          if (!shipInfo) return null

          return (
            <MerchandiseCard
              key={`shipyard-sell-${name}`}
              title={`${name} (${type})`}
              image={`/img/cards/shipyard/${type.toLowerCase()}.png`}
              icon={<MerchandiseIcon item={type} />}
              body={<ShipHealthBadge health={health} className="mt-2" />}
              actions={
                <Button size="sm" onClick={() => handleRepairShip(id)}>
                  Repair for {repairCost} gold
                </Button>
              }
            />
          )
        })}

      {!Object.keys(player?.ships || {}).length && (
        <p className="w-full">You do not own any ships currently.</p>
      )}

      {!!Object.keys(player?.ships || {}).length &&
        !Object.entries(player?.ships || []).filter(
          ([_, { health }]) => health < 100
        ).length && <p>All your ships are in perfect health</p>}
    </div>
  )
}

export default ShipyardRepair
