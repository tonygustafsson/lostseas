import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

type Props = {
  value: number
  /** The most the player can give. The value never goes above it. */
  max: number
  label: string
  onChange: (value: number) => void
}

const CrewQuantity = ({ value, max, label, onChange }: Props) => {
  // Nothing to give, so there is nothing to choose
  const empty = max < 1

  const change = (next: number) => {
    if (Number.isSafeInteger(next)) {
      onChange(Math.max(1, Math.min(next, Math.max(max, 1))))
    }
  }

  return (
    <ButtonGroup className="bg-card rounded-4xl">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={`Less ${label}`}
        onClick={() => change(value - 1)}
        disabled={empty || value <= 1}
      >
        <Minus />
      </Button>

      <Input
        aria-label={label}
        inputMode="numeric"
        value={value.toString()}
        disabled={empty}
        onChange={(e) =>
          change(e.target.value === "" ? 1 : parseInt(e.target.value))
        }
        className="border-border bg-input/30 h-8 w-12 rounded-none text-center tabular-nums"
      />

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={`More ${label}`}
        onClick={() => change(value + 1)}
        disabled={empty || value >= max}
      >
        <Plus />
      </Button>
    </ButtonGroup>
  )
}

export default CrewQuantity
