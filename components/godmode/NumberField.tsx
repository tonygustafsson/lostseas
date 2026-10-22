import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

const NumberField = ({ label, value, onChange, min = 0, max }: Props) => {
  const id = useId()

  const handleChange = (input: string) => {
    const number = Math.round(Number(input)) || 0
    const aboveMin = Math.max(min, number)

    onChange(max === undefined ? aboveMin : Math.min(max, aboveMin))
  }

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  )
}

export default NumberField
