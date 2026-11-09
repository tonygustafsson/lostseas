import { Lightbulb, TriangleAlert } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type Props = {
  variant?: "tip" | "warning"
  title?: string
  children: ReactNode
}

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    title: "Captain's tip",
    className: "border-info/30 bg-info/10 [&>svg]:text-info",
  },
  warning: {
    icon: TriangleAlert,
    title: "Mind the reef",
    className: "border-warning/30 bg-warning/10 [&>svg]:text-warning",
  },
}

const GuideTip = ({ variant = "tip", title, children }: Props) => {
  const { icon: Icon, title: defaultTitle, className } = VARIANTS[variant]

  return (
    <aside
      className={cn(
        "flex gap-4 rounded-2xl border p-4 text-base leading-7",
        className
      )}
    >
      <Icon className="mt-1 size-5 shrink-0" aria-hidden="true" />

      <div>
        <p className="text-parchment font-serif text-lg">
          {title ?? defaultTitle}
        </p>
        <div className="text-foreground/85">{children}</div>
      </div>
    </aside>
  )
}

export default GuideTip
