import type { ReactNode } from "react"

import Account from "./chapters/Account"
import Battles from "./chapters/Battles"
import Crew from "./chapters/Crew"
import FirstVoyage from "./chapters/FirstVoyage"
import Gold from "./chapters/Gold"
import Nations from "./chapters/Nations"
import Records from "./chapters/Records"
import Sailing from "./chapters/Sailing"
import Ships from "./chapters/Ships"
import Towns from "./chapters/Towns"
import Townsfolk from "./chapters/Townsfolk"
import Trade from "./chapters/Trade"
import Welcome from "./chapters/Welcome"
import GuideNavigation from "./GuideNavigation"

type Props = {
  /** Shown after the last chapter */
  children?: ReactNode
}

const PlayerGuide = ({ children }: Props) => (
  <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
    <GuideNavigation />

    <div className="flex max-w-3xl flex-col gap-8">
      <Welcome />
      <FirstVoyage />
      <Towns />
      <Trade />
      <Ships />
      <Crew />
      <Sailing />
      <Battles />
      <Nations />
      <Gold />
      <Townsfolk />
      <Account />
      <Records />
      {children}
    </div>
  </div>
)

export default PlayerGuide
