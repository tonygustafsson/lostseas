"use client"

import { AiOutlineCalendar } from "react-icons/ai"
import { BiFemaleSign, BiMaleSign, BiTime } from "react-icons/bi"
import { FaChartBar, FaCoins } from "react-icons/fa"
import {
  GiCrossedSwords,
  GiPiggyBank,
  GiPirateCoat,
  GiProgression,
  GiQuillInk,
  GiReceiveMoney,
} from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"
import Flag from "@/components/icons/Flag"
import StatTile from "@/components/StatTile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { NATIONS } from "@/constants/locations"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { convertDaysToTimeSpan, getCurrentDate } from "@/utils/date"
import { getScore } from "@/utils/score"

const chipClass = "h-7 gap-2 px-3 text-sm [&>svg]:size-4!"

const StatusDrawer = () => {
  const { data: player } = useGetPlayer()
  const { open: openDrawer } = useDrawer()

  if (!player) {
    return null
  }

  const { character } = player
  const enemy = NATIONS[character.nationality].warWith

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

        <div className="relative">
          <p className="text-accent text-xs tracking-wide uppercase">
            {character.title}
          </p>
          <p className="font-serif text-2xl font-semibold">{character.name}</p>
        </div>

        <div className="relative flex flex-wrap gap-2">
          <Badge variant="secondary" className={chipClass}>
            <BiTime />
            {character.age} years
          </Badge>

          <Badge variant="secondary" className={chipClass}>
            {character.gender === "Male" ? <BiMaleSign /> : <BiFemaleSign />}
            {character.gender}
          </Badge>

          <Badge variant="secondary" className={chipClass}>
            <Flag nation={character.nationality} size={16} decorative />
            {character.nationality}
          </Badge>

          <Badge variant="secondary" className={chipClass}>
            <GiCrossedSwords />
            At war with {enemy}
            <Flag nation={enemy} size={16} decorative />
          </Badge>
        </div>

        <div className="relative flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => openDrawer("editCharacter")}
          >
            <GiQuillInk />
            Change character
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => openDrawer("statistics")}
            title="Open statistics"
          >
            <FaChartBar />
            Statistics
          </Button>
        </div>
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

      <h2 className="mt-8 mb-4 font-serif text-xl">Economy</h2>

      <div className="@container">
        <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
          <StatTile
            label="Gold"
            value={character.gold}
            unit="gold"
            icon={<FaCoins />}
          />

          {!!character.account && (
            <StatTile
              label="Account"
              value={character.account}
              unit="gold"
              icon={<GiPiggyBank />}
            />
          )}

          {!!character.loan && (
            <StatTile
              label="Loan"
              value={character.loan}
              unit="gold"
              icon={<GiReceiveMoney />}
            />
          )}
        </div>
      </div>

      {!!Object.keys(character.battles || {}).length && (
        <>
          <h2 className="mt-8 mb-4 font-serif text-xl">Battles</h2>

          <div className="@container">
            <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
              {Object.entries(character.battles || {}).map(
                ([nation, { won = 0, lost = 0 }]) => (
                  <Card
                    key={`battles-${nation}`}
                    className="shadow-background/20 relative gap-2 p-4 shadow-lg"
                  >
                    <Flag
                      decorative
                      nation={nation as Nation}
                      size={64}
                      className="pointer-events-none absolute -right-2 -bottom-2 -rotate-12 opacity-25"
                    />

                    <p className="text-muted-foreground relative flex items-center gap-2 text-xs tracking-wide uppercase">
                      <Flag nation={nation as Nation} size={16} decorative />
                      {nation === "Pirate" ? "Pirates" : nation}
                    </p>

                    <p className="relative font-serif text-lg font-semibold">
                      {won}
                      <span className="text-muted-foreground mx-1 text-sm font-normal">
                        won
                      </span>
                      {lost}
                      <span className="text-muted-foreground ml-1 text-sm font-normal">
                        lost
                      </span>
                    </p>

                    <Progress
                      value={won + lost ? (won / (won + lost)) * 100 : 0}
                      className="relative h-1 w-2/3"
                      aria-label={`Win rate against ${nation}`}
                    />
                  </Card>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default StatusDrawer
