import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

const meta = {
  component: Toaster,
  beforeEach: () => () => toast.dismiss(),
  render: (args, context) => (
    <>
      <Toaster
        {...args}
        theme={context.globals.theme === "light" ? "light" : "dark"}
      />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast("Welcome aboard", {
              description: "Your next adventure awaits.",
            })
          }
        >
          Message
        </Button>
        <Button onClick={() => toast.success("Supplies purchased")}>
          Success
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error("Not enough gold")}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Supplies are running low")}
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.info("A ship has been spotted")}
        >
          Info
        </Button>
      </div>
    </>
  ),
} satisfies Meta<typeof Toaster>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
