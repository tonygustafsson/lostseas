import { cn } from "@/lib/utils"

type Props = {
  /** Decides when the glint runs, like `motion-safe:group-hover/logo:animate-ring-shimmer` */
  className: string
}

/** A glint that runs once around a round gold rim */
const RingShimmer = ({ className }: Props) => (
  <span
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(transparent_0_50%,var(--gold-light)_75%,var(--foreground)_88%,transparent_100%)] mask-[radial-gradient(closest-side,transparent_87%,black_89%,black_95%,transparent_97%)] opacity-0",
      className
    )}
  />
)

export default RingShimmer
