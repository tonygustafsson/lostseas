type Props = {
  id?: string
  label?: string
  name: string
  value?: string
  options: string[]
  className?: string
  onChange?: (value: any) => void
}

const Select = ({
  id,
  label,
  name,
  value,
  options,
  className,
  onChange,
}: Props) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        {label}
      </label>

      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={`select-option-${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
