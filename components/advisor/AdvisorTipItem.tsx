import { ReactNode } from "react"

type Props = {
  icon: ReactNode
  children: ReactNode
  blocksTravel?: boolean
  variant?: "success" | "error"
}

const variantClass = {
  success: "bg-green-900",
  error: "bg-red-900",
}

const AdvisorTipItem = ({ icon, children, blocksTravel, variant }: Props) => (
  <li
    className={`flex gap-4 rounded-md p-4 ${variant ? variantClass[variant] : "bg-card"} ${blocksTravel ? "border-destructive border-l-2" : ""}`}
  >
    <div className="text-accent shrink-0">{icon}</div>
    <div className="flex-1">{children}</div>
  </li>
)

export default AdvisorTipItem
