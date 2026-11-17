import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  /** The zoom as a factor, 1 being the map's normal size */
  zoom: number
  canZoomIn: boolean
  canZoomOut: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  className?: string
}

const ZoomControl = ({
  zoom,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  className,
}: Props) => (
  <div
    className={cn(
      "bg-card/90 border-border flex items-center gap-1 rounded-md border p-1",
      className
    )}
    // Keeps the map underneath from starting a drag
    onPointerDown={(event) => event.stopPropagation()}
  >
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Zoom out"
      disabled={!canZoomOut}
      onClick={onZoomOut}
    >
      <Minus />
    </Button>

    <span aria-live="polite" className="w-12 text-center text-sm tabular-nums">
      {Math.round(zoom * 100)}%
    </span>

    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Zoom in"
      disabled={!canZoomIn}
      onClick={onZoomIn}
    >
      <Plus />
    </Button>
  </div>
)

export default ZoomControl
