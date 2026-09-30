"use client"

import { useId } from "react"

import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "./ui/label"

type Props = {
  id?: string
  label: string
  name: string
  value?: string
  options: string[]
  onChange?: (value: string) => void
}

function Select({ id, label, name, value, options, onChange }: Props) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="form-control w-full">
      <Label htmlFor={selectId} className="mb-2 font-semibold">
        {label}
      </Label>

      <ShadSelect name={name} value={value} onValueChange={onChange}>
        <SelectTrigger
          id={selectId}
          className="w-full bg-neutral-950 hover:bg-neutral-900!"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={`select-option-${option}`} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>
    </div>
  )
}

Select.displayName = "Select"

export default Select
