"use client"

import { HeartPulse } from "lucide-react"
import { GiCannon, GiShoonerSailboat } from "react-icons/gi"
import { MdGroups } from "react-icons/md"

import { CardContent, CardHeader } from "../ui/card"
import MenuCard, { MenuCardChevron } from "./MenuCard"
import { StatCard } from "./StatCard"

type Props = {
  player: Player
}

const FleetCard = ({ player }: Props) => {
  const ships = Object.values(player.ships || {})

  return (
    <MenuCard ariaLabel="Open fleet details" drawerId="fleet">
      <CardHeader className="flex items-center gap-2 px-2 font-serif text-lg">
        <span className="min-w-0 flex-1 truncate">Fleet</span>
        <MenuCardChevron />
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 px-2">
        <StatCard
          title="Ships"
          value={ships.length}
          Icon={<GiShoonerSailboat />}
        />
        <StatCard
          title="Crew"
          value={player.crewMembers.count}
          Icon={<MdGroups />}
        />
        <StatCard
          title="Cannons"
          value={player.inventory?.cannons ?? 0}
          Icon={<GiCannon />}
        />
        <StatCard
          title="Crew health"
          value={`${player.crewMembers.health}%`}
          Icon={<HeartPulse />}
        />
      </CardContent>
    </MenuCard>
  )
}

export default FleetCard
