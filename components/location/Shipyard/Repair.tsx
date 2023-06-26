import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardRepair = () => {
  const { data: player } = useGetPlayer()
  const { repair } = useShipyard()

  const handleRepair = (id: Ship["id"]) => {
    repair({ id })
  }

  return (
    <div className="flex flex-wrap gap-6 mt-8">
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

                  <div className="flex gap-2">
                    <div
                      className={`badge badge-secondary ${
                        health < 75 ? "badge-warning" : ""
                      } ${health <= 30 ? "badge-error" : ""}`}
                    >
                      Health: {health}%
                    </div>
                    <div className="badge badge-secondary">
                      Price: {repairCost} gold
                    </div>
                  </div>
                </>
              }
              actions={
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleRepair(id)}
                >
                  Repair
                </button>
              }
            />
          )
        })}

      {!Object.keys(player?.ships || {}).length && (
        <p>You do not own any ships currently.</p>
      )}

      {!!Object.keys(player?.ships || {}).length &&
        !Object.entries(player?.ships || []).filter(
          ([_, { health }]) => health < 100
        ).length && <p>All your ships are in perfect health</p>}
    </div>
  )
}

export default ShipyardRepair
