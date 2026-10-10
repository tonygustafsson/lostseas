import Image from "next/image"
import { ReactNode } from "react"
import { FaUsers } from "react-icons/fa"
import { GiCannon, GiCrossedSwords } from "react-icons/gi"

import Flag from "@/components/icons/Flag"
import { Badge } from "@/components/ui/badge"
import { DialogTitle } from "@/components/ui/dialog"
import { NATIONS } from "@/constants/locations"
import { cn } from "@/lib/utils"
import { getMannedCannons } from "@/utils/crew"

type Props = {
  shipMeeting: ShipMeetingState
  crewMembers: CrewMembers["count"]
  cannons: Inventory["cannons"]
  nationality: Character["nationality"]
}

type Relation = "enemy" | "allied" | "neutral" | "pirate"

const RELATIONS: Record<
  Relation,
  { label: string; hint: string; className: string }
> = {
  enemy: {
    label: "Enemy",
    hint: "A victory raises your level",
    className: "bg-destructive/20 text-destructive",
  },
  allied: {
    label: "Allied",
    hint: "Attacking lowers your level",
    className: "bg-success/20 text-success",
  },
  neutral: {
    label: "Neutral",
    hint: "No effect on your level",
    className: "bg-secondary text-secondary-foreground",
  },
  pirate: {
    label: "Pirate",
    hint: "No effect on your level",
    className: "bg-secondary text-secondary-foreground",
  },
}

const getRelation = (
  nation: ShipMeetingState["nation"],
  nationality: Character["nationality"]
): Relation => {
  if (nation === "Pirate") return "pirate"
  if (NATIONS[nationality]?.warWith === nation) return "enemy"
  if (nation === nationality) return "allied"

  return "neutral"
}

const getTitle = (shipMeeting: ShipMeetingState, relation: Relation) => {
  if (relation === "pirate") return `You meet a Pirate ${shipMeeting.shipType}`

  const adjective =
    relation === "enemy"
      ? "an enemy "
      : relation === "allied"
        ? "an allied "
        : ""
  const article = adjective || "a "

  return `You meet ${article}${shipMeeting.shipType} from ${shipMeeting.nation}`
}

const getOdds = (difference: number) => {
  const cannons = Math.abs(difference) === 1 ? "cannon" : "cannons"

  if (difference > 0) {
    return {
      label: "Favourable odds",
      detail: `You out-gun them by ${difference} ${cannons}`,
      className: "border-success/40 bg-success/10 text-success",
    }
  }

  if (difference === 0) {
    return {
      label: "Even odds",
      detail: "Equal firepower, luck decides",
      className: "border-border bg-muted text-foreground",
    }
  }

  return {
    label: "Risky",
    detail: `They out-gun you by ${Math.abs(difference)} ${cannons}`,
    className: "border-destructive/40 bg-destructive/10 text-destructive",
  }
}

const ShipMeetingContent = ({
  shipMeeting,
  crewMembers,
  cannons,
  nationality,
}: Props) => {
  const mannedCannons = getMannedCannons(crewMembers, cannons)
  const relation = getRelation(shipMeeting.nation, nationality)
  const odds = getOdds(mannedCannons - shipMeeting.cannons)

  const shipImg = `/img/ship-meeting/${shipMeeting.nation.toLowerCase()}-${shipMeeting.shipType.toLowerCase()}.png`

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <DialogTitle className="font-serif text-xl leading-tight wrap-break-word md:text-2xl">
            {getTitle(shipMeeting, relation)}
          </DialogTitle>

          <div className="flex flex-wrap items-center gap-2">
            <Flag nation={shipMeeting.nation} size={38} />

            <Badge className={RELATIONS[relation].className}>
              {RELATIONS[relation].label}
            </Badge>

            <span className="text-muted-foreground text-sm">
              {RELATIONS[relation].hint}
            </span>
          </div>
        </div>

        <Image
          src={shipImg}
          alt={`${shipMeeting.nation} ${shipMeeting.shipType}`}
          width={162}
          height={162}
          sizes="(min-width: 640px) 144px, 120px"
          draggable={false}
          className="border-accent aspect-square w-30 max-w-3/8 shrink-0 rounded-full border-4 object-cover object-right shadow-lg select-none sm:w-36"
        />
      </div>

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <StatCard
          title="Them"
          flag={<Flag nation={shipMeeting.nation} size={20} />}
          cannons={shipMeeting.cannons}
          cannonsLabel="cannons"
          crewMembers={shipMeeting.crewMembers}
        />

        <span className="text-muted-foreground text-center font-serif text-sm">
          vs
        </span>

        <StatCard
          title="You"
          flag={<Flag nation={nationality} size={20} />}
          cannons={mannedCannons}
          cannonsLabel="manned cannons"
          crewMembers={crewMembers}
        />
      </div>

      <div
        className={cn(
          "flex items-center gap-2 rounded-md border px-4 py-2",
          odds.className
        )}
      >
        <GiCrossedSwords className="size-5 shrink-0" />

        <span className="font-serif font-bold">{odds.label}</span>
        <span className="text-sm">· {odds.detail}</span>
      </div>
    </div>
  )
}

type StatCardProps = {
  title: string
  flag: ReactNode
  cannons: number
  cannonsLabel: string
  crewMembers: number
}

const StatCard = ({
  title,
  flag,
  cannons,
  cannonsLabel,
  crewMembers,
}: StatCardProps) => (
  <div className="bg-card flex flex-1 flex-col gap-2 rounded-md border p-4">
    <div className="flex items-center gap-2 font-serif">
      {flag}
      {title}
    </div>

    <div className="flex items-center gap-2">
      <GiCannon className="size-6 shrink-0" />
      <span className="text-xl font-bold">{cannons}</span>
      <span className="text-muted-foreground text-sm">{cannonsLabel}</span>
    </div>

    <div className="flex items-center gap-2">
      <FaUsers className="size-6 shrink-0" />
      <span className="text-xl font-bold">{crewMembers}</span>
      <span className="text-muted-foreground text-sm">crew</span>
    </div>
  </div>
)

export default ShipMeetingContent
