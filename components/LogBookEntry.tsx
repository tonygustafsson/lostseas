import { Coins, Landmark } from "lucide-react"
import type { ReactNode } from "react"
import {
  GiCannon,
  GiCardRandom,
  GiCompass,
  GiCrossedSwords,
  GiLaurelsTrophy,
  GiOpenTreasureChest,
  GiPirateHat,
  GiQuillInk,
  GiScrollUnfurled,
  GiShipWheel,
  GiSinkingShip,
} from "react-icons/gi"

import type { LogEntry } from "@/firebase/db"
import { cn } from "@/lib/utils"
import { toDateTime } from "@/utils/date"

type EntryStyle = { icon: ReactNode; color: string; notable?: true }

// Notable entries get a colour and stand out, routine ones stay muted
const TYPE_STYLE: Record<LogType, EntryStyle> = {
  victory: {
    icon: <GiCrossedSwords />,
    color: "text-success",
    notable: true,
  },
  defeat: {
    icon: <GiSinkingShip />,
    color: "text-destructive",
    notable: true,
  },
  honour: { icon: <GiLaurelsTrophy />, color: "text-gold", notable: true },
  beginning: { icon: <GiScrollUnfurled />, color: "text-gold", notable: true },
  loot: { icon: <GiOpenTreasureChest />, color: "text-gold" },
  attack: { icon: <GiCannon />, color: "text-accent" },
  voyage: { icon: <GiCompass />, color: "text-accent" },
  bank: { icon: <Landmark />, color: "text-muted-foreground" },
  trade: { icon: <Coins />, color: "text-muted-foreground" },
  ship: { icon: <GiShipWheel />, color: "text-muted-foreground" },
  crew: { icon: <GiPirateHat />, color: "text-muted-foreground" },
  cards: { icon: <GiCardRandom />, color: "text-muted-foreground" },
}

const UNTYPED_STYLE: EntryStyle = {
  icon: <GiQuillInk />,
  color: "text-muted-foreground",
}

type Props = {
  entry: LogEntry
}

export default function LogBookEntry({ entry }: Props) {
  const { icon, color, notable } =
    (entry.type && TYPE_STYLE[entry.type]) || UNTYPED_STYLE

  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className={cn(
          "bg-card ring-border absolute top-0 -left-12 flex size-8 items-center justify-center rounded-full ring-1 [&_svg]:size-4",
          notable && "ring-current",
          color
        )}
      >
        {icon}
      </span>

      <p className={cn("text-sm", notable && "font-semibold")}>
        {entry.message}
      </p>

      <time
        dateTime={new Date(entry.timestamp).toISOString()}
        className="text-muted-foreground text-xs"
      >
        {toDateTime(new Date(entry.timestamp))}
      </time>
    </li>
  )
}
