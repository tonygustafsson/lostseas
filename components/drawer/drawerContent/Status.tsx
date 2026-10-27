"use client"

import { Anchor, Coins, Landmark, Sailboat, ScrollText } from "lucide-react"
import Image from "next/image"
import { AiOutlineCalendar } from "react-icons/ai"
import { BiFemaleSign, BiMaleSign, BiTime } from "react-icons/bi"
import {
  GiCrossedSwords,
  GiLaurelsTrophy,
  GiPirateCoat,
  GiProgression,
  GiSinkingShip,
  GiTwoCoins,
} from "react-icons/gi"

import BattleRecordChart from "@/components/charts/BattleRecordChart"
import ChartCard from "@/components/charts/ChartCard"
import {
  metricsOf,
  type StatisticsSeries,
} from "@/components/charts/chartConfig"
import StatisticsAreaChart from "@/components/charts/StatisticsAreaChart"
import StatisticsSeriesChart from "@/components/charts/StatisticsSeriesChart"
import Flag from "@/components/icons/Flag"
import StatTile from "@/components/StatTile"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getCharacterById } from "@/constants/characters"
import { NATIONS } from "@/constants/locations"
import { VENTURES } from "@/constants/ventures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useGetStatistics } from "@/hooks/queries/useStatistics"
import { convertDaysToTimeSpan, getCurrentDate } from "@/utils/date"
import { formatGold } from "@/utils/number"
import { getScore } from "@/utils/score"
import { getBattleTotals, withMetrics } from "@/utils/statistics"

const chipClass = "h-6 gap-1 px-2 text-xs [&>svg]:size-3!"

const scoreSeries: StatisticsSeries[] = [
  { metric: "scoreTitle", label: "Title", color: "var(--chart-1)" },
  { metric: "scoreWealth", label: "Wealth", color: "var(--chart-2)" },
  { metric: "scoreShips", label: "Ships", color: "var(--chart-3)" },
  { metric: "scoreCannons", label: "Cannons", color: "var(--chart-4)" },
]

