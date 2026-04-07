"use client"

import { GiOpenedFoodCan } from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

const InventoryDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "inventory"
  const { data: player } = useGetPlayer()

  const necessities = Object.entries(player?.inventory || []).filter((item) =>
    ["food", "water"].includes(item[0])
  ) as [keyof Inventory, number][]

  const tradingAssets = Object.entries(player?.inventory || []).filter(
    (item) => !["food", "water", "cannons"].includes(item[0])
  ) as [keyof Inventory, number][]

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <GiOpenedFoodCan className="text-yellow-400" />
        Inventory
      </h1>

      <div className="pb-8">
        <h2 className="mb-4 font-serif text-xl">Necessities</h2>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
          {necessities.map(([item, possession]) => (
            <div
              className="flex items-center justify-between rounded-lg bg-neutral-900 p-4 shadow-md hover:shadow-lg"
              key={`inventory-${item}`}
            >
              <div>
                <div className="text-muted-foreground text-xs md:text-sm">
                  {capitalize(item)}
                </div>
                <div className="mt-1 text-xs md:text-xl">
                  {possession}{" "}
                  <span className="ml-1 text-xs font-normal md:text-sm">
                    {possession === 1
                      ? MERCHANDISE[item].singleUnit
                      : MERCHANDISE[item].unit}
                  </span>
                </div>
              </div>
              <MerchandiseIcon
                item={item as keyof Inventory}
                className="ml-4 text-yellow-400"
              />
            </div>
          ))}
        </div>

        {!!tradingAssets.length && (
          <>
            <h2 className="mt-8 mb-4 font-serif text-xl">Trading assets</h2>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {tradingAssets.map(([item, possession]) => (
                <div
                  className="flex items-center justify-between rounded-lg bg-neutral-900 p-4 shadow-md hover:shadow-lg"
                  key={`inventory-${item}`}
                >
                  <div>
                    <div className="text-muted-foreground text-sm">
                      {capitalize(item)}
                    </div>
                    <div className="mt-1 text-xl">
                      {possession}{" "}
                      <span className="ml-1 text-sm font-normal">
                        {possession === 1
                          ? MERCHANDISE[item].singleUnit
                          : MERCHANDISE[item].unit}
                      </span>
                    </div>
                  </div>
                  <MerchandiseIcon
                    item={item as keyof Inventory}
                    className="ml-4 text-yellow-400"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {!!Object.keys(player?.treasures || {}).length && (
          <>
            <h2 className="mt-8 mb-4 font-serif text-xl">Treasures</h2>
            <div className="flex flex-wrap gap-4">
              {Object.values(player?.treasures || {}).map((item) => {
                const treasureInfo = TREASURES.find(
                  (treasure) => treasure.name === item.name
                )

                return (
                  <div
                    className="flex w-full flex-col gap-3 rounded-lg bg-gray-800 p-4 shadow-md hover:shadow-lg"
                    key={`inventory-${item.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xl font-semibold">{item.name}</p>
                        <p className="mt-2 text-sm">
                          {treasureInfo?.description}
                        </p>
                      </div>
                      <TreasureIcon
                        size="lg"
                        item={item.name}
                        className="ml-4 text-yellow-400"
                      />
                    </div>
                    <p className="mt-2 font-bold">
                      Bring it to the governor of {item.rewarder} for a reward
                      of {treasureInfo?.value} gold.
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </DrawerPanel>
  )
}

export default InventoryDrawer
