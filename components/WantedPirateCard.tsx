import { GiHandcuffs, GiPirateCaptain } from "react-icons/gi"

import { Card } from "@/components/ui/card"
import { getPirateCrime } from "@/utils/createWantedPirate"
import { formatGold } from "@/utils/number"

type Props = {
  pirate: WantedPirate
}

export default function WantedPirateCard({ pirate }: Props) {
  const crime = getPirateCrime(pirate)

  return (
    <Card className="ring-warning/40 relative gap-2 p-4 pt-6">
      <span
        aria-hidden="true"
        className="bg-warning absolute inset-x-0 top-0 h-0.5"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-6 -rotate-12 opacity-15 [&_svg]:size-32"
      >
        <GiPirateCaptain className="text-warning" />
      </span>

      <p className="text-warning relative flex items-center gap-2 text-xs tracking-wide uppercase">
        <GiHandcuffs aria-hidden="true" className="size-4" />
        Wanted
      </p>

      <p className="relative font-serif text-xl font-semibold">{pirate.name}</p>

      {crime?.description && (
        <p className="text-muted-foreground relative text-sm">
          {crime.description}
        </p>
      )}

      <p className="relative mt-2 text-sm">
        Bring them to the governor of {pirate.rewarder} for a bounty of{" "}
        <span className="text-gold font-semibold">
          {formatGold(crime?.bounty)}
        </span>
        .
      </p>
    </Card>
  )
}
