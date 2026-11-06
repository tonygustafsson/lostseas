import type { ReactNode } from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type TabItem<T> = {
  label: string
  id: T
  icon: ReactNode
  /** A small dot that asks for attention, like quest business */
  indicator?: boolean
}

interface Props<T> {
  items: TabItem<T>[]
  currentTab: T
  setCurrentTab: (tab: T) => void
}

const LocationTabs = <T extends string>({
  items,
  currentTab,
  setCurrentTab,
}: Props<T>) => (
  <Tabs
    className="mt-4 mb-8 w-full items-center"
    value={currentTab}
    onValueChange={(value) => setCurrentTab(value as T)}
  >
    {/* Gilded lines like the game logo frame the tabs */}
    <div className="flex w-full items-center justify-center gap-1 sm:gap-4">
      <div className="to-gold/60 h-px min-w-2 flex-1 bg-linear-to-r from-transparent" />

      <TabsList className="shrink-0 overflow-hidden rounded-md p-0 group-data-horizontal/tabs:h-12">
        {items.map(({ label, id, icon, indicator }) => (
          <TabsTrigger
            key={`location-tab-${id}`}
            value={id}
            className={cn(
              "not-last:border-r-border h-full gap-1.5 rounded-none px-1.5 font-serif text-sm font-bold sm:gap-2 sm:px-6 sm:text-lg [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-5",
              {
                "text-gold!": id === currentTab,
              }
            )}
          >
            {icon}
            {label}

            {indicator && (
              <span
                role="img"
                aria-label="Quest"
                className="bg-info size-2 rounded-full"
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="to-gold/60 h-px min-w-2 flex-1 bg-linear-to-l from-transparent" />
    </div>
  </Tabs>
)

export default LocationTabs
