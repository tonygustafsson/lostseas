"use client"

import { useState } from "react"

import TextField from "@/components/TextField"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { REPAIR_KIT_HEALTH } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShips } from "@/hooks/queries/useShips"
import { isPositiveSafeInteger } from "@/utils/number"

const RepairShipForm = () => {
  const { data: player } = useGetPlayer()
  const { repairWithKits, isUsingRepairKits } = useShips()
  const [shipId, setShipId] = useState<Ship["id"]>()
  const [quantity, setQuantity] = useState<number>()
  const damagedShips = Object.values(player?.ships || {}).filter(
    (ship) => ship.health < 100
  )
  const ship =
    damagedShips.find((ship) => ship.id === shipId) ?? damagedShips[0]

  if (!ship) return <p>All your ships are in perfect health.</p>

  const repairKits = player?.inventory?.repairKits ?? 0
  const needed = Math.ceil((100 - ship.health) / REPAIR_KIT_HEALTH)
  const maxQuantity = Math.min(needed, repairKits)
  const kitsToUse = quantity ?? Math.max(1, maxQuantity)
  const validQuantity =
    isPositiveSafeInteger(kitsToUse) && kitsToUse <= maxQuantity
  const newHealth = validQuantity
    ? Math.min(100, ship.health + kitsToUse * REPAIR_KIT_HEALTH)
    : ship.health

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="repair-kit-ship" className="mb-2 font-semibold">
          Ship to repair
        </Label>

        <Select
          value={ship.id}
          onValueChange={(id) => {
            setShipId(id)
            setQuantity(undefined)
          }}
          disabled={isUsingRepairKits}
        >
          <SelectTrigger id="repair-kit-ship" className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {damagedShips.map((ship) => (
              <SelectItem key={ship.id} value={ship.id}>
                {ship.name} ({ship.health}%)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (validQuantity && !isUsingRepairKits) {
            repairWithKits({ id: ship.id, quantity: kitsToUse })
          }
        }}
      >
        <p>
          Each kit repairs up to {REPAIR_KIT_HEALTH} health points on{" "}
          {ship.name}. Other ships require their own kits.
        </p>

        <p className="text-muted-foreground">
          Available: {repairKits} kits. Full repair: {needed} kits.
        </p>

        <TextField
          label="Repair kits to use"
          type="number"
          min={1}
          max={maxQuantity}
          step={1}
          value={Number.isNaN(kitsToUse) ? "" : kitsToUse}
          onChange={(event) => setQuantity(event.target.valueAsNumber)}
          disabled={isUsingRepairKits || maxQuantity === 0}
          autoFocus
        />

        <p aria-live="polite">
          Health:{" "}
          <strong>
            {ship.health}% → {newHealth}%
          </strong>
        </p>

        {repairKits === 0 && (
          <p className="text-muted-foreground">
            Buy repair kits at the shipyard.
          </p>
        )}

        <Button type="submit" disabled={!validQuantity || isUsingRepairKits}>
          {isUsingRepairKits
            ? "Repairing…"
            : validQuantity
              ? `Use ${kitsToUse} repair ${kitsToUse === 1 ? "kit" : "kits"}`
              : "Use repair kits"}
        </Button>
      </form>
    </div>
  )
}

export default RepairShipForm
