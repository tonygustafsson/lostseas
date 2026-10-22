import { Trash2 } from "lucide-react"

import Select from "@/components/Select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { TOWN_OPTIONS, TREASURE_OPTIONS } from "./constants"
import type { GodModeTabProps } from "./types"

const TreasuresTab = ({ draft, update }: GodModeTabProps) => {
  const treasures = Object.values(draft.treasures ?? {})

  return (
    <div className="flex flex-col gap-4">
      {!treasures.length && (
        <p className="text-muted-foreground">No treasures.</p>
      )}

      {treasures.map((treasure) => (
        <Card key={treasure.id} className="gap-4 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Treasure"
              name={`treasure-${treasure.id}`}
              value={treasure.name}
              options={TREASURE_OPTIONS}
              onChange={(name) =>
                update((d) => {
                  const found = d.treasures?.[treasure.id]

                  if (found) found.name = name as TreasureName
                })
              }
            />

            <Select
              label="Rewarded by"
              name={`treasure-rewarder-${treasure.id}`}
              value={treasure.rewarder}
              options={TOWN_OPTIONS}
              onChange={(rewarder) =>
                update((d) => {
                  const found = d.treasures?.[treasure.id]

                  if (found) found.rewarder = rewarder as Town
                })
              }
            />
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                update((d) => {
                  if (d.treasures) delete d.treasures[treasure.id]
                })
              }
            >
              <Trash2 />
              Remove treasure
            </Button>
          </div>
        </Card>
      ))}

      <div>
        <Button
          variant="secondary"
          onClick={() =>
            update((d) => {
              const id = crypto.randomUUID()

              d.treasures = {
                ...d.treasures,
                [id]: {
                  id,
                  name: TREASURE_OPTIONS[0] as TreasureName,
                  rewarder: d.character.town ?? TOWN_OPTIONS[0],
                },
              }
            })
          }
        >
          Add a treasure
        </Button>
      </div>
    </div>
  )
}

export default TreasuresTab
