import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardBuy = () => {
  const { data: player } = useGetPlayer()
  const { buyShip, buyFittings, sellFittings } = useShipyard()

  const handleBuyShip = (item: keyof typeof SHIP_TYPES) => {
    buyShip({ item })
  }

  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(SHIP_TYPES).map(([shipType, { description, buy }]) => (
        <MerchandiseCard
          key={`shipyard-buy-${shipType}`}
          title={shipType}
          icon={<MerchandiseIcon item={shipType} />}
          body={
            <>
              <p>{description}</p>

              <div className="flex gap-2">
                <div className="badge badge-secondary">Price: {buy} gold</div>
              </div>
            </>
          }
          actions={
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleBuyShip(shipType as keyof typeof SHIP_TYPES)}
            >
              Buy
            </button>
          }
        />
      ))}

      {Object.entries(MERCHANDISE)
        .filter(([_, item]) => item.availableAt === "shipyard")
        .map(([itemKey]) => (
          <MerchandiseShopItem
            key={`shop-item-${itemKey}`}
            item={itemKey as keyof typeof MERCHANDISE}
            type="Buy"
            player={player}
            onBuy={buyFittings}
            onSell={sellFittings}
          />
        ))}
    </div>
  )
}

export default ShipyardBuy
