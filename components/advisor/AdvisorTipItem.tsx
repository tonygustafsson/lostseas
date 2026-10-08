import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type Props = {
  icon: ReactNode
  children: ReactNode
  blocksTravel?: boolean
  variant?: "success" | "error"
}

const variantClass = {
  success: "bg-success/10",
  error: "bg-destructive/10",
}

const AdvisorTipItem = ({ icon, children, blocksTravel, variant }: Props) => (
  <li
    className={cn(
      "flex items-start gap-2 rounded-md px-2 py-1 text-sm leading-snug",
      variant ? variantClass[variant] : "bg-card",
      blocksTravel && "border-destructive border-l-2"
    )}
  >
    <div className="text-accent mt-1 shrink-0 *:size-4" aria-hidden="true">
      {icon}
    </div>
    <div className="min-w-0 flex-1">{children}</div>
  </li>
)

export default AdvisorTipItem
