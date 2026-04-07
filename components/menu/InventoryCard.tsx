"use client"

import { GiMeat, GiWaterFlask } from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"

import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { StatCard } from "./StatCard"

type Props = {
  player: Player
}

const InventoryCard = ({ player }: Props) => {
  const { open: openDrawer } = useDrawer()

  return (
    <Card className="gap-2 bg-neutral-900 p-2">
      <CardHeader className="flex items-center justify-between px-2 font-serif text-lg">
        Inventory
        <Button
          variant="outline"
          size="xs"
          onClick={() => openDrawer("inventory")}
        >
          More
        </Button>
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
    </Card>
  )
}

export default InventoryCard
