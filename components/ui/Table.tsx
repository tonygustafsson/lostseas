type Props = {
  headings: string[]
  rows: string[][]
}

const Table = ({ headings, rows }: Props) => {
  return (
    <div className="overflow-auto lg:overflow-visible">
      <table className="table text-gray-400 border-separate  space-y-6 text-sm w-1/2">
        <thead className="bg-gray-900 text-gray-300">
          <tr>
            {headings.map((heading) => (
              <th className="text-left p-1.5">{heading}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={`ship-${idx}`}
              className={idx % 2 !== 0 ? "bg-gray-900" : "bg-gray-800"}
            >
              {row.map((column) => (
                <td className="p-1.5">{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
