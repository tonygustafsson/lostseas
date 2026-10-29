import type { LucideIcon } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type Props = {
  id: string
  icon: LucideIcon
  title: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children?: React.ReactNode
}

const SoundChannel = ({
  id,
  icon: Icon,
  title,
  checked,
  onCheckedChange,
  children,
}: Props) => (
  <div
    className={cn(
      "rounded-xl border p-4 transition-all",
      checked
        ? "border-gold/60 bg-gold/5 shadow-gold/10 shadow-lg"
        : "border-border bg-muted/30 opacity-70"
    )}
  >
    <label htmlFor={id} className="flex cursor-pointer items-center gap-4">
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          checked
            ? "border-gold bg-gold/10 text-gold"
            : "border-muted-foreground/40 text-muted-foreground"
        )}
      >
        <Icon className="size-6" />
      </span>

      <span className="flex flex-1 flex-col">
        <span className="font-serif text-lg">{title}</span>
      </span>

      <Switch
        id={id}
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(Boolean(val))}
      />
    </label>

    {checked && children && (
      <div className="border-gold/20 mt-4 flex items-center justify-between gap-4 border-t pt-4">
        {children}
      </div>
    )}
  </div>
)

export default SoundChannel
