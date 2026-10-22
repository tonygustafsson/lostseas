"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import { BiFemaleSign, BiMaleSign } from "react-icons/bi"
import { FaPen } from "react-icons/fa"
import { GiPerspectiveDiceTwo } from "react-icons/gi"

import Flag from "@/components/icons/Flag"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCharacterById } from "@/constants/characters"

type Props = {
  characterId: string
  onChangeClick: () => void
  onRandomizeClick: () => void
  isRandomizing: boolean
  nameField: ReactNode
}

type ActionButtonsProps = Pick<
  Props,
  "onChangeClick" | "onRandomizeClick" | "isRandomizing"
> & {
  className: string
}

const ActionButtons = ({
  onChangeClick,
  onRandomizeClick,
  isRandomizing,
  className,
}: ActionButtonsProps) => (
  <div className={className}>
    <Button type="button" variant="default" size="sm" onClick={onChangeClick}>
      <FaPen className="size-3" />
      Change
    </Button>

    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={onRandomizeClick}
      disabled={isRandomizing}
    >
      <GiPerspectiveDiceTwo
        className={isRandomizing ? "animate-spin" : undefined}
      />
      {isRandomizing ? "Randomizing..." : "Randomize"}
    </Button>
  </div>
)

const SelectedCharacter = ({
  characterId,
  onChangeClick,
  onRandomizeClick,
  isRandomizing,
  nameField,
}: Props) => {
  const character = getCharacterById(characterId)

  if (!character) return null

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <div className="flex w-full flex-col items-center gap-2 sm:w-auto">
        <button
          type="button"
          aria-label="Change character"
          onClick={onChangeClick}
          className="bg-secondary group focus-visible:ring-ring relative aspect-square w-full shrink-0 cursor-pointer overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:outline-none sm:size-52"
        >
          <Image
            src={character.image}
            alt=""
            fill
            sizes="(min-width: 640px) 208px, 100vw"
            className="object-cover"
          />

          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 text-center font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Change character
          </span>
        </button>

        <ActionButtons
          onChangeClick={onChangeClick}
          onRandomizeClick={onRandomizeClick}
          isRandomizing={isRandomizing}
          className="flex flex-wrap justify-center gap-2 sm:hidden"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        {nameField}

        <div className="flex flex-nowrap gap-2">
          <Badge variant="secondary" className="h-6">
            Age {character.age}
          </Badge>

          <Badge variant="secondary" className="h-6">
            {character.gender === "Male" ? <BiMaleSign /> : <BiFemaleSign />}
            {character.gender}
          </Badge>

          <Badge variant="secondary" className="h-6">
            <Flag nation={character.nationality} size={16} decorative />
            {character.nationality}
          </Badge>
        </div>

        <p className="text-muted-foreground text-xs">{character.description}</p>

        <ActionButtons
          onChangeClick={onChangeClick}
          onRandomizeClick={onRandomizeClick}
          isRandomizing={isRandomizing}
          className="hidden flex-wrap gap-2 sm:flex"
        />
      </div>
    </div>
  )
}

export default SelectedCharacter
