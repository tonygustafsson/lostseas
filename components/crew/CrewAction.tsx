import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type Props = {
  icon: React.ReactNode
  title: string
  /** What the player has to give, shown beside the title. */
  owned: React.ReactNode
  description: string
  /** A CrewActionChange showing what the chosen amount does. */
  change: React.ReactNode
  /** The amount and the button. */
  children: React.ReactNode
}

/** One compact section of the Manage Crew dialog. */
const CrewAction = ({
  icon,
  title,
  owned,
  description,
  change,
  children,
}: Props) => (
  <section className="bg-card flex min-w-0 flex-col gap-4 rounded-xl border p-4">
    <div className="flex items-start gap-4">
      <div className="bg-muted text-gold flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg]:size-6">
        {icon}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-lg leading-tight">{title}</h3>

          <span className="text-muted-foreground truncate text-xs tabular-nums">
            {owned}
          </span>
        </div>

        <p className="text-muted-foreground text-sm leading-snug">
          {description}
        </p>
      </div>
    </div>

    {change}

    <div className="flex items-center justify-between gap-2">{children}</div>
  </section>
)

type ChangeProps = {
  label: string
  from: number
  to: number
  /** The full bar. Defaults to 100 for percentages. */
  max?: number
  suffix?: string
}

/**
 * A striped bar of the crew value now, with the part the chosen amount
 * adds in green or takes away in red.
 */
export const CrewActionChange = ({
  label,
  from,
  to,
  max = 100,
  suffix = "",
}: ChangeProps) => {
  const percent = (value: number) =>
    max > 0 ? (Math.min(Math.max(value, 0), max) / max) * 100 : 0

  const kept = percent(Math.min(from, to))
  const changed = percent(Math.max(from, to)) - kept

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 text-sm tabular-nums">
        <span className="text-muted-foreground">{label}</span>

        <span
          className="flex items-center gap-1"
          aria-label={`${from}${suffix} to ${to}${suffix}`}
        >
          <span className="text-muted-foreground">
            {from}
            {suffix}
          </span>

          <ArrowRight
            className="text-muted-foreground size-3 shrink-0"
            aria-hidden="true"
          />

          <span
            className={cn(
              "font-semibold",
              to > from && "text-success",
              to < from && "text-error"
            )}
          >
            {to}
            {suffix}
          </span>
        </span>
      </div>

      <div
        className="bg-muted relative h-3 overflow-hidden rounded-4xl"
        aria-hidden="true"
      >
        <div
          className="striped-bar bar-sea absolute inset-y-0 left-0 transition-all"
          style={{ width: `${kept}%` }}
        />

        <div
          className={cn(
            "striped-bar absolute inset-y-0 transition-all",
            to > from ? "bar-success" : "bar-error"
          )}
          style={{ left: `${kept}%`, width: `${changed}%` }}
        />
      </div>
    </div>
  )
}

export default CrewAction
