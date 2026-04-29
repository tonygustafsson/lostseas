"use client"

import { FaChartBar } from "react-icons/fa"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useGetStatistics } from "@/hooks/queries/useStatistics"

const StatisticsDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const { data: player } = useGetPlayer()

  const isOpen = activeDrawer === "statistics"
  const { data: stats } = useGetStatistics(player?.id, isOpen)

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <h1 className="mb-4 flex items-center gap-2 font-serif text-2xl">
        <FaChartBar className="text-yellow-400" />
        Statistics
      </h1>

      {!stats?.length ? (
        <div className="text-muted-foreground">No statistics available.</div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="text-muted-foreground text-left">
                <th className="pr-4 pb-2">Date</th>
                <th className="pr-4 pb-2">Gold</th>
                <th className="pr-4 pb-2">Score</th>
                <th className="pr-4 pb-2">Crew</th>
                <th className="pr-4 pb-2">Ships</th>
                <th className="pr-4 pb-2">Food</th>
                <th className="pr-4 pb-2">Water</th>
                <th className="pr-4 pb-2">Barter</th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {stats?.map((entry, idx) => (
                <tr
                  key={`stat-${entry.timestamp}-${idx}`}
                  className="border-t border-neutral-800"
                >
                  <td className="text-muted-foreground py-2 pr-4 text-xs">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2 pr-4">{entry.gold}</td>
                  <td className="py-2 pr-4">{entry.score}</td>
                  <td className="py-2 pr-4">{entry.crewMembers}</td>
                  <td className="py-2 pr-4">{entry.noOfShips}</td>
                  <td className="py-2 pr-4">{entry.food}</td>
                  <td className="py-2 pr-4">{entry.water}</td>
                  <td className="py-2 pr-4">{entry.barterGoods}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DrawerPanel>
  )
}

export default StatisticsDrawer
