type Props = {
  id?: string
  label?: string
  name: string
  value?: string
  options: string[]
  onChange?: (value: any) => void
}

const Select = ({ id, label, name, value, options, onChange }: Props) => (
  <div className="form-control w-full">
    {label && (
      <label htmlFor={id} className="label">
        {label}
      </label>
    )}

    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="select select-bordered"
    >
      {options.map((option) => (
        <option key={`select-option-${option}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

export default Select
