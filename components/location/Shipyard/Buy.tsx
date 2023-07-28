import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardBuy = () => {
  const { data: player } = useGetPlayer()
  const { buyShip, buyFittings, sellFittings } = useShipyard()

  const handleBuyShip = (item: keyof typeof SHIP_TYPES) => {
    buyShip({ item })
  }

  const titleInfo = TITLE_INFO[player?.character.title || "Pirate"]
  const shipBuyingDisabled =
    Object.keys(player?.ships || {}).length + 1 > titleInfo.maxShips

  return (
    <>
      {shipBuyingDisabled && (
        <div className="alert bg-slate-700 mb-8">
          <p>
            You can only have {titleInfo.maxShips} ships as long as you have the
            title {titleInfo.title}.
          </p>
        </div>
      )}

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
                onClick={() =>
                  handleBuyShip(shipType as keyof typeof SHIP_TYPES)
                }
                disabled={shipBuyingDisabled}
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
    </>
  )
}

export default ShipyardBuy
