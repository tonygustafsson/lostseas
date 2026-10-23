import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatGold } from "@/utils/number"

const SHARES = [
  { label: "25%", share: 0.25 },
  { label: "50%", share: 0.5 },
  { label: "75%", share: 0.75 },
  { label: "All", share: 1 },
]

type Props = {
  icon: ReactNode
  title: string
  description?: string
  verb: string
  max: number
  emptyMessage: string
  disabled?: boolean
  onSelect: (amount: number) => void
}

const QuickAmounts = ({
  icon,
  title,
  description,
  verb,
  max,
  emptyMessage,
  disabled,
  onSelect,
}: Props) => (
  <div className="bg-card rounded-xl border">
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="border-accent/60 bg-background text-accent flex size-11 shrink-0 items-center justify-center rounded-full border shadow-md [&_svg]:size-6"
        >
          {icon}
        </span>

        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold">{title}</h3>
          {description && (
            <p className="text-foreground text-sm">{description}</p>
          )}
        </div>
      </div>

      {max > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SHARES.map(({ label, share }) => {
            const amount = Math.floor(max * share)

            if (amount < 1) {
              return null
            }

            return (
              <Button
                key={label}
                variant={share === 1 ? "highlight" : "secondary"}
                className={cn(
                  "h-auto flex-col gap-0 py-2 font-serif",
                  share === 1
                    ? "hover:bg-amber-100"
                    : "hover:bg-secondary hover:brightness-125"
                )}
                aria-label={`${verb} ${share === 1 ? "all" : label} (${formatGold(amount)})`}
                disabled={disabled}
                onClick={() => onSelect(amount)}
              >
                <span className="text-base font-semibold">{label}</span>
                <span className="text-xs tabular-nums opacity-80">
                  {formatGold(amount)}
                </span>
              </Button>
            )
          })}
        </div>
      ) : (
        <p className="text-foreground text-sm italic">{emptyMessage}</p>
      )}
    </div>
  </div>
)

export default QuickAmounts
