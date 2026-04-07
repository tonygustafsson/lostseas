"use client"

import { FaCoins } from "react-icons/fa"
import { GiPirateCoat, GiProgression } from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"
import { getScore } from "@/utils/score"

import Flag from "../icons/Flag"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { StatCard } from "./StatCard"

type Props = {
  player: Player
}

const CharacterCard = ({ player }: Props) => {
  const { open: openDrawer } = useDrawer()

  return (
    <Card className="gap-2 bg-neutral-900 p-2">
      <CardHeader className="flex items-center justify-between px-2 font-serif text-lg">
        {player.character.name}

        <Button
          variant="outline"
          size="xs"
          onClick={() => openDrawer("status")}
        >
          More
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 px-2">
        <StatCard
          title="Score"
          value={getScore(player)}
          Icon={<GiProgression />}
        />

        <StatCard
          title="Gold"
          value={player.character.gold}
          Icon={<FaCoins />}
        />

        <StatCard
          title="Title"
          value={player.character.title}
          Icon={<GiPirateCoat />}
        />

        <StatCard
          title="Nation"
          value={player.character.nationality}
          Icon={<Flag nation={player.character.nationality} />}
        />
      </CardContent>
    </Card>
  )
}

export default CharacterCard
