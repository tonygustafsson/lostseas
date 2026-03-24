import DefaultLayout from "@/components/layouts/default"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"
import { capitalize } from "@/utils/string"

export const metadata = {
  title: "Inventory",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  const necessities = Object.entries(player.inventory || []).filter((item) =>
    ["food", "water"].includes(item[0])
  ) as [keyof Inventory, number][]

  const tradingAssets = Object.entries(player.inventory || []).filter(
    (item) => !["food", "water", "cannons"].includes(item[0])
  ) as [keyof Inventory, number][]

  return (
    <DefaultLayout>
      <h1 className="mb-8 font-serif text-3xl">Inventory</h1>

      <h2 className="mb-4 font-serif text-xl">Necessities</h2>

      <div className="flex flex-wrap gap-4">
        {necessities.map(([item, possession]) => (
          <div
            className="flex items-center justify-between rounded-lg bg-gray-700 p-4 shadow-md hover:shadow-lg lg:w-52"
            key={`inventory-${item}`}
          >
            <div>
              <div className="text-muted-foreground text-sm">
                {capitalize(item)}
              </div>
              <div className="mt-1 text-2xl font-bold">
                {possession}{" "}
                <span className="ml-1 text-sm font-normal">
                  {possession === 1
                    ? MERCHANDISE[item].singleUnit
                    : MERCHANDISE[item].unit}
                </span>
              </div>
            </div>

            <MerchandiseIcon
              size="lg"
              item={item as keyof Inventory}
              className="text-yellow-400"
            />
          </div>
        ))}
      </div>

      {!!tradingAssets.length && (
        <>
          <h2 className="mt-8 mb-4 font-serif text-xl">Trading assets</h2>

          <div className="flex flex-wrap gap-4">
            {tradingAssets.map(([item, possession]) => (
              <div
                className="flex items-center justify-between rounded-lg bg-gray-700 p-4 shadow-md hover:shadow-lg lg:w-52"
                key={`inventory-${item}`}
              >
                <div>
                  <div className="text-muted-foreground text-sm">
                    {capitalize(item)}
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {possession}{" "}
                    <span className="ml-1 text-sm font-normal">
                      {possession === 1
                        ? MERCHANDISE[item].singleUnit
                        : MERCHANDISE[item].unit}
                    </span>
                  </div>
                </div>

                <MerchandiseIcon
                  size="lg"
                  item={item as keyof Inventory}
                  className="text-yellow-400"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {!!Object.keys(player.treasures || {}).length && (
        <>
          <h2 className="mt-8 mb-4 font-serif text-xl">Treasures</h2>

          <div className="flex flex-wrap gap-4">
            {Object.values(player.treasures || {}).map((item) => {
              const treasureInfo = TREASURES.find(
                (treasure) => treasure.name === item.name
              )

              return (
                <div
                  className="flex w-full flex-col gap-3 rounded-lg bg-gray-700 p-4 shadow-md hover:shadow-lg lg:w-1/3"
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
                      className="text-yellow-400"
                    />
                  </div>

                  <p className="mt-2 font-bold">
                    Bring it to the governor of {item.rewarder} for a reward of{" "}
                    {treasureInfo?.value} gold.
                  </p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </DefaultLayout>
  )
}