const StatusDrawer = () => {
  const { data: player } = useGetPlayer()
  const { data: stats = [] } = useGetStatistics(player?.id)

  if (!player) {
    return null
  }

  const { character } = player
  const enemy = NATIONS[character.nationality].warWith
  const battles = getBattleTotals(character.battles)

  // A chart needs at least two snapshots to draw a line
  const scoreEntries = withMetrics(stats, metricsOf(scoreSeries))
  const netWorthEntries = withMetrics(stats, ["netWorth"])
  const characterInfo = getCharacterById(character.characterId)
  const ventures = Object.entries(character.ventures || {}) as [
    VentureId,
    VentureShare,
  ][]

  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <GiPirateCoat className="text-accent" />
        Status
      </h1>

      <Card className="shadow-background/20 relative gap-4 p-6 shadow-lg">
        <Flag
          decorative
          nation={character.nationality}
          size={160}
          className="pointer-events-none absolute -top-4 -right-8 rotate-12 opacity-25"
        />

        <div className="relative grid grid-cols-[7rem_minmax(0,1fr)] gap-x-4 gap-y-2 md:grid-rows-[auto_1fr]">
          <div className="bg-muted relative size-28 shrink-0 overflow-hidden rounded-lg md:row-span-2">
            {characterInfo && (
              <Image
                src={characterInfo.image}
                alt={characterInfo.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            )}
          </div>

          <div className="col-start-2 row-start-1 flex min-w-0 flex-col gap-2">
            <p className="text-accent text-xs tracking-wide uppercase">
              {character.title}
            </p>

            <p className="font-serif text-2xl font-semibold">
              {character.name}
            </p>
          </div>

          <div className="col-span-2 row-start-2 flex flex-wrap gap-1 md:col-span-1 md:col-start-2 md:self-start">
            {characterInfo && (
              <>
                <Badge variant="secondary" className={chipClass}>
                  <BiTime />
                  {characterInfo.age} years
                </Badge>

                <Badge variant="secondary" className={chipClass}>
                  {characterInfo.gender === "Male" ? (
                    <BiMaleSign />
                  ) : (
                    <BiFemaleSign />
                  )}
                  {characterInfo.gender}
                </Badge>
              </>
            )}

            <Badge variant="secondary" className={chipClass}>
              <Flag nation={character.nationality} size={16} decorative />
              {character.nationality}
            </Badge>

            <Badge variant="secondary" className={chipClass}>
              <GiCrossedSwords />
              War with {enemy}
              <Flag nation={enemy} size={16} decorative />
            </Badge>
          </div>
        </div>

        {characterInfo && (
          <p className="text-muted-foreground relative text-sm">
            {characterInfo.description}
          </p>
        )}
      </Card>

      <div className="@container mt-4">
        <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
          <StatTile
            label="Score"
            value={getScore(player)}
            icon={<GiProgression />}
          />

          <StatTile
            label="Playing for"
            value={convertDaysToTimeSpan(character.day)}
            icon={<BiTime />}
            className="@md:col-span-2"
          />

          <StatTile
            label="Current date"
            value={getCurrentDate(character.day)}
            icon={<AiOutlineCalendar />}
            className="@md:col-span-3"
          />
        </div>
      </div>

      {scoreEntries.length >= 2 && (
        <div className="mt-4">
          <ChartCard label="Score over time" icon={<GiProgression />}>
            <StatisticsSeriesChart
              title="Score"
              series={scoreSeries}
              entries={scoreEntries}
              stacked
            />
          </ChartCard>
        </div>
      )}

      <h2 className="mt-8 mb-4 font-serif text-xl">Economy</h2>

      <div className="@container">
        <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
          <StatTile
            label="Gold"
            value={formatGold(character.gold)}
            icon={<Coins />}
          />

          <StatTile
            label="Account"
            value={formatGold(character.account)}
            icon={<Landmark />}
          />

          <StatTile
            label="Loan"
            value={formatGold(character.loan)}
            icon={<ScrollText />}
          />
        </div>
      </div>

      {netWorthEntries.length >= 2 && (
        <div className="mt-4">
          <ChartCard label="Net worth over time" icon={<GiTwoCoins />}>
            <StatisticsAreaChart
              metric="netWorth"
              label="Net worth"
              entries={netWorthEntries}
            />
          </ChartCard>
        </div>
      )}

      {!!ventures.length && (
        <>
          <h2 className="mt-8 mb-4 font-serif text-xl">Ventures</h2>

          <div className="@container">
            <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
              {ventures.map(([ventureId, share]) => {
                const daysLeft = share.returnDay - character.day
                const hasReturned = daysLeft <= 0

                return (
                  <StatTile
                    key={`venture-${ventureId}`}
                    label={VENTURES[ventureId].name}
                    value={hasReturned ? "Back in port" : daysLeft}
                    unit={
                      hasReturned
                        ? undefined
                        : `${daysLeft === 1 ? "day" : "days"} left`
                    }
                    icon={hasReturned ? <Anchor /> : <Sailboat />}
                  />
                )
              })}
            </div>
          </div>
        </>
      )}

      {battles.won + battles.lost > 0 && (
        <>
          <h2 className="mt-8 mb-4 font-serif text-xl">Battles</h2>

          <div className="@container">
            <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
              <StatTile
                label="Won"
                value={battles.won}
                icon={<GiLaurelsTrophy />}
              />

              <StatTile
                label="Lost"
                value={battles.lost}
                icon={<GiSinkingShip />}
              />

              <StatTile
                label="Win rate"
                value={`${Math.round((battles.won / (battles.won + battles.lost)) * 100)}%`}
                icon={<GiCrossedSwords />}
              />
            </div>
          </div>

          <div className="mt-4">
            <ChartCard label="Battles by nation" icon={<GiCrossedSwords />}>
              <BattleRecordChart battles={character.battles} />
            </ChartCard>
          </div>
        </>
      )}
    </>
  )
}

export default StatusDrawer
