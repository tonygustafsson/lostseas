import { useId } from "react"

import RingShimmer from "@/components/RingShimmer"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export const LogoMark = ({ className }: Props) => {
  const id = useId()
  const gold = `url(#${id}-gold)`

  return (
    <span className={cn("relative size-11 shrink-0 sm:size-12", className)}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
        <defs>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold-light)" />
            <stop offset="50%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold-dark)" />
          </linearGradient>

          <linearGradient id={`${id}-sails`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="var(--parchment)" />
            <stop
              offset="100%"
              stopColor="color-mix(in oklch, var(--parchment), var(--gold-dark) 35%)"
            />
          </linearGradient>

          <linearGradient id={`${id}-night`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sea-dark)" />
            <stop
              offset="100%"
              stopColor="color-mix(in oklch, var(--sea-dark), var(--background) 60%)"
            />
          </linearGradient>
        </defs>

        <circle cx="32" cy="32" r="31" fill={`url(#${id}-night)`} />
        <circle
          cx="32"
          cy="32"
          r="29.5"
          fill="none"
          stroke={gold}
          strokeWidth="2"
        />

        <g transform="translate(10 9) scale(0.69)">
          <g fill={gold}>
            <rect x="22" y="6" width="2" height="30" />
            <rect x="42" y="12" width="2" height="24" />
          </g>

          <path d="M23 6 30 8 23 10Z" fill="var(--error)" />

          <path
            d="M11 35 3 28"
            stroke={gold}
            strokeWidth="2"
            strokeLinecap="round"
          />

          <g fill={`url(#${id}-sails)`}>
            <path d="M14 9Q23 7 32 9Q30.5 20 32 31Q23 29 14 31Q15.5 20 14 9Z" />
            <path d="M36 15Q43 13.5 50 15Q48.5 23 50 31Q43 29.5 36 31Q37.5 23 36 15Z" />
          </g>

          {/* Hull with a raised stern castle */}
          <path d="M4 36H45V30H57L55 40 50 48Q30 52 12 48Z" fill={gold} />

          <g fill="var(--background)">
            <rect x="48" y="32" width="2.5" height="3" />
            <rect x="52" y="32" width="2.5" height="3" />
            <circle cx="18" cy="41" r="1.5" />
            <circle cx="30" cy="41" r="1.5" />
          </g>

          <path
            d="M6 58Q11 55 16 58T26 58T36 58T46 58T56 58"
            fill="none"
            stroke="var(--sea)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* A glint that runs once around the gold rim when the logo is hovered */}
      <RingShimmer className="motion-safe:group-hover/logo:animate-ring-shimmer" />
    </span>
  )
}

/** The game's name beside its mark, gilded like the townsfolk cards */
const Logo = ({ className }: Props) => (
  <span className={cn("group/logo flex items-center gap-3", className)}>
    <LogoMark />

    <span className="from-gold-light via-gold to-gold-dark bg-linear-to-b bg-clip-text font-serif text-2xl font-bold tracking-wide text-transparent sm:text-3xl">
      Lost Seas
    </span>
  </span>
)

export default Logo
