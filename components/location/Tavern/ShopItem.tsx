import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { useTavern } from "@/hooks/queries/useTavern"

type Props = {
  player?: Player
  item: keyof typeof TAVERN_ITEMS
}

const ShopItem = ({ player, item }: Props) => {
  const { treatCrew } = useTavern()

  const merchandise = TAVERN_ITEMS[item]
  const price = merchandise.price * (player?.crewMembers.count || 0)
  const treatmentDisabled = price > (player?.character.gold || 0)

  const handleTreatCrew = () => {
    treatCrew({ item })
  }

  return (
    <MerchandiseCard
      key={`tavern-${item}`}
      title={merchandise.label}
      image={`/img/cards/tavern/${item}.png`}
      icon={<MerchandiseIcon item={item} />}
      disabled={treatmentDisabled}
      body={
        <>
          <p>{merchandise.description}</p>

          <Badge variant="secondary" className="mt-4">
            Price: {price} gold
          </Badge>
        </>
      }
      actions={
        <Button size="sm" onClick={handleTreatCrew}>
          {merchandise.label}
        </Button>
      }
    />
  )
}

export default ShopItem
