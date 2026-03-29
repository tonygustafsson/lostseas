import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

          <Badge variant="secondary" className="mt-4">
            Price: {price} gold
          </Badge>
        </>
      }
      actions={
        <Button size="sm" onClick={handlePurchase}>
          Buy
        </Button>
      }
    />
  )
}

export default ShopItem
