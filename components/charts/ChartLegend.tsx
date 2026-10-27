type Props = {
  items: { label: string; color: string }[]
}

const ChartLegend = ({ items }: Props) => (
  <div className="mb-2 flex flex-wrap items-center justify-center gap-4 text-sm">
    {items.map(({ label, color }) => (
      <div key={label} className="flex items-center gap-2">
        <span
          className="size-3 rounded-sm"
          style={{ backgroundColor: color }}
        />
        {label}
      </div>
    ))}
  </div>
)

export default ChartLegend
