"use client"

import { m as motion } from "framer-motion"
import { FaCoins } from "react-icons/fa"
import { GiPirateCoat, GiProgression } from "react-icons/gi"

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
    <Card className="gap-2 bg-gray-800 p-2">
      <CardHeader className="flex items-center justify-between px-2 font-serif text-lg">
        {player.character.name}

        <Button
          variant="outline"
          size="xs"
          onClick={() => openDrawer("status")}
        >
          More info
        </Button>
      </CardHeader>

      <CardContent className="space-y-2 px-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Score</p>
              <p className="w-fit">{getScore(player)}</p>
            </div>

            <GiProgression className="text-accent size-5" />
          </div>

          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Gold</p>
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

            <FaCoins className="text-accent size-5" />
          </div>

          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Title</p>
              <p className="w-fit">{player.character.title}</p>
            </div>

            <GiPirateCoat className="text-accent size-5" />
          </div>

          <div className="flex items-center justify-between rounded-sm bg-gray-900 p-2">
            <div>
              <p className="text-xs text-gray-400">Nation</p>
              <p className="w-fit">{player.character.nationality}</p>
            </div>

            <Flag nation={player.character.nationality} size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
