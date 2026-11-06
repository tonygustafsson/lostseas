import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type TabItem<T> = {
  label: string
  id: T
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
    <TabsList className="rounded-lg p-0">
      {items.map(({ label, id, indicator }) => (
        <TabsTrigger
          key={`location-tab-${id}`}
          value={id}
          className={cn(
            "px-3 font-serif text-lg font-bold sm:px-6 sm:text-xl",
            {
              "text-gold!": id === currentTab,
            }
          )}
        >
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
  </Tabs>
)

export default LocationTabs
