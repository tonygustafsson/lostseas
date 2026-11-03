import { ComponentProps, useId } from "react"

import { cn } from "@/lib/utils"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

type Props = Omit<ComponentProps<"input">, "size"> & {
  label?: string
  size?: "xs" | "sm" | "md" | "lg"
  fullWidth?: boolean
  error?: string
}

const TextField = ({
  label,
  size,
  type,
  id,
  fullWidth = true,
  className,
  error,
  ...restProps
}: Props) => {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
      {label && (
        <Label htmlFor={inputId} className="font-semibold">
          {label}
        </Label>
      )}

      <Input
        id={inputId}
        type={type}
        className={cn(
          "bg-neutral-950",
          {
            "h-7 px-2 text-xs": size === "xs",
            "h-8 px-3 text-sm": size === "sm",
            "h-9 text-sm": size === "md",
            "h-10 px-4 text-base": size === "lg",
            "w-auto": !fullWidth,
          },
          className
        )}
        {...restProps}
      />

      {error && <p className="text-error mt-3 text-sm">{error}</p>}
    </div>
  )
}

export default TextField
