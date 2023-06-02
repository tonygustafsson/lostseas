type Props = {
  id?: string
  label?: string
  name: string
  type?: string
  value?: string
  defaultValue?: string
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  autoFocus?: boolean
  pattern?: string
  title?: string
  onChange?: (value: string) => void
}

const TextField = ({
  id,
  label,
  name,
  type = "text",
  value,
  defaultValue,
  required,
  min,
  max,
  minLength,
  autoFocus,
  pattern,
  title,
  onChange,
}: Props) => (
  <div className={`form-control ${type !== "hidden" ? "w-full" : ""}`}>
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
      className="input input-bordered w-full"
      onChange={(e) => onChange?.(e.target.value)}
    />
  </div>
)

export default TextField
