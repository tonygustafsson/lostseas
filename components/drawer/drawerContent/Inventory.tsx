"use client"

import { GiOpenedFoodCan } from "react-icons/gi"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

const InventoryDrawer = () => {
  const { data: player } = useGetPlayer()

  const inventoryItems = Object.entries(player?.inventory || {}) as [
    keyof Inventory,
    number,
  ][]
  const inventorySections = [
    {
      title: "Necessities",
      items: inventoryItems.filter(([item]) => MERCHANDISE[item].isNecessity),
    },
    {
      title: "Barter goods",
      items: inventoryItems.filter(([item]) => MERCHANDISE[item].isBarterGoods),
    },
    {
      title: "Utilities",
      items: inventoryItems.filter(([item]) => MERCHANDISE[item].isUtility),
    },
  ]

  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <GiOpenedFoodCan className="text-accent" />
        Inventory
      </h1>

      <div className="pb-8">
        {inventorySections.map(({ title, items }) =>
          items.length > 0 ? (
            <section key={title}>
              <h2
                className={`${title === "Necessities" ? "" : "mt-8"} mb-4 font-serif text-xl`}
              >
                {title}
              </h2>

              <div
                className={`grid grid-cols-2 gap-2 ${title === "Necessities" ? "md:grid-cols-2" : "md:grid-cols-3"}`}
              >
                {items.map(([item, possession]) => (
                  <div
                    className="flex items-center justify-between rounded-lg bg-neutral-900 p-4 shadow-md hover:shadow-lg"
                    key={`inventory-${item}`}
                  >
                    <div>
                      <div
                        className={`text-muted-foreground ${title === "Necessities" ? "text-xs md:text-sm" : "text-sm"}`}
                      >
                        {item === "repairKits"
                          ? "Repair kits"
                          : capitalize(item)}
                      </div>
                      <div
                        className={`mt-1 ${title === "Necessities" ? "text-xs md:text-xl" : "text-xl"}`}
                      >
                        {possession}{" "}
                        <span
                          className={`ml-1 font-normal ${title === "Necessities" ? "text-xs md:text-sm" : "text-sm"}`}
                        >
                          {possession === 1
                            ? MERCHANDISE[item].singleUnit
                            : MERCHANDISE[item].unit}
                        </span>
                      </div>
                    </div>
                    <MerchandiseIcon
                      item={item as keyof Inventory}
                      className="text-accent ml-4"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null
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
                        className="text-accent ml-4"
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
    </>
  )
}

export default InventoryDrawer
