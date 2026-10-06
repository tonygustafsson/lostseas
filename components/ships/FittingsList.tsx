"use client"

import useModal from "@/app/stores/modals"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import RepairShipForm from "@/components/ships/RepairShipForm"
import { Button } from "@/components/ui/button"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

export default function FittingsList() {
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()

  if (!player) {
    return null
  }

  const hasDamagedShips = Object.values(player.ships || {}).some(
    (ship) => ship.health < 100
  )

  return (
    <div className="grid grid-cols-2 gap-4">
      {(["cannons", "repairKits"] as const).map((item) => {
        const quantity = player.inventory?.[item] ?? 0

        return (
          <div
            key={item}
            className="flex items-center justify-between gap-2 rounded-lg bg-neutral-900 p-4 shadow-md"
          >
            <div>
              <div className="text-muted-foreground text-sm">
                {item === "repairKits" ? "Repair kits" : capitalize(item)}
              </div>

              <div>
                {quantity}{" "}
                <span className="ml-1 text-sm font-normal">
                  {quantity === 1
                    ? MERCHANDISE[item].singleUnit
                    : MERCHANDISE[item].unit}
                </span>
              </div>

              {item === "repairKits" && (
                <Button
                  className="mt-2"
                  variant="secondary"
                  size="xs"
                  disabled={quantity === 0 || !hasDamagedShips}
                  onClick={() =>
                    setModal({
                      id: "repairShip",
                      title: "Use repair kits",
                      content: <RepairShipForm />,
                    })
                  }
                >
                  Use
                </Button>
              )}
            </div>

            <MerchandiseIcon
              size="lg"
              item={item}
              className="text-accent shrink-0"
            />
          </div>
        )
      })}
    </div>
  )
}
