"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { AiOutlineCalendar } from "react-icons/ai"
import { BiFemaleSign, BiMaleSign, BiTime } from "react-icons/bi"
import { FaChartBar, FaCoins } from "react-icons/fa"
import {
  GiCrossedSwords,
  GiPiggyBank,
  GiPirateCoat,
  GiProgression,
  GiReceiveMoney,
} from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"
import GodMode from "@/components/godmode"
import Flag from "@/components/icons/Flag"
import StatTile from "@/components/StatTile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getCharacterById } from "@/constants/characters"
import { NATIONS } from "@/constants/locations"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { convertDaysToTimeSpan, getCurrentDate } from "@/utils/date"
import { getScore } from "@/utils/score"

const chipClass = "h-6 gap-1 px-2 text-xs [&>svg]:size-3!"

const GOD_MODE_CLICKS = 3
const GOD_MODE_MAX_CLICK_GAP_MS = 2000

const StatusDrawer = () => {
  const { data: player } = useGetPlayer()
  const { open: openDrawer } = useDrawer()
  const [godModeOpen, setGodModeOpen] = useState(false)
  const titleClicks = useRef({ count: 0, last: 0 })

  const handleTitleClick = () => {
    const now = Date.now()
    const clicks = titleClicks.current

    clicks.count =
      now - clicks.last > GOD_MODE_MAX_CLICK_GAP_MS ? 1 : clicks.count + 1
    clicks.last = now

    if (clicks.count >= GOD_MODE_CLICKS) {
      clicks.count = 0
      setGodModeOpen(true)
    }
  }

  if (!player) {
    return null
  }

  const { character } = player
  const enemy = NATIONS[character.nationality].warWith
  const characterInfo = getCharacterById(character.characterId)

  return (
    <>
      <h1
        className="mb-6 flex items-center gap-2 font-serif text-2xl select-none"
        onClick={handleTitleClick}
      >
        <GiPirateCoat className="text-accent" />
        Status
      </h1>

      <GodMode open={godModeOpen} onOpenChange={setGodModeOpen} />

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

        <div className="relative flex flex-wrap gap-2">
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
