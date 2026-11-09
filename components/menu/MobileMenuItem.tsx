import type { ReactNode } from "react"
import { FiChevronRight, FiExternalLink } from "react-icons/fi"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

type Props = {
  icon: ReactNode
  label: string
  badge?: number
  tone?: "default" | "danger"
  onClick?: () => void
  /** Opens in a new tab instead of running onClick */
  href?: string
}

const MobileMenuItem = ({
  icon,
  label,
  onClick,
  href,
  badge,
  tone = "default",
}: Props) => {
  const isDanger = tone === "danger"

  const className = cn(
    "h-auto w-full justify-start gap-4 px-2 py-2 text-base text-white transition-transform hover:bg-white/5 active:scale-95",
    isDanger && "text-destructive hover:text-destructive"
  )

  const content = (
    <>
      <span
        className={cn(
          "bg-background grid size-10 shrink-0 place-items-center rounded-full border [&_svg]:size-5!",
          isDanger
            ? "border-destructive/50 text-destructive"
            : "border-gold/50 text-gold"
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

      {href && <FiExternalLink className="text-muted-foreground" />}

      {!href && !isDanger && (
        <FiChevronRight className="text-muted-foreground" />
      )}
    </>
  )

  // Links open in a new tab so the game keeps running behind them
  if (href) {
    return (
      <Button asChild variant="ghost" className={className}>
        <a href={href} target="_blank" rel="noopener">
          {content}
        </a>
      </Button>
    )
  }

  return (
    <Button variant="ghost" onClick={onClick} className={className}>
      {content}
    </Button>
  )
}

export default MobileMenuItem
