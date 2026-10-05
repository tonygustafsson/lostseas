import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const meta = {
  component: Card,
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Endeavour</CardTitle>
        <CardDescription>A brig ready for the next voyage.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>40 crew members and 8 cannons.</p>
      </CardContent>
      <CardFooter>
        <Button>Inspect ship</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
