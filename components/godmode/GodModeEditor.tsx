import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CharacterTab from "./CharacterTab"
import CrewTab from "./CrewTab"
import InventoryTab from "./InventoryTab"
import ShipsTab from "./ShipsTab"
import TreasuresTab from "./TreasuresTab"
import type { GodModeTabProps } from "./types"
import WorldTab from "./WorldTab"

const TABS = [
  { id: "character", label: "Character", Tab: CharacterTab },
  { id: "ships", label: "Ships", Tab: ShipsTab },
  { id: "crew", label: "Crew", Tab: CrewTab },
  { id: "inventory", label: "Inventory", Tab: InventoryTab },
  { id: "treasures", label: "Treasures", Tab: TreasuresTab },
  { id: "world", label: "World", Tab: WorldTab },
]

type Props = {
  player: Player
  isSaving: boolean
  onSave: (player: Player) => Promise<unknown>
}

const GodModeEditor = ({ player, isSaving, onSave }: Props) => {
  const [draft, setDraft] = useState(() => structuredClone(player))
  const [error, setError] = useState<string>()

  const update: GodModeTabProps["update"] = (recipe) =>
    setDraft((current) => {
      const next = structuredClone(current)

      recipe(next)

      return next
    })

  const handleSave = async () => {
    setError(undefined)

    try {
      await onSave(draft)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save")
    }
  }

  return (
    <DialogContent className="flex h-dvh max-h-dvh w-full max-w-full flex-col gap-4 rounded-none p-6 sm:h-[90dvh] sm:max-w-5xl sm:rounded-xl sm:p-8">
      <DialogHeader className="pr-12">
        <DialogTitle>God mode</DialogTitle>

        <DialogDescription>
          Changes are saved to your player when you apply them.
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="character" className="min-h-0 flex-1">
        <TabsList
          aria-label="Player sections"
          className="w-full justify-start overflow-x-auto group-data-horizontal/tabs:h-auto"
        >
          {TABS.map(({ id, label }) => (
            <TabsTrigger key={id} value={id} className="h-8 flex-none px-4">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map(({ id, Tab }) => (
          <TabsContent
            key={id}
            value={id}
            className="min-h-0 overflow-y-auto py-4 pr-1"
          >
            <Tab draft={draft} update={update} />
          </TabsContent>
        ))}
      </Tabs>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <DialogFooter className="flex-row justify-end">
        <Button
          variant="outline"
          onClick={() => setDraft(structuredClone(player))}
        >
          Revert
        </Button>

        <Button onClick={handleSave} disabled={isSaving}>
          Apply
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default GodModeEditor
