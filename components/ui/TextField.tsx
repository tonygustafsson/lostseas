import { forwardRef, InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
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
    <div className={`${type !== "hidden" ? "form-control w-full" : ""}`}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}

      <input
        type={type}
        className={`input input-bordered ${size === "xs" && "input-xs"} ${
          size === "sm" && "input-sm"
        } ${size === "md" && "input-md"} ${size === "lg" && "input-lg"} ${
          fullWidth && "w-full"
        } ${className}`}
        ref={ref}
        {...restProps}
      />

      {error && <p className="text-sm text-error mt-3">{error}</p>}
    </div>
  )
)

TextField.displayName = "TextField"

export default TextField
