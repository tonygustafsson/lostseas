import { GetServerSideProps } from "next"

import DefaultLayout from "@/components/layouts/default"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"
import { capitalize } from "@/utils/string"

const Inventory = () => {
  const { data: player } = useGetPlayer()

  const rows = Object.entries(player?.inventory || []) as [
    keyof Inventory,
    number
  ][]

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-serif text mb-8">Inventory</h1>

      <div className="flex flex-wrap gap-4">
        {rows.map(([item, possession]) => (
          <div
            className="stat shadow-md hover:shadow-lg w-52 bg-gray-800 rounded-lg"
            key={`inventory-${item}`}
          >
            <div className="stat-figure text-secondary">
              <MerchandiseIcon item={item as keyof Inventory} size="5xl" />
            </div>
            <div className="stat-title">{capitalize(item)}</div>
            <div className="stat-value">
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
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Inventory
