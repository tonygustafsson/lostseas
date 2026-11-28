import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { GUIDE_CHAPTERS } from "@/components/guide/chapters"
import GuideChapter from "@/components/guide/GuideChapter"

const meta = {
  title: "game/Guide/GuideChapter",
  component: GuideChapter,
  args: {
    id: "welcome",
    lead: "A short line that sets the scene for the chapter.",
    children: (
      <>
        <p>Body text of the chapter.</p>

        <ul>
          <li>A point worth remembering.</li>
          <li>Another one.</li>
        </ul>
      </>
    ),
  },
  argTypes: {
    id: { control: "select", options: GUIDE_CHAPTERS.map(({ id }) => id) },
    image: { control: "object" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GuideChapter>

export default meta
type Story = StoryObj<typeof meta>

export const GuideChapterStory: Story = {
  name: "GuideChapter",
  args: {
    image: { src: "/img/map/spanish-main.avif", alt: "The Spanish Main" },
  },
}
