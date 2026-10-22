"use client"

import { GiMeat, GiWaterFlask } from "react-icons/gi"

import { CardContent, CardHeader } from "../ui/card"
import MenuCard, { MenuCardChevron } from "./MenuCard"
import { StatCard } from "./StatCard"

type Props = {
  player: Player
}

const InventoryCard = ({ player }: Props) => (
  <MenuCard ariaLabel="Open inventory details" drawerId="inventory">
    <CardHeader className="flex items-center gap-2 px-2 font-serif text-lg">
      <span className="min-w-0 flex-1 truncate">Inventory</span>
      <MenuCardChevron />
    </CardHeader>

    <CardContent className="grid grid-cols-2 gap-4 px-2">
      <StatCard
        title="Food"
        value={player?.inventory?.food || 0}
        Icon={<GiMeat />}
      />
      <StatCard
        title="Water"
        value={player?.inventory?.water || 0}
        Icon={<GiWaterFlask />}
      />
    </CardContent>
  </MenuCard>
)

export default InventoryCard
