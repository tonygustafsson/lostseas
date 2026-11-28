import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { GUIDE_CHAPTERS } from "@/components/guide/chapters"
import GuideChapter from "@/components/guide/GuideChapter"
import GuideNavigation from "@/components/guide/GuideNavigation"

const meta = {
  title: "game/Guide/GuideNavigation",
  component: GuideNavigation,
  parameters: { layout: "padded" },
  // Same layout as the guide, with filler chapters to scroll through
  decorators: [
    (Story) => (
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
        <Story />

        <div className="flex max-w-3xl flex-col gap-8">
          {GUIDE_CHAPTERS.map(({ id }) => (
            <GuideChapter key={id} id={id} lead="Filler chapter.">
              <p className="h-96">Scroll to move the highlighted chapter.</p>
            </GuideChapter>
          ))}
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof GuideNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const GuideNavigationStory: Story = { name: "GuideNavigation" }
