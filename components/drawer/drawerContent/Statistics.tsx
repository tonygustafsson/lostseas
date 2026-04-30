"use client"

import { FaChartBar } from "react-icons/fa"
import { IoArrowBack } from "react-icons/io5"

import useDrawer from "@/app/stores/drawer"
import StatisticsAreaChart, {
  ChartDataPoint,
} from "@/components/charts/StatisticsAreaChart"
import { Button } from "@/components/ui/button"
import { StatisticsEntry } from "@/firebase/db"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useGetStatistics } from "@/hooks/queries/useStatistics"

const availableMetrics: (keyof StatisticsEntry)[] = [
  "gold",
  "score",
  "crewMembers",
  "ships",
]

const StatisticsDrawer = () => {
  const { data: player } = useGetPlayer()
  const { data: stats } = useGetStatistics(player?.id)

  const { open: openDrawer } = useDrawer()

  return (
    <>
      <h1 className="mb-4 flex items-center gap-2 font-serif text-2xl">
        <FaChartBar className="text-yellow-400" />
        Statistics
      </h1>

      <Button
        variant="secondary"
        className="mb-4"
        onClick={() => openDrawer("status")}
      >
        <IoArrowBack />
        Back to Status
      </Button>

      {!stats?.length ? (
        <div className="text-muted-foreground">No statistics available.</div>
      ) : stats.length < 2 ? (
        <div className="text-muted-foreground">
          Not enough data collected yet
        </div>
      ) : (
        <div>
          <div className="space-y-6">
            {availableMetrics.map((metric) => (
              <StatisticsAreaChart
                key={metric}
                data={Object.values(stats).reduce((acc, entry) => {
                  // Only include entries that have a value for the current metric
                  acc.push({
                    day: entry.day,
                    [metric]: entry[metric],
                    timestamp: entry.timestamp,
                  } as ChartDataPoint)
                  return acc
                }, [] as ChartDataPoint[])}
                metric={metric}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default StatisticsDrawer
