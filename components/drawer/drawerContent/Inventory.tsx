"use client"

import { GiOpenedFoodCan } from "react-icons/gi"

import InventoryItemCard from "@/components/InventoryItemCard"
import TreasureCard from "@/components/TreasureCard"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

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

              <div className="@container">
                <div className="grid grid-cols-2 gap-4 @lg:grid-cols-3">
                  {items.map(([item, possession]) => (
                    <InventoryItemCard
                      key={`inventory-${item}`}
                      item={item}
                      quantity={possession}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null
        )}

        {!!Object.keys(player?.treasures || {}).length && (
          <>
            <h2 className="mt-8 mb-4 font-serif text-xl">Treasures</h2>

            <div className="flex flex-col gap-4">
              {Object.values(player?.treasures || {}).map((treasure) => (
                <TreasureCard
                  key={`inventory-${treasure.id}`}
                  treasure={treasure}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default InventoryDrawer
