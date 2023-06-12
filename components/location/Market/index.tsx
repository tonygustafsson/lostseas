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
          <div
            className="card w-80 bg-base-100 shadow-xl pt-4"
            key={`market-item-${item}`}
          >
            <figure>
              <MerchandiseIcon item={inventoryItem} />
            </figure>

            <div className="card-body pt-2">
              <div className="indicator">
                <h2 className="card-title mr-6">{capitalize(item)}</h2>

                <span className="indicator-item indicator-middle badge badge-primary">
                  {player?.inventory[inventoryItem] || 0}
                </span>
              </div>

              <p>
                You find <strong>{quantity}</strong>{" "}
                {quantity === 1
                  ? MERCHANDISE[inventoryItem].singleUnit
                  : MERCHANDISE[inventoryItem].unit}{" "}
                of {item} for <strong>{price} doubloons</strong>.
              </p>

              <p>{MERCHANDISE[inventoryItem].description}</p>

              <div className="flex gap-2 mt-2">
                <div className="badge badge-secondary">
                  Price: {price * quantity} dbl
                </div>
              </div>

              <div className="card-actions justify-end mt-4 gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAccept(inventoryItem)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
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
