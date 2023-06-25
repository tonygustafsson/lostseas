import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { useMarket } from "@/hooks/queries/useMarket"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

const Market = () => {
  const { data: player } = useGetPlayer()
  const { acceptMarketBargain } = useMarket()

  const items = player?.locationStates?.market?.items

  const handleAccept = (item: keyof LocationStateMarketItems) => {
    acceptMarketBargain({
      playerId: player?.id || "",
      item,
    })
  }

  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(items || {}).map(([item, { price, quantity }]) => {
        const inventoryItem = item as keyof LocationStateMarketItems

        return (
          <MerchandiseCard
            key={`market-${item}`}
            title={capitalize(item)}
            indicator={player?.inventory[inventoryItem]?.toString() || "0"}
            icon={<MerchandiseIcon item={inventoryItem} />}
            body={
              <>
                <p>
                  You find <strong>{quantity}</strong>{" "}
                  {quantity === 1
                    ? MERCHANDISE[inventoryItem].singleUnit
                    : MERCHANDISE[inventoryItem].unit}{" "}
                  of {item} for <strong>{price} gold</strong>.
                </p>

                <p>{MERCHANDISE[inventoryItem].description}</p>

                <div className="flex gap-2 mt-2">
                  <div className="badge badge-secondary">
                    Price: {price * quantity} gold
                  </div>
                </div>
              </>
            }
            actions={
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleAccept(inventoryItem)}
              >
                Buy
              </button>
            }
          />
        )
      })}

      {!Object.keys(items || {}).length && (
        <div className="my-8">
          <p className="text-xl">There are no items for sale.</p>
        </div>
      )}
    </div>
  )
}

export default Market
