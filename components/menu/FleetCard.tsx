"use client"

import { GiShoonerSailboat } from "react-icons/gi"
import { MdGroups } from "react-icons/md"

import useDrawer from "@/app/stores/drawer"

import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { StatCard } from "./StatCard"

type Props = {
  player: Player
}

const FleetCard = ({ player }: Props) => {
  const { open: openDrawer } = useDrawer()

  return (
    <Card className="gap-2 bg-neutral-900 p-2">
      <CardHeader className="flex items-center justify-between px-2 font-serif text-lg">
        Fleet
        <Button variant="outline" size="xs" onClick={() => openDrawer("fleet")}>
          More
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 px-2">
        <StatCard
          title="Ships"
          value={Object.keys(player?.ships || {}).length}
          Icon={<GiShoonerSailboat />}
        />
        <StatCard
          title="Crew"
          value={player?.crewMembers?.count}
          Icon={<MdGroups />}
        />
      </CardContent>
    </Card>
  )
}

export default FleetCard
