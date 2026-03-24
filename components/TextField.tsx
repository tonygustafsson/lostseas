import { forwardRef, InputHTMLAttributes } from "react"

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
  ) => (
    <div
      className={`flex flex-col gap-2 ${type !== "hidden" ? "form-control w-full" : ""}`}
    >
      {label && (
        <Label htmlFor={id} className="label">
          {label}
        </Label>
      )}

      <Input
        type={type}
        className={`input input-bordered ${size === "xs" && "input-xs"} ${
          size === "sm" && "input-sm"
        } ${size === "md" && "input-md"} ${size === "lg" && "input-lg"} ${
          fullWidth && "w-full"
        } ${className}`}
        ref={ref}
        {...restProps}
      />

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
)

TextField.displayName = "TextField"

export default TextField
