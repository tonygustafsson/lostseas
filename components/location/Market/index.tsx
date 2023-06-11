import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MARKET_AVAILABLE_ITEMS } from "@/constants/market"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

const Market = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      {MARKET_AVAILABLE_ITEMS.map((item) => (
        <div
          className="card w-80 bg-base-100 shadow-xl pt-4"
          key={`market-item-${item}`}
        >
          <figure>
            <MerchandiseIcon item={item} />
          </figure>

          <div className="card-body pt-2">
            <div className="indicator">
              <h2 className="card-title mr-6">{capitalize(item)}</h2>

              <span className="indicator-item indicator-middle badge badge-primary">
                {player?.inventory[item] || 0}
              </span>
            </div>

            <p>{MERCHANDISE[item].description}</p>

            <div className="flex gap-2 mt-2">
              <div className="badge badge-secondary">
                Price: {MERCHANDISE[item].buy} dbl
              </div>
            </div>

            <div className="card-actions justify-end mt-4 gap-2">
              <button className="btn btn-primary btn-sm">Buy</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Market
