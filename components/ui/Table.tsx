type Props = {
  headings: string[]
  rows: React.ReactNode[][]
}

const Table = ({ headings, rows }: Props) => (
  <div className="overflow-x-auto">
    <table className="table table-zebra bg-gray-950 bg-opacity-25">
      <thead>
        <tr>
          {headings.map((heading, idx) => (
            <th key={`table-heading-${heading}-${idx}`}>{heading}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, idx) => (
          <tr
            key={`table-row-${row.flatMap((column) =>
              column?.toString()
            )}-${idx}`}
          >
            {row.map((column, idx) => (
              <td key={`table-column-${column}-${idx}`}>{column}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default Table
