"use client"

import { FaChartBar } from "react-icons/fa"
import { IoArrowBack } from "react-icons/io5"

import useDrawer from "@/app/stores/drawer"
import type { StatisticsSeries } from "@/components/charts/chartConfig"
import StatisticsAreaChart from "@/components/charts/StatisticsAreaChart"
import StatisticsSeriesChart from "@/components/charts/StatisticsSeriesChart"
import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useGetStatistics } from "@/hooks/queries/useStatistics"
import { withMetrics } from "@/utils/statistics"

const cannonSeries: StatisticsSeries[] = [
  { metric: "mannedCannons", label: "Manned", color: "var(--gold)" },
  { metric: "cannons", label: "Owned", color: "var(--primary)" },
]

const battleSeries: StatisticsSeries[] = [
  { metric: "battlesWon", label: "Won", color: "var(--success)" },
  { metric: "battlesLost", label: "Lost", color: "var(--destructive)" },
]

const scoreSeries: StatisticsSeries[] = [
  { metric: "scoreTitle", label: "Title", color: "var(--chart-1)" },
  { metric: "scoreWealth", label: "Wealth", color: "var(--chart-2)" },
  { metric: "scoreShips", label: "Ships", color: "var(--chart-3)" },
  { metric: "scoreCannons", label: "Cannons", color: "var(--chart-4)" },
]

const metricsOf = (series: StatisticsSeries[]) =>
  series.map(({ metric }) => metric)

const StatisticsDrawer = () => {
  const { data: player } = useGetPlayer()
  const { data: stats = [] } = useGetStatistics(player?.id)

  const { open: openDrawer } = useDrawer()

  // A chart needs at least two snapshots to draw a line
  const charts = [
    {
      title: "Score",
      entries: withMetrics(stats, metricsOf(scoreSeries)),
      render: (entries: typeof stats, delay: number) => (
        <StatisticsSeriesChart
          title="Score"
          series={scoreSeries}
          entries={entries}
          delay={delay}
          stacked
        />
      ),
    },
    {
      title: "Net worth",
      entries: withMetrics(stats, ["netWorth"]),
      render: (entries: typeof stats, delay: number) => (
        <StatisticsAreaChart
          metric="netWorth"
          label="Net worth"
          entries={entries}
          delay={delay}
        />
      ),
    },
    {
      title: "Cannons",
      entries: withMetrics(stats, metricsOf(cannonSeries)),
      render: (entries: typeof stats, delay: number) => (
        <StatisticsSeriesChart
          title="Cannons"
          series={cannonSeries}
          entries={entries}
          delay={delay}
        />
      ),
    },
    {
      title: "Battles",
      entries: withMetrics(stats, metricsOf(battleSeries)),
      render: (entries: typeof stats, delay: number) => (
        <StatisticsSeriesChart
          title="Battles"
          series={battleSeries}
          entries={entries}
          delay={delay}
        />
      ),
    },
  ].filter(({ entries }) => entries.length >= 2)

  return (
    <>
      <h1 className="mb-4 flex items-center gap-2 font-serif text-2xl">
        <FaChartBar className="text-accent" />
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

      {!charts.length ? (
        <div className="text-muted-foreground">
          Not enough data collected yet. Statistics are recorded each time you
          arrive at a destination.
        </div>
      ) : (
        <div className="space-y-8">
          {charts.map(({ title, entries, render }, index) => (
            <section key={title}>
              <h2 className="mb-2 font-serif text-lg">{title}</h2>

              {render(entries, index * 50)}
            </section>
          ))}
        </div>
      )}
    </>
  )
}

export default StatisticsDrawer
