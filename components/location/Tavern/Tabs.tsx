import { TavernTab } from "."

type Props = {
  tab: TavernTab
  setTab: (tab: TavernTab) => void
}

const TavernTabs = ({ tab, setTab }: Props) => (
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
        tab === "Dice" ? "tab-active" : ""
      }`}
      onClick={() => setTab("Dice")}
    >
      Play dice
    </a>
  </div>
)

export default TavernTabs
