"use client"

import Image from "next/image"
import { FaCoins } from "react-icons/fa"
import { GiPirateCoat, GiProgression } from "react-icons/gi"

import { getCharacterById } from "@/constants/characters"
import { getScore } from "@/utils/score"

import Flag from "../icons/Flag"
import { CardContent, CardHeader } from "../ui/card"
import MenuCard, { MenuCardChevron } from "./MenuCard"
import { StatCard } from "./StatCard"

type Props = {
  player: Player
}

const CharacterCard = ({ player }: Props) => {
  const characterInfo = getCharacterById(player.character.characterId)
  const firstName = player.character.name.split(" ")[0]

  return (
    <MenuCard
      ariaLabel={`Open ${player.character.name}'s status details`}
      drawerId="status"
    >
      <CardHeader className="flex items-center gap-2 px-2 font-serif text-lg">
        {characterInfo && (
          <div className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={characterInfo.image}
              alt=""
              fill
              sizes="50px"
              className="object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <span className="block truncate">{firstName}</span>
        </div>

        <MenuCardChevron />
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
    </MenuCard>
  )
}

export default CharacterCard
