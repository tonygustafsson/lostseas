import { ShipyardTab } from "."

type Props = {
  tab: ShipyardTab
  setTab: (tab: ShipyardTab) => void
}

const ShipyardTabs = ({ tab, setTab }: Props) => (
  <div className="tabs justify-center mb-8">
    <a
      className={`tab tab-lg font-serif text-2xl tab-bordered font-bold px-8 ${
        tab === "Buy" ? "tab-active" : ""
      }`}
      onClick={() => setTab("Buy")}
    >
      Buy
    </a>
    <a
      className={`tab tab-lg font-serif text-2xl tab-bordered font-bold px-8 ${
        tab === "Sell" ? "tab-active" : ""
      }`}
      onClick={() => setTab("Sell")}
    >
      Sell
    </a>
    <a
      className={`tab tab-lg font-serif text-2xl tab-bordered font-bold px-8 ${
        tab === "Repair" ? "tab-active" : ""
      }`}
      onClick={() => setTab("Repair")}
    >
      Repair
    </a>
  </div>
)

export default ShipyardTabs
