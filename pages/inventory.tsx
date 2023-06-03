import {
  GiBrandyBottle,
  GiCoins,
  GiMeat,
  GiPorcelainVase,
  GiPowder,
  GiRolledCloth,
  GiSmokingPipe,
  GiWaterFlask,
} from "react-icons/gi"

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
            className="stat shadow-md hover:shadow-lg w-52 bg-gray-800 rounded-lg"
            key={`inventory-${item}`}
          >
            <div className="stat-figure text-secondary">
              {item === "Doubloons" && <GiCoins className="h-10 w-10" />}
              {item === "Food" && <GiMeat className="h-10 w-10" />}
              {item === "Water" && <GiWaterFlask className="h-10 w-10" />}
              {item === "Porcelain" && (
                <GiPorcelainVase className="h-10 w-10" />
              )}
              {item === "Spices" && <GiPowder className="h-10 w-10" />}
              {item === "Silk" && <GiRolledCloth className="h-10 w-10" />}
              {item === "Tobacco" && <GiSmokingPipe className="h-10 w-10" />}
              {item === "Rum" && <GiBrandyBottle className="h-10 w-10" />}
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
