import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import useModal from "@/app/stores/modals"
import DismissCrewMembers from "@/components/crew/DismissCrewMembers"
import Modal from "@/components/Modal"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { count: number }

/** The component reads the player, so the crew size is a control */
const DismissCrewMembersPreview = ({ count }: Args) => (
  <PlayerPreview
    key={count}
    data={{ ...player, crewMembers: { ...player.crewMembers, count } }}
  >
    <div className="max-w-sm">
      <DismissCrewMembers />
    </div>

    <Modal />
  </PlayerPreview>
)

const meta = {
  title: "game/Crew/DismissCrewMembers",
  component: DismissCrewMembersPreview,
  args: { count: player.crewMembers.count },
  argTypes: { count: { control: { type: "number", min: 0 } } },
  beforeEach: () => {
    useModal.setState({ modals: {} })
    return () => useModal.getState().removeAllModals()
  },
} satisfies Meta<typeof DismissCrewMembersPreview>

export default meta
type Story = StoryObj<typeof meta>

export const DismissCrewMembersStory: Story = { name: "DismissCrewMembers" }
