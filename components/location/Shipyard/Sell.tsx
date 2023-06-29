import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardSell = () => {
  const { data: player } = useGetPlayer()
  const { sellShip, buyFittings, sellFittings } = useShipyard()

  const handleSellShip = (id: Ship["id"]) => {
    sellShip({ id })
  }

  return (
    <div className="flex flex-wrap gap-6 mt-8">
      {Object.entries(player?.ships || []).map(
        ([id, { name, type, health }]) => {
          const shipInfo = SHIP_TYPES[type as keyof typeof SHIP_TYPES]

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
                      className={`badge badge-secondary badge-success ${
                        health < 75 ? "badge-warning" : ""
                      } ${health <= 30 ? "badge-error" : ""}`}
                    >
                      Health: {health}%
                    </div>

                    <div className="badge badge-secondary">
                      Worth: {shipInfo.sell} gold
                    </div>
                  </div>
                </>
              }
              actions={
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSellShip(id)}
                >
                  Sell {type}
                </button>
              }
            />
          )
        }
      )}

      {!Object.keys(player?.ships || {}).length && (
        <p>You do not own any ships currently.</p>
      )}

      {Object.entries(MERCHANDISE)
        .filter(([_, item]) => item.availableAt === "shipyard")
        .map(([itemKey]) => (
          <MerchandiseShopItem
            key={`shop-item-${itemKey}`}
            item={itemKey as keyof typeof MERCHANDISE}
            type="Sell"
            player={player}
            onBuy={buyFittings}
            onSell={sellFittings}
          />
        ))}
    </div>
  )
}

export default ShipyardSell
