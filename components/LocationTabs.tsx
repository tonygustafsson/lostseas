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
  <div className="tabs mb-8 justify-center">
    {items.map(({ label, id }) => (
      <a
        key={`location-tab-${id}`}
        className={`tab tab-bordered tab-lg px-8 font-serif text-2xl font-bold ${
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
