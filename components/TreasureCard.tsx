import { GiOpenTreasureChest } from "react-icons/gi"

import TreasureIcon from "@/components/TreasureIcon"
import { Card } from "@/components/ui/card"
import { TREASURES } from "@/constants/treasures"
import { formatGold } from "@/utils/number"

type Props = {
  treasure: Treasure
}

export default function TreasureCard({ treasure }: Props) {
  const treasureInfo = TREASURES.find(({ name }) => name === treasure.name)

  return (
    <Card className="ring-gold/40 relative gap-2 p-4 pt-6">
      {/* A strip of polished gold marks it as something special */}
      <span
        aria-hidden="true"
        className="gilded-bar absolute inset-x-0 top-0 h-1"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-6 -rotate-12 opacity-15 [&_svg]:size-32"
      >
        <TreasureIcon item={treasure.name} className="text-gold" />
      </span>

      <p className="text-gold relative flex items-center gap-2 text-xs tracking-wide uppercase">
        <GiOpenTreasureChest aria-hidden="true" className="size-4" />
        Treasure
      </p>

      <p className="relative font-serif text-xl font-semibold">
        {treasure.name}
      </p>

      {treasureInfo?.description && (
        <p className="text-muted-foreground relative text-sm">
          {treasureInfo.description}
        </p>
      )}

      <p className="relative mt-2 text-sm">
        Bring it to the governor of {treasure.rewarder} for a reward of{" "}
        <span className="text-gold font-semibold">
          {formatGold(treasureInfo?.value)}
        </span>
        .
      </p>
    </Card>
  )
}
