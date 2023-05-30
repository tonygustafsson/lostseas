type Props = {
  headings: string[]
  rows: React.ReactNode[][]
}

const Table = ({ headings, rows }: Props) => (
  <div className="overflow-auto lg:overflow-visible">
    <table className="table text-gray-400 border-separate  space-y-6 text-sm w-1/2">
      <thead className="bg-gray-900 text-gray-300">
        <tr>
          {headings.map((heading, idx) => (
            <th
              key={`table-heading-${heading}-${idx}`}
              className="text-left p-1.5"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, idx) => (
          <tr
            key={`table-row-${row.flatMap((column) =>
              column?.toString()
            )}-${idx}`}
            className={idx % 2 !== 0 ? "bg-gray-900" : "bg-gray-800"}
          >
            {row.map((column, idx) => (
              <td key={`table-column-${column}-${idx}`} className="p-1.5">
                {column}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default Table
