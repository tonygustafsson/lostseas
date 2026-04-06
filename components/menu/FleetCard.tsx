"use client"

import { GiShoonerSailboat } from "react-icons/gi"
import { MdGroups } from "react-icons/md"

import useDrawer from "@/app/stores/drawer"

import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"

type Props = {
  player: Player
}

const FleetCard = ({ player }: Props) => {
  const { open: openDrawer } = useDrawer()

  return (
    <Card className="gap-2 bg-gray-800 p-2">
      <CardHeader className="flex items-center justify-between px-2 font-serif text-lg">
        Fleet
        <Button variant="outline" size="xs" onClick={() => openDrawer("fleet")}>
          More
        </Button>
      </CardHeader>

      <CardContent className="space-y-2 px-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Ships</p>
              <p className="w-fit">{Object.keys(player?.ships || {}).length}</p>
            </div>

            <GiShoonerSailboat className="text-accent size-5" />
          </div>

          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Crew</p>
              <p className="w-fit">
                {Object.keys(player?.crewMembers || {}).length}
              </p>
            </div>

            <MdGroups className="text-accent size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FleetCard
