import { m as motion } from "framer-motion"
import Link from "next/link"
import { FaCoins } from "react-icons/fa"
import { GiPirateHat, GiProgression } from "react-icons/gi"

import { getScore } from "@/utils/score"

import Flag from "../icons/Flag"
import { Button } from "../ui/button"

type Props = {
  player: Player
}

const CharacterCard = ({ player }: Props) => (
  <div className="card mt-2 w-full rounded-md bg-gray-800 shadow-lg">
    <figure className="mt-4">
      <GiPirateHat className="hidden h-14 w-14 lg:block" />
    </figure>

    <div className="card-body px-4 py-6 pt-2">
      <h2 className="card-title gap-2 font-serif">
        <Flag
          nation={player.character.nationality}
          size={28}
          className="opacity-[0.8]"
        />
        {player.character.name}
      </h2>

      <p className="text-sm">
        You are a {player.character.age} year old {player.character.title} from{" "}
        {player.character.nationality}.
      </p>

      <div className="stats bg-gray-800 py-1">
        <div className="stat px-0 py-0">
          <div className="stat-figure text-secondary">
            <GiProgression className="h-8 w-8" />
          </div>
          <p className="stat-title">Score</p>
          <p className="stat-value w-fit">{getScore(player)}</p>
        </div>
      </div>

      <div className="stats bg-gray-800 py-1">
        <div className="stat px-0 py-0">
          <div className="stat-figure text-secondary">
            <FaCoins className="h-8 w-8" />
          </div>
          <p className="stat-title">Gold</p>
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
      </div>

      <div className="card-actions justify-end">
        <Link href="/status">
          <Button variant="secondary" size="sm">
            More info
          </Button>
        </Link>
      </div>
    </div>
  </div>
)

export default CharacterCard
