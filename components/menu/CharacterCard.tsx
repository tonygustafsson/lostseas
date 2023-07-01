import Link from "next/link"
import { GiCoins, GiPirateHat } from "react-icons/gi"

import Flag from "../icons/Flag"

type Props = {
  character: Character
}

const CharacterCard = ({ character }: Props) => (
  <div className="card w-full bg-gray-800 shadow-lg mt-2 lg:mt-8 rounded-md">
    <figure className="mt-4">
      <GiPirateHat className="hidden lg:block h-14 w-14" />
    </figure>

    <div className="card-body p-6 pt-2">
      <h2 className="card-title font-serif gap-2">
        <Flag
          nation={character.nationality}
          size={28}
          className="opacity-[0.8]"
        />
        {character.name}
      </h2>

      <p className="text-sm">
        You are a {character.age} year old {character.gender.toLowerCase()} from{" "}
        {character.nationality}.
      </p>

      <div className="stats bg-gray-800">
        <div className="stat px-0 py-2">
          <div className="stat-figure text-secondary">
            <GiCoins className="h-8 w-8" />
          </div>
          <div className="stat-title">Gold</div>
          <div className="stat-value text-xl">{character.gold}</div>
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
