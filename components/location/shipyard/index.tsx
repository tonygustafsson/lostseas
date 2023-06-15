import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"
import { capitalize } from "@/utils/string"

const Shipyard = () => {
  const { data: player } = useGetPlayer()
  const { buy } = useShipyard()

  const handleBuy = (item: keyof typeof SHIP_TYPES) => {
    buy({ playerId: player?.id || "", item })
  }

  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(SHIP_TYPES).map(
        ([shipType, { description, buy, sell }]) => (
          <MerchandiseCard
            key={`shipyard-${shipType}`}
            title={capitalize(shipType)}
            //indicator={player?.inventory[inventoryItem]?.toString() || "0"}
            icon={<MerchandiseIcon size="lg" item={shipType} />}
            body={
              <>
                <p>{description}</p>

                <div className="flex gap-2 mt-2">
                  <div className="badge badge-secondary">Buy: {buy} dbl</div>
                  <div className="badge badge-secondary">Sell: {sell} dbl</div>
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
        )
      )}
    </div>
  )
}

export default Shipyard
