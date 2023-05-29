import { Card, Typography } from "@material-tailwind/react"

type Props = {
  headings: string[]
  rows: React.ReactNode[][]
}

const Table = ({ headings, rows }: Props) => (
  <Card className="overflow-auto w-full rounded-lg">
    <table className="w-full min-w-max table-auto text-left">
      <thead className="bg-gray-800">
        <tr>
          {headings.map((heading, idx) => (
            <th
              key={`table-heading-${heading}-${idx}`}
              className="bg-blue-gray-900 p-4"
            >
              <Typography
                variant="small"
                color="white"
                className="font-bold leading-none opacity-70"
              >
                {heading}
              </Typography>
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
            className="even:bg-gray-800 odd:bg-gray-900"
          >
            {row.map((column, idx) => (
              <td key={`table-column-${column}-${idx}`} className="py-2 px-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal"
                >
                  {column}
                </Typography>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
)

export default Table
