import type { ReactNode } from "react"
import { FiChevronRight } from "react-icons/fi"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

type Props = {
  icon: ReactNode
  label: string
  onClick: () => void
  badge?: number
  tone?: "default" | "danger"
}

const MobileMenuItem = ({
  icon,
  label,
  onClick,
  badge,
  tone = "default",
}: Props) => {
  const isDanger = tone === "danger"

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "h-auto w-full justify-start gap-4 px-2 py-2 text-base text-slate-200 transition-transform hover:bg-white/5 active:scale-95",
        isDanger && "text-destructive hover:text-destructive"
      )}
    >
      <span
        className={cn(
          "bg-background grid size-10 shrink-0 place-items-center rounded-full border [&_svg]:size-5!",
          isDanger
            ? "border-destructive/50 text-destructive"
            : "border-gold/50 text-accent"
        )}
      >
        {icon}
      </span>

      <span className="flex-1 text-left">{label}</span>

      {!!badge && (
        <span className="bg-warning/20 text-warning rounded-full px-2 py-1 text-xs leading-none">
          {badge}
        </span>
      )}

      {!isDanger && <FiChevronRight className="text-muted-foreground" />}
    </Button>
  )
}

export default MobileMenuItem
