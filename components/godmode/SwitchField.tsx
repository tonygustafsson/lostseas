import { useId } from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const SwitchField = ({ label, checked, onChange }: Props) => {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} onCheckedChange={onChange} />

      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

export default SwitchField
