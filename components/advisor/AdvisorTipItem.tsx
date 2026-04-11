import { ReactNode } from "react"

type Props = {
  icon: ReactNode
  children: ReactNode
  blocksTravel?: boolean
}

const AdvisorTipItem = ({ icon, children, blocksTravel }: Props) => (
  <li
    className={`bg-card flex gap-4 rounded-md p-4 ${blocksTravel ? "border-destructive border-l-2" : ""}`}
  >
    <div className="text-accent shrink-0">{icon}</div>
    <div className="flex-1">{children}</div>
  </li>
)

export default AdvisorTipItem
