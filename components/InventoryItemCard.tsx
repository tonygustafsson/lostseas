import MerchandiseIcon from "@/components/MerchandiseIcon"
import StatTile from "@/components/StatTile"
import { MERCHANDISE } from "@/constants/merchandise"
import { snakeCaseToTitleCase } from "@/utils/string"

type Props = {
  item: keyof Inventory
  quantity: number
}

export default function InventoryItemCard({ item, quantity }: Props) {
  const merchandise = MERCHANDISE[item]

  return (
    <StatTile
      label={snakeCaseToTitleCase(item)}
      value={quantity}
      unit={quantity === 1 ? merchandise.singleUnit : merchandise.unit}
      icon={<MerchandiseIcon item={item} />}
    />
  )
}
