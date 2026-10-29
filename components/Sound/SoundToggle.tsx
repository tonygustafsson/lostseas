import type { LucideIcon } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type Props = {
  id: string
  icon: LucideIcon
  title: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const SoundToggle = ({
  id,
  icon: Icon,
  title,
  checked,
  onCheckedChange,
}: Props) => (
  <label
    htmlFor={id}
    className={cn(
      "flex min-w-0 cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 transition-all",
      checked
        ? "border-gold/60 bg-gold/5"
        : "border-border bg-muted/30 opacity-70"
    )}
  >
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        checked
          ? "border-gold bg-gold/10 text-gold"
          : "border-muted-foreground/40 text-muted-foreground"
      )}
    >
      <Icon className="size-4" />
    </span>

    <span className="min-w-0 flex-1 truncate font-serif">{title}</span>

    <Switch
      id={id}
      checked={checked}
      onCheckedChange={(val) => onCheckedChange(Boolean(val))}
    />
  </label>
)

export default SoundToggle
