import { forwardRef, InputHTMLAttributes, useId } from "react"

import { cn } from "@/lib/utils"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string
  size?: "xs" | "sm" | "md" | "lg"
  fullWidth?: boolean
  error?: string
}

const TextField = forwardRef<HTMLInputElement, Props>(
  (
    { label, size, type, id, fullWidth = true, className, error, ...restProps },
    ref
  ) => {
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
          ref={ref}
          {...restProps}
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

TextField.displayName = "TextField"

export default TextField
