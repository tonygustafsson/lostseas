import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
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
    <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
              icon={<MerchandiseIcon item={type} />}
              body={
                <>
                  <p>{shipInfo.description}</p>

                  <div className="flex flex-col gap-2">
                    <div
                      className={`badge badge-secondary ${
                        health < 75 ? "badge-warning" : ""
                      } ${health <= 30 ? "badge-error" : ""}`}
                    >
                      Health: {health}%
                    </div>

                    <Badge variant="secondary" className="mt-2">
                      Price: {repairCost} gold
                    </Badge>
                  </div>
                </>
              }
              actions={
                <Button size="sm" onClick={() => handleRepairShip(id)}>
                  Repair
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
