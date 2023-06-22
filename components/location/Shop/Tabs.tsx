import { ShopTab } from "."

type Props = {
  tab: ShopTab
  setTab: (tab: ShopTab) => void
}

const ShopTabs = ({ tab, setTab }: Props) => (
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
  </div>
)

export default ShopTabs
