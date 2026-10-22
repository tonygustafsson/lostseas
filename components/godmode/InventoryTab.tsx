import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { ITEM_OPTIONS } from "./constants"
import NumberField from "./NumberField"
import type { GodModeTabProps } from "./types"

const InventoryTab = ({ draft, update }: GodModeTabProps) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          update((d) => {
            d.inventory = Object.fromEntries(
              ITEM_OPTIONS.map((item) => [item, 999])
            )
          })
        }
      >
        Max out
      </Button>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => update((d) => void (d.inventory = {}))}
      >
        Clear
      </Button>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {ITEM_OPTIONS.map((item) => (
        <Card key={item} className="gap-2 p-4">
          <p className="flex items-center gap-2 text-xs tracking-wide uppercase">
            <MerchandiseIcon item={item} size="sm" />
            {item}
          </p>

          <NumberField
            label="Amount"
            value={draft.inventory?.[item] ?? 0}
            onChange={(amount) =>
              update((d) => {
                d.inventory = { ...d.inventory, [item]: amount }
              })
            }
          />
        </Card>
      ))}
    </div>
  </div>
)

export default InventoryTab
