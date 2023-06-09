type Props = {
  id?: string
  label?: string
  name: string
  type?: string
  size?: "xs" | "sm" | "md" | "lg"
  fullWidth?: boolean
  value?: string
  defaultValue?: string
  required?: boolean
  min?: number | string
  max?: number | string
  minLength?: number
  autoFocus?: boolean
  pattern?: string
  title?: string
  className?: string
  onChange?: (value: any) => void
}

const TextField = ({
  id,
  label,
  name,
  type = "text",
  value,
  defaultValue,
  size,
  fullWidth = true,
  required,
  min,
  max,
  minLength,
  autoFocus,
  pattern,
  title,
  className,
  onChange,
}: Props) => (
  <div className={`${type !== "hidden" ? "form-control w-full" : ""}`}>
    {label && (
      <label htmlFor={id} className="label">
        {label}
      </label>
    )}

    <input
      type={type}
      name={name}
      id={id}
      value={value}
      defaultValue={defaultValue}
      required={required}
      min={min}
      max={max}
      minLength={minLength}
      autoFocus={autoFocus}
      pattern={pattern}
      title={title}
      className={`input input-bordered ${size === "xs" && "input-xs"} ${
        size === "sm" && "input-sm"
      } ${size === "md" && "input-md"} ${size === "lg" && "input-lg"} ${
        fullWidth && "w-full"
      } ${className}`}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </div>
)

export default TextField
