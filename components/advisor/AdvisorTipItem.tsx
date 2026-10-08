import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type Props = {
  icon: ReactNode
  children: ReactNode
  variant?: "success" | "warning" | "error"
}

const variantClass = {
  success: "border-success bg-success/25 border-l-4 px-4 py-2",
  warning: "border-accent bg-accent/15 border-l-4 px-4 py-2",
  error: "border-destructive bg-destructive/25 border-l-4 px-4 py-2",
}

const AdvisorTipItem = ({ icon, children, variant }: Props) => (
  <li
    className={cn(
      "flex items-center gap-2 rounded-md text-sm leading-snug",
      variant ? variantClass[variant] : "bg-card px-2 py-1"
    )}
  >
    <div className="text-accent shrink-0 *:size-4" aria-hidden="true">
      {icon}
    </div>
    <div className="min-w-0 flex-1">{children}</div>
  </li>
)

export default AdvisorTipItem
