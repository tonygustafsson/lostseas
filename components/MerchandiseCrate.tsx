import { Info } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  image: string
  /** Text on the paper label on the front of the crate, like what you own */
  label: React.ReactNode
  /** Goes in the box sunken into the plank below the crate */
  children: React.ReactNode
}

const Nail = ({ className }: { className: string }) => (
  <span aria-hidden="true" className={cn("pixel-nail absolute", className)} />
)

// Upright corner board on the front of the crate
const Batten = ({ className }: { className: string }) => (
  <span
    aria-hidden="true"
    className={cn(
      "pixel-wood absolute inset-y-0 w-4 [--wood-shade:-0.12]",
      className
    )}
  >
    <Nail className="top-1 left-1" />
    <Nail className="bottom-1 left-1" />
  </span>
)

// Paper label nailed onto the crate
const CrateLabel = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={cn(
      "bg-parchment relative border-2 border-(--wood-ink) px-8 py-1 font-serif text-lg font-bold tracking-widest text-(--wood-ink) uppercase shadow-[inset_0_2px_0_oklch(1_0_0/45%),inset_0_-2px_0_oklch(0_0_0/25%),0_2px_0_oklch(0_0_0/50%)]",
      className
    )}
  >
    <Nail className="top-1/2 left-2 -translate-y-1/2" />
    <Nail className="top-1/2 right-2 -translate-y-1/2" />

    {children}
  </div>
)

/** Gold info button that shows a description, for the controls in a crate. */
export const MerchandiseInfo = ({
  title,
  description,
}: {
  title: string
  description: React.ReactNode
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        size="icon-sm"
        variant="ghost"
        aria-label={`About ${title}`}
        className="text-sea rounded-none"
      >
        <Info className="size-5" />
      </Button>
    </PopoverTrigger>

    <PopoverContent>{description}</PopoverContent>
  </Popover>
)

/** A pixel-art wooden crate with the goods inside and a plank for controls. */
const MerchandiseCrate = ({ title, image, label, children }: Props) => (
  <li className="flex flex-col">
    {/* Open crate seen from above and in front, like chests in hi-bit pixel games:
        lit rims on top, the inside of the back wall, then the front face */}
    <div className="pixel-wood relative border-2 p-3 [--wood-shade:0.1]">
      <CrateLabel
        className={cn(
          "absolute top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap",
          // Long names, like remedies, on a smaller label so they fit
          title.length > 12 && "px-6 text-base tracking-wider"
        )}
      >
        <h3>{title}</h3>
      </CrateLabel>

      <div className="relative aspect-4/3 overflow-hidden border-2 border-(--wood-ink) select-none">
        <div className="pixel-wood h-8 border-b-2 [--wood-shade:-0.14]" />

        <div className="absolute inset-x-0 top-8 bottom-0">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="object-cover saturate-80"
          />

          <div className="pixel-recess absolute inset-0" />
        </div>
      </div>
    </div>

    <div className="pixel-wood relative flex h-12 items-center justify-center border-x-2 border-b-2 [--wood-shade:-0.05]">
      <Batten className="left-0 border-r-2" />
      <Batten className="right-0 border-l-2" />

      <CrateLabel className="px-6 py-0.5 text-base tabular-nums">
        {label}
      </CrateLabel>
    </div>

    {/* Plank nailed below the crate */}
    <div className="pixel-wood relative flex flex-1 flex-col border-x-2 border-b-2 p-4 pt-5 shadow-[0_4px_0_oklch(0_0_0/45%)] [--wood-shade:-0.04]">
      <Nail className="top-1 left-1" />
      <Nail className="top-1 right-1" />
      <Nail className="bottom-1 left-1" />
      <Nail className="right-1 bottom-1" />

      <div className="bg-card @container flex flex-1 flex-col gap-2 p-3 shadow-[inset_2px_2px_0_oklch(0_0_0/60%),inset_-2px_-2px_0_oklch(1_0_0/10%)]">
        {children}
      </div>
    </div>
  </li>
)

export default MerchandiseCrate
