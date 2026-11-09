import { ScrollText } from "lucide-react"
import type { ReactNode } from "react"

import RingShimmer from "@/components/RingShimmer"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type TabItem<T> = {
  label: string
  id: T
  icon: ReactNode
  /** A quest scroll that asks for attention when there is quest business */
  indicator?: boolean
}

interface Props<T> {
  items: TabItem<T>[]
  currentTab: T
  setCurrentTab: (tab: T) => void
}

const LocationNavigation = <T extends string>({
  items,
  currentTab,
  setCurrentTab,
}: Props<T>) => (
  <Tabs
    className="mt-4 mb-8 w-full items-center"
    value={currentTab}
    onValueChange={(value) => setCurrentTab(value as T)}
  >
    <div className="flex w-full items-start justify-center">
      <div className="to-gold/60 mt-7 h-px min-w-2 flex-1 bg-linear-to-r from-transparent sm:mt-8" />

      <TabsList className="shrink-0 items-start gap-0 rounded-none bg-transparent p-0 group-data-horizontal/tabs:h-auto">
        {items.map(({ label, id, icon, indicator }) => {
          const isActive = id === currentTab

          return (
            <TabsTrigger
              key={`location-tab-${id}`}
              value={id}
              className="group/medallion h-auto w-24 flex-none cursor-pointer flex-col gap-2 rounded-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none data-active:bg-transparent sm:w-32 dark:data-active:border-transparent dark:data-active:bg-transparent"
            >
              <span className="relative">
                <span className="bg-gold/60 absolute top-1/2 right-full mr-2 h-px w-3 sm:w-6" />
                <span className="bg-gold/60 absolute top-1/2 left-full ml-2 h-px w-3 sm:w-6" />

                <span className="relative block transition-transform group-hover/medallion:-translate-y-0.5">
                  {isActive && (
                    <span className="bg-gold/15 absolute -inset-2 rounded-full blur-xl" />
                  )}

                  {/* The rim turns to gold for the selected medallion */}
                  <span
                    className={cn(
                      "group-focus-visible/medallion:ring-ring relative flex size-14 rounded-full p-px transition-colors group-focus-visible/medallion:ring-2 sm:size-16",
                      isActive
                        ? "from-gold-light via-gold to-gold-dark bg-linear-to-b p-0.5"
                        : "bg-border group-hover/medallion:bg-gold/40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-full items-center justify-center rounded-full transition-colors [&_svg]:size-6! sm:[&_svg]:size-8!",
                        isActive
                          ? "from-sea-dark to-background text-gold-light bg-linear-to-b"
                          : "bg-card text-muted-foreground group-hover/medallion:text-parchment"
                      )}
                    >
                      {icon}
                    </span>
                  </span>

                  {isActive && (
                    <RingShimmer className="motion-safe:animate-ring-shimmer" />
                  )}

                  {indicator && (
                    <span className="bg-info text-background absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full motion-safe:animate-pulse">
                      <ScrollText
                        role="img"
                        aria-label="Quest"
                        className="size-3!"
                      />
                    </span>
                  )}
                </span>
              </span>

              <span
                className={cn(
                  "font-serif text-sm font-bold whitespace-nowrap transition-colors sm:text-base",
                  isActive
                    ? "from-gold-light via-gold to-gold-dark bg-linear-to-b bg-clip-text text-transparent"
                    : "text-muted-foreground group-hover/medallion:text-parchment"
                )}
              >
                {label}
              </span>
            </TabsTrigger>
          )
        })}
      </TabsList>

      <div className="to-gold/60 mt-7 h-px min-w-2 flex-1 bg-linear-to-l from-transparent sm:mt-8" />
    </div>
  </Tabs>
)

export default LocationNavigation
