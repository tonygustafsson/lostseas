import { Users } from "lucide-react"
import Image from "next/image"
import { GiCargoCrate } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import { SHIP_TYPES } from "@/constants/ship"
import { formatGold, formatNumber } from "@/utils/number"

type Props = {
  type: ShipType
  /** Why the ship can't be bought, shown above the button */
  problem?: string | null
  isBuying?: boolean
  onBuy: () => void
}

/**
 * A ship on the slipway. Buying one is a big moment, so the picture fills the
 * card with the name over it and a price tag pinned to the corner.
 */
const ShipForSale = ({ type, problem, isBuying, onBuy }: Props) => {
  const { description, buy, cargoCapacity, minCrewMembers, maxCrewMembers } =
    SHIP_TYPES[type]

  return (
    <li className="bg-card border-sea/20 flex flex-col overflow-hidden rounded-xl border">
      <div className="relative aspect-4/3 overflow-hidden select-none">
        <Image
          src={`/img/cards/shipyard/${type.toLowerCase()}.png`}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />

        <div className="to-card absolute inset-0 bg-linear-to-b from-transparent from-40%" />

        <p className="bg-background/80 text-gold absolute top-3 right-3 rounded-full border px-3 py-1 text-sm font-semibold tabular-nums backdrop-blur-sm">
          {formatGold(buy)}
        </p>

        <div className="absolute inset-x-4 bottom-3 flex flex-col gap-1">
          <h3 className="text-parchment font-serif text-3xl font-bold">
            {type}
          </h3>

          <p className="text-foreground/80 text-sm">{description}</p>
        </div>
      </div>

      <dl className="text-muted-foreground flex gap-6 px-4 pt-2 text-sm">
        <div className="flex items-center gap-2">
          {/* The text is trimmed to its letters, so the icon centres on them
              and not on the serif font's extra space above and below */}
          <dt className="flex">
            <Users aria-hidden="true" className="text-sea size-4" />
            <span className="sr-only">Crew</span>
          </dt>
          <dd className="text-foreground tabular-nums [text-box:trim-both_cap_alphabetic]">
            {minCrewMembers}–{maxCrewMembers} crew
          </dd>
        </div>

        <div className="flex items-center gap-2">
          <dt className="flex">
            <GiCargoCrate aria-hidden="true" className="text-sea size-4" />
            <span className="sr-only">Cargo</span>
          </dt>
          <dd className="text-foreground tabular-nums [text-box:trim-both_cap_alphabetic]">
            {formatNumber(cargoCapacity)} cargo
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-col gap-2 p-4">
        {problem && <p className="text-error text-xs">{problem}</p>}

        <Button
          variant="secondary"
          onClick={onBuy}
          disabled={!!problem || isBuying}
        >
          Buy for {formatGold(buy)}
        </Button>
      </div>
    </li>
  )
}

export default ShipForSale
