import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type TabItem<T> = {
  label: string
  id: T
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
      {items.map(({ label, id }) => (
        <TabsTrigger
          key={`location-tab-${id}`}
          value={id}
          className={cn("px-6 font-serif text-xl font-bold", {
            "text-accent!": id === currentTab,
          })}
        >
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
)

export default LocationTabs
