import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { useTavern } from "@/hooks/queries/useTavern"
import { capitalize } from "@/utils/string"

type Props = {
  player?: Player
  item: keyof typeof TAVERN_ITEMS
}

const ShopItem = ({ player, item }: Props) => {
  const { buy } = useTavern()

  const merchandise = TAVERN_ITEMS[item]
  const price = merchandise.price * (player?.crewMembers.count || 0)
  const buyingDisabled = price > (player?.character.gold || Infinity)

  const handlePurchase = () => {
    buy({ item })
  }

  return (
    <MerchandiseCard
      key={`market-${item}`}
      title={capitalize(item)}
      icon={<MerchandiseIcon item={item} />}
      disabled={buyingDisabled}
      body={
        <>
          <p>{TAVERN_ITEMS[item].description}</p>

          <div className="flex gap-2 mt-2">
            <div className="badge badge-secondary">Price: {price} gold</div>
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
