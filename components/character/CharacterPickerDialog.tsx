"use client"

import { useState } from "react"

import Flag from "@/components/icons/Flag"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Character } from "@/constants/characters"
import { NATIONS } from "@/constants/locations"

import CharacterGrid from "./CharacterGrid"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedId?: string
  onSelect: (character: Character) => void
}

const NATION_LIST = Object.keys(NATIONS) as Nation[]

const CharacterPickerDialog = ({
  open,
  onOpenChange,
  selectedId,
  onSelect,
}: Props) => {
  const [nationality, setNationality] = useState<Nation>("England")

  const handleSelect = (character: Character) => {
    onSelect(character)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-4 sm:max-w-4xl sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-xl font-bold">
            Choose a character
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NATION_LIST.map((nation) => (
            <Button
              key={nation}
              type="button"
              variant={nation === nationality ? "default" : "secondary"}
              aria-pressed={nation === nationality}
              onClick={() => setNationality(nation)}
              className="h-12 gap-2 text-sm sm:h-16 sm:gap-4 sm:text-lg"
            >
              <Flag nation={nation} className="size-6 sm:size-8" decorative />
              {nation}
            </Button>
          ))}
        </div>

        <CharacterGrid
          nationality={nationality}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CharacterPickerDialog
