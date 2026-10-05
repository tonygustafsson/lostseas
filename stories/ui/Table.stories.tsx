import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const meta = {
  component: Table,
  render: (args) => (
    <div className="max-w-2xl">
      <Table {...args}>
        <TableCaption>Supplies in your inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { item: "Food", quantity: 180, value: 360 },
            { item: "Water", quantity: 240, value: 240 },
            { item: "Rum", quantity: 20, value: 200 },
          ].map(({ item, quantity, value }) => (
            <TableRow key={item}>
              <TableCell>{item}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell className="text-right">{value} gold</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
