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
  <div className="tabs justify-center mb-8">
    {items.map(({ label, id }) => (
      <a
        key={`location-tab-${id}`}
        className={`tab tab-lg font-serif text-2xl tab-bordered font-bold px-8 ${
          currentTab === id ? "tab-active" : ""
        }`}
        onClick={() => setCurrentTab(id)}
      >
        {label}
      </a>
    ))}
  </div>
)

export default LocationTabs
