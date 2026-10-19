import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { snakeCaseToTitleCase } from "@/utils/string"

type Props = {
  item: keyof Inventory
  target: number
  onChange: (target: number) => void
}

const ShopTradeControls = ({ item, target, onChange }: Props) => {
  const label = snakeCaseToTitleCase(item)

  const change = (value: number) => {
    if (Number.isSafeInteger(value)) {
      onChange(Math.max(0, value))
    }
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    change(e.target.value === "" ? 0 : parseInt(e.target.value))
  }

  return (
    <ButtonGroup className="bg-card rounded-4xl">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={`One less ${label}`}
        onClick={() => change(target - 1)}
        disabled={target === 0}
      >
        <Minus />
      </Button>

      <Input
        aria-label={`${label} to own`}
        inputMode="numeric"
        value={target.toString()}
        onChange={changeInput}
        className="border-border bg-input/30 h-8 w-16 rounded-none text-center"
      />

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={`One more ${label}`}
        onClick={() => change(target + 1)}
      >
        <Plus />
      </Button>
    </ButtonGroup>
  )
}

export default ShopTradeControls
