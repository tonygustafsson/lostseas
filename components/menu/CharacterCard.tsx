import { m as motion } from "framer-motion"
import Link from "next/link"
import { FaCoins } from "react-icons/fa"
import { GiPirateHat, GiProgression } from "react-icons/gi"

import { getScore } from "@/utils/score"

import Flag from "../icons/Flag"

type Props = {
  player: Player
}

const CharacterCard = ({ player }: Props) => (
  <div className="card w-full bg-gray-800 shadow-lg mt-2 rounded-md">
    <figure className="mt-4">
      <GiPirateHat className="hidden lg:block h-14 w-14" />
    </figure>

    <div className="card-body py-6 px-4 pt-2">
      <h2 className="card-title font-serif gap-2">
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

      <div className="stats py-1 bg-gray-800">
        <div className="stat px-0 py-0">
          <div className="stat-figure text-secondary">
            <GiProgression className="h-8 w-8" />
          </div>
          <p className="stat-title">Score</p>
          <p className="stat-value w-fit">{getScore(player)}</p>
        </div>
      </div>

      <div className="stats py-1 bg-gray-800">
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
          <button className="btn btn-secondary btn-sm">More info</button>
        </Link>
      </div>
    </div>
  </div>
)

export default CharacterCard
