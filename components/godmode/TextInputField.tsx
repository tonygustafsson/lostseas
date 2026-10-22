import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

const TextInputField = ({ label, value, onChange }: Props) => {
  const id = useId()

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default TextInputField
