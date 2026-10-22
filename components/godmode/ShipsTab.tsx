import { Trash2 } from "lucide-react"

import Select from "@/components/Select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createNewShip } from "@/utils/ship"

import { SHIP_TYPE_OPTIONS } from "./constants"
import NumberField from "./NumberField"
import RangeField from "./RangeField"
import TextInputField from "./TextInputField"
import type { GodModeTabProps } from "./types"

const ShipsTab = ({ draft, update }: GodModeTabProps) => {
  const ships = Object.values(draft.ships)

  const updateShip = (id: Ship["id"], recipe: (ship: Ship) => void) =>
    update((d) => recipe(d.ships[id]))

  return (
    <div className="flex flex-col gap-4">
      {!ships.length && <p className="text-muted-foreground">No ships.</p>}

      {ships.map((ship) => (
        <Card key={ship.id} className="gap-4 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInputField
              label="Name"
              value={ship.name}
              onChange={(name) =>
                updateShip(ship.id, (s) => void (s.name = name))
              }
            />

            <Select
              label="Type"
              name={`ship-type-${ship.id}`}
              value={ship.type}
              options={SHIP_TYPE_OPTIONS}
              onChange={(type) =>
                updateShip(ship.id, (s) => void (s.type = type as ShipType))
              }
            />

            <RangeField
              label="Health"
              value={ship.health}
              onChange={(health) =>
                updateShip(ship.id, (s) => void (s.health = health))
              }
            />

            <NumberField
              label="Created on day"
              value={ship.createdDay}
              onChange={(createdDay) =>
                updateShip(ship.id, (s) => void (s.createdDay = createdDay))
              }
            />
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => update((d) => void delete d.ships[ship.id])}
            >
              <Trash2 />
              Delete ship
            </Button>
          </div>
        </Card>
      ))}

      <div>
        <Button
          variant="secondary"
          onClick={() =>
            update((d) => {
              const ship = createNewShip("Brig", d.character.day)

              d.ships[ship.id] = ship
            })
          }
        >
          Add a ship
        </Button>
      </div>
    </div>
  )
}

export default ShipsTab
