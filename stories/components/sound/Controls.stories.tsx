import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useEffect } from "react"

import useSound from "@/app/stores/sound"
import SoundControls from "@/components/Sound/Controls"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = {
  location: "Sea" | "Harbor"
  musicOn: boolean
  ambienceOn: boolean
  soundEffectsOn: boolean
  changingTrack: boolean
}

// The controls read the sound store and the player, so the args feed those
const Preview = ({
  location,
  musicOn,
  ambienceOn,
  soundEffectsOn,
  changingTrack,
}: Args) => {
  useEffect(() => {
    useSound.setState({ musicOn, ambienceOn, soundEffectsOn, changingTrack })
  }, [musicOn, ambienceOn, soundEffectsOn, changingTrack])

  return (
    <PlayerPreview
      key={location}
      data={{ ...player, character: { ...player.character, location } }}
    >
      <SoundControls />
    </PlayerPreview>
  )
}

const meta = {
  title: "components/Sound/Controls",
  component: SoundControls,
  args: {
    location: "Harbor",
    musicOn: true,
    ambienceOn: true,
    soundEffectsOn: false,
    changingTrack: false,
  },
  argTypes: {
    location: { control: "inline-radio", options: ["Harbor", "Sea"] },
  },
  render: (args: Args) => (
    <div className="max-w-xl">
      <Preview {...args} />
    </div>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const ControlsStory: Story = { name: "Controls" }
