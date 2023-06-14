import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { capitalize } from "@/utils/string"

type Props = {
  player?: Player
  item: keyof typeof TAVERN_ITEMS
}

// TODO: Make use of zod for validation, not sure how with buying and selling are two different actions

const ShopItem = ({ player, item }: Props) => {
  const merchandise = TAVERN_ITEMS[item]
  const price = merchandise.price * (player?.crewMembers.count || 0)
  const buyingDisabled = price > (player?.character.doubloons || Infinity)

  const handlePurchase = () => {
    /*     buy({
      playerId: player?.id || "",
      item,
      quantity,
    }) */
  }

  return (
    <MerchandiseCard
      key={`market-${item}`}
      title={capitalize(item)}
      icon={<MerchandiseIcon item={item} />}
      body={
        <>
          <p>{TAVERN_ITEMS[item].description}</p>

          <div className="flex gap-2 mt-2">
            <div className="badge badge-secondary">Price: {price} dbl</div>
          </div>
        </>
      }
      actions={
        <button
          className="btn btn-primary btn-sm"
          onClick={handlePurchase}
          disabled={buyingDisabled}
        >
          Buy
        </button>
      }
    />
  )
}

export default ShopItem
