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
  autoFocus,
  pattern,
  title,
  onChange,
}: Props) => (
  <div>
    {label && (
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        {label}
      </label>
    )}

    <input
      type={type}
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      autoFocus={autoFocus}
      pattern={pattern}
      title={title}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required={required}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </div>
)

export default TextField
