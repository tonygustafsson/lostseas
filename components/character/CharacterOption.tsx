"use client"

import { CircleHelp } from "lucide-react"
import Image from "next/image"
import { BiFemaleSign, BiMaleSign } from "react-icons/bi"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Character } from "@/constants/characters"
import { cn } from "@/lib/utils"

type Props = {
  character: Character
  selected: boolean
  onSelect: (character: Character) => void
}

const CharacterOption = ({ character, selected, onSelect }: Props) => (
  <div
    className={cn(
      "bg-muted-foreground/10 hover:bg-muted-foreground/15 relative flex min-w-0 flex-col rounded-lg border-2 border-transparent transition-colors",
      selected && "bg-secondary border-accent"
    )}
  >
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(character)}
      className="focus-visible:ring-ring flex w-full min-w-0 cursor-pointer items-start gap-3 rounded-md p-2 text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:flex-col md:gap-2"
    >
      <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-md md:w-full">
        <Image
          src={character.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 72px"
          className="object-cover"
        />
      </div>

      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="pr-7 font-serif text-lg md:pr-0">
          {character.name}
        </span>

        <span className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="h-6">
            Age {character.age}
          </Badge>

          <Badge variant="secondary" className="h-6">
            {character.gender === "Male" ? <BiMaleSign /> : <BiFemaleSign />}
            {character.gender}
          </Badge>
        </span>
      </span>
    </button>

    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          aria-label={`Description for ${character.name}`}
          className="absolute top-3 right-3 rounded-full"
        >
          <CircleHelp className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" align="end">
        <PopoverTitle>{character.name}</PopoverTitle>
        <PopoverDescription>{character.description}</PopoverDescription>
      </PopoverContent>
    </Popover>
  </div>
)

export default CharacterOption
