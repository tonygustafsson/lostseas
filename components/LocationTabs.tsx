import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    className="mb-8 w-full items-center"
    value={currentTab}
    onValueChange={(value) => setCurrentTab(value as T)}
  >
    <TabsList className="h-14 p-1.5">
      {items.map(({ label, id }) => (
        <TabsTrigger
          key={`location-tab-${id}`}
          value={id}
          className="h-12 px-6 font-serif text-xl font-bold"
        >
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
)

export default LocationTabs
