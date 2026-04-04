"use client"

import { m as motion } from "framer-motion"
import { FaCoins } from "react-icons/fa"
import { GiPirateHat, GiProgression } from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"
import { getScore } from "@/utils/score"

import Flag from "../icons/Flag"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"

type Props = {
  player: Player
}

const CharacterCard = ({ player }: Props) => {
  const { open: openDrawer } = useDrawer()

  return (
    <Card className="gap-2 bg-gray-800">
      <CardHeader className="flex flex-col items-center gap-2">
        <figure>
          <GiPirateHat className="hidden size-14 lg:block" />
        </figure>
      </CardHeader>

      <CardContent className="space-y-4">
        <h2 className="flex gap-2 font-serif text-xl">
          <Flag nation={player.character.nationality} size={28} />
          {player.character.name}
        </h2>

        <p className="text-sm">
          You are a {player.character.age} year old {player.character.title}{" "}
          from {player.character.nationality}.
        </p>

        <div className="flex items-center justify-between py-0">
          <div>
            <p className="text-gray-400">Score</p>
            <p className="w-fit">{getScore(player)}</p>
          </div>

          <GiProgression className="text-accent h-8 w-8" />
        </div>

        <div className="flex items-center justify-between py-0">
          <div>
            <p className="text-gray-400">Gold</p>
            <motion.p
              key={`character-gold-${player.character.gold}`}
              initial={{ scale: 1, color: "#fff" }}
              animate={{
                scale: [null, 1.3, 1],
                color: [null, "#fbbf24", "#fff"],
                transition: { duration: 0.5 },
              }}
              className="stat-value w-fit"
            >
              {player.character.gold}
            </motion.p>
          </div>

          <FaCoins className="text-accent h-8 w-8" />
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => openDrawer("status")}
          >
            More info
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
