import { GetServerSideProps } from "next"
import Head from "next/head"

import DefaultLayout from "@/components/layouts/default"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"
import { capitalize } from "@/utils/string"

const Inventory = () => {
  const { data: player } = useGetPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  const necessities = Object.entries(player?.inventory || []).filter((item) =>
    ["food", "water"].includes(item[0])
  ) as [keyof Inventory, number][]

  const tradingAssets = Object.entries(player?.inventory || []).filter(
    (item) => !["food", "water", "cannons"].includes(item[0])
  ) as [keyof Inventory, number][]

  return (
    <>
      <Head>
        <title>Inventory - Lost Seas</title>
      </Head>

      <DefaultLayout>
        <h1 className="text-3xl font-serif mb-8">Inventory</h1>

        <h2 className="text-xl font-serif mb-4">Necessities</h2>

        <div className="flex flex-wrap gap-4">
          {necessities.map(([item, possession]) => (
            <div
              className="stat shadow-md hover:shadow-lg lg:w-52 bg-gray-800 rounded-lg pr-4"
              key={`inventory-${item}`}
            >
              <div className="stat-figure text-secondary">
                <MerchandiseIcon size="lg" item={item as keyof Inventory} />
              </div>
              <div className="stat-title">{capitalize(item)}</div>
              <div className="stat-value text-2xl">
                {possession}{" "}
                <span className="text-sm">
                  {possession === 1
                    ? MERCHANDISE[item].singleUnit
                    : MERCHANDISE[item].unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {!!tradingAssets.length && (
          <>
            <h2 className="text-xl font-serif mt-8 mb-4">Trading assets</h2>

            <div className="flex flex-wrap gap-4">
              {tradingAssets.map(([item, possession]) => (
                <div
                  className="stat shadow-md hover:shadow-lg lg:w-52 bg-gray-800 rounded-lg pr-4"
                  key={`inventory-${item}`}
                >
                  <div className="stat-figure text-secondary">
                    <MerchandiseIcon size="lg" item={item as keyof Inventory} />
                  </div>
                  <div className="stat-title">{capitalize(item)}</div>
                  <div className="stat-value text-2xl">
                    {possession}{" "}
                    <span className="text-sm">
                      {possession === 1
                        ? MERCHANDISE[item].singleUnit
                        : MERCHANDISE[item].unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!!Object.keys(player.treasures || {}).length && (
          <>
            <h2 className="text-xl font-serif mt-8 mb-4">Treasures</h2>

            <div className="flex flex-wrap gap-4">
              {Object.values(player.treasures || {}).map((item) => {
                const treasureInfo = TREASURES.find(
                  (treasure) => treasure.name === item.name
                )

                return (
                  <div
                    className="stat shadow-md hover:shadow-lg lg:w-1/3 bg-gray-800 rounded-lg pr-4"
                    key={`inventory-${item}`}
                  >
                    <div className="stat-figure text-secondary">
                      <TreasureIcon size="lg" item={item.name} />
                    </div>
                    <p className="text-xl">{item.name}</p>

                    <p className="text-sm mt-2">{treasureInfo?.description}</p>

                    <p className="mt-4 font-bold">
                      Bring it to the governor of {item.rewarder} for a reward
                      of {treasureInfo?.value} gold.
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </DefaultLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Inventory
