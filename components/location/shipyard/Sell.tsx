import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardSell = () => {
  const { data: player } = useGetPlayer()
  const { sell } = useShipyard()

  const handleSell = (id: Ship["id"]) => {
    sell({ playerId: player?.id || "", id })
  }

  return (
    <div className="flex flex-wrap gap-6 mt-8">
      {Object.entries(player?.ships || []).map(([id, { name, type }]) => {
        const shipInfo = SHIP_TYPES[type as keyof typeof SHIP_TYPES]

        if (!shipInfo) return null

        return (
          <MerchandiseCard
            key={`shipyard-sell-${name}`}
            title={name}
            //indicator={player?.inventory[inventoryItem]?.toString() || "0"}
            icon={<MerchandiseIcon size="lg" item={type} />}
            body={
              <>
                <p>{shipInfo.description}</p>

                <div className="flex gap-2">
                  <div className="badge badge-secondary">
                    Price: {shipInfo.sell} dbl
                  </div>
                </div>
              </>
            }
            actions={
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSell(id)}
              >
                Sell {type}
              </button>
            }
          />
        )
      })}
    </div>
  )
}

export default ShipyardSell
