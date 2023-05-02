type Props = {
  id?: string
  label?: string
  name: string
  type?: string
  defaultValue?: string
  required?: boolean
  min?: number
  max?: number
  autoFocus?: boolean
}

const TextField = ({
  id,
  label,
  name,
  type = "text",
  defaultValue,
  required,
  min,
  max,
  autoFocus,
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
      defaultValue={defaultValue}
      min={min}
      max={max}
      autoFocus={autoFocus}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required={required}
    />
  </div>
)

export default TextField
