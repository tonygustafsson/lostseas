import { GiCoins, GiFoodChain, GiWaterFlask } from "react-icons/gi"

import DefaultLayout from "@/components/layouts/default"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

const Inventory = () => {
  const { data: player } = useGetPlayer()

  const rows = Object.entries(player?.inventory || []).map(
    ([item, possession]) => [capitalize(item), possession]
  )

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-serif text mb-8">Inventory</h1>

      <div className="flex flex-wrap gap-4">
        {rows.map(([item, possession]) => (
          <div
            className="stat shadow-md hover:shadow-lg w-52 bg-base-300 rounded-lg"
            key={`inventory-${item}`}
          >
            <div className="stat-figure text-secondary">
              {item === "Doubloons" && <GiCoins className="h-8 w-8" />}
              {item === "Food" && <GiFoodChain className="h-8 w-8" />}
              {item === "Water" && <GiWaterFlask className="h-8 w-8" />}
            </div>
            <div className="stat-title">{item}</div>
            <div className="stat-value">{possession}</div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  )
}

export default Inventory
