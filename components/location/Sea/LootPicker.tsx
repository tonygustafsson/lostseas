"use client"

import { useState } from "react"
import { GiShoonerSailboat } from "react-icons/gi"

import CargoMeter from "@/components/CargoMeter"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { getCargoLoad, getLootItemMax, getLootPreset } from "@/utils/cargo"
import { formatQuantity } from "@/utils/shop"
import { snakeCaseToTitleCase } from "@/utils/string"

type Loot = Partial<Record<keyof Inventory, number>>

type Props = {
  offer: Loot
  /** Cargo aboard before taking any loot. */
  load: number
  capacity: number
  isTaking?: boolean
  onTake: (loot: Loot) => void
}

const LootPicker = ({ offer, load, capacity, isTaking, onTake }: Props) => {
  const freeCargo = Math.max(0, capacity - load)
  const [choice, setChoice] = useState(() => getLootPreset(offer, freeCargo))

  const items = (Object.keys(offer) as (keyof Inventory)[]).filter(
    (item) => (offer[item] ?? 0) > 0
  )

  const change = (item: keyof Inventory, amount: number) => {
    const max = getLootItemMax(offer, choice, item, freeCargo)

    setChoice({ ...choice, [item]: Math.min(amount, max) })
  }

  return (
    <section aria-labelledby="loot-heading" className="flex flex-col gap-4">
      <div>
        <h3 id="loot-heading" className="font-serif text-xl font-semibold">
          Plunder
        </h3>

        <p className="text-muted-foreground text-sm">
          Pick what to take. Anything you leave sinks with their ship.
        </p>
      </div>

      <CargoMeter
        load={load + getCargoLoad(choice)}
        capacity={capacity}
        label="Cargo after plunder"
        className="bg-background mb-4 rounded-xl border p-4"
      />

      <ul className="flex flex-col gap-4">
        {items.map((item) => {
          const offered = offer[item] ?? 0
          const taken = choice[item] ?? 0
          const title = snakeCaseToTitleCase(item)

          return (
            <li key={item} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2">
                  <MerchandiseIcon item={item} size="sm" />
                  {title}
                </span>

                <span className="tabular-nums">
                  {taken} of {formatQuantity(item, offered)}
                </span>
              </div>

              <Slider
                aria-label={`${title} to take`}
                min={0}
                max={offered}
                step={1}
                value={[taken]}
                onValueChange={([value]) => change(item, value)}
                disabled={isTaking}
              />
            </li>
          )
        })}
      </ul>

      <Button
        variant="highlight"
        size="lg"
        className="w-full"
        disabled={isTaking}
        onClick={() => onTake(choice)}
      >
        <GiShoonerSailboat />
        Take loot and sail on
      </Button>
    </section>
  )
}

export default LootPicker
