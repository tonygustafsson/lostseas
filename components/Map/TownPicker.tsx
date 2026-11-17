"use client"

import { useState } from "react"
import { GiCompass } from "react-icons/gi"

import Flag from "@/components/icons/Flag"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TOWNS } from "@/constants/locations"
import { cn } from "@/lib/utils"
import { getDistanceKm, getJourneyLength } from "@/utils/journey"
import { getNationName, getTownName } from "@/utils/location"

type Props = {
  currentTown: Town
  /** How many days the player's food and water lasts */
  suppliesDays?: number
  onSelectTown: (town: Town) => void
  className?: string
}

/** Picks a destination from a list, nearest first, for when the map is fiddly */
const TownPicker = ({
  currentTown,
  suppliesDays = Infinity,
  onSelectTown,
  className,
}: Props) => {
  const [open, setOpen] = useState(false)

  const towns = (Object.keys(TOWNS) as Town[])
    .filter((town) => town !== currentTown)
    .map((town) => ({
      town,
      km: getDistanceKm(currentTown, town),
      days: getJourneyLength(currentTown, town),
    }))
    .sort((a, b) => a.km - b.km)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          "bg-card/90 border-border rounded-md border p-1",
          className
        )}
        // Keeps the map underneath from starting a drag
        onPointerDown={(event) => event.stopPropagation()}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Pick a destination from a list"
          >
            <GiCompass />
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent align="end" className="max-h-96 w-72 overflow-y-auto p-1">
        <ul>
          {towns.map(({ town, km, days }) => {
            const { nation } = TOWNS[town]
            const isOutOfReach = days > suppliesDays

            return (
              <li key={town}>
                <button
                  type="button"
                  className={cn(
                    "hover:bg-muted focus-visible:bg-muted flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left outline-none",
                    isOutOfReach && "text-muted-foreground opacity-60"
                  )}
                  onClick={() => {
                    setOpen(false)
                    onSelectTown(town)
                  }}
                >
                  <Flag nation={nation} size={24} decorative />

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-bold">
                      {getTownName(town)}
                    </span>

                    <span className="text-muted-foreground text-xs">
                      {getNationName(nation)}
                    </span>
                  </span>

                  <span className="flex flex-col items-end text-xs tabular-nums">
                    <span>
                      {days} {days === 1 ? "day" : "days"}
                    </span>

                    <span className="text-muted-foreground">
                      {km.toLocaleString("en-GB")} km
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default TownPicker
