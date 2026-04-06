"use client"

import { GiMeat, GiWaterFlask } from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"

import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"

type Props = {
  player: Player
}

const InventoryCard = ({ player }: Props) => {
  const { open: openDrawer } = useDrawer()

  return (
    <Card className="gap-2 bg-gray-800 p-2">
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

      <CardContent className="space-y-2 px-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Food</p>
              <p className="w-fit">{player?.inventory?.food}</p>
            </div>

            <GiMeat className="text-accent size-5" />
          </div>

          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Water</p>
              <p className="w-fit">{player?.inventory?.water}</p>
            </div>

            <GiWaterFlask className="text-accent size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InventoryCard
