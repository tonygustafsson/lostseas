import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { SHIP_TYPES } from "@/constants/ship"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardBuy = () => {
  const { buy } = useShipyard()

  const handleBuy = (item: keyof typeof SHIP_TYPES) => {
    buy({ item })
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
              onClick={() => handleBuy(shipType as keyof typeof SHIP_TYPES)}
            >
              Buy
            </button>
          }
        />
      ))}
    </div>
  )
}

export default ShipyardBuy
