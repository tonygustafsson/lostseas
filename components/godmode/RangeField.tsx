import { useId } from "react"

import { Label } from "@/components/ui/label"

type Props = {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
}

const RangeField = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = "%",
}: Props) => {
  const id = useId()

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id} className="justify-between">
        {label}

        <span className="text-muted-foreground">
          {value}
          {unit}
        </span>
      </Label>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-accent h-6 w-full"
      />
    </div>
  )
}

export default RangeField
