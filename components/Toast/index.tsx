import { useEffect, useRef } from "react"
import { toast as sonnerToast } from "sonner"

import { Toaster } from "@/components/ui/sonner"

import { useToast } from "./context"

const Toast = () => {
  const { toasts, removeToast } = useToast()
  const shown = useRef<Record<string, boolean>>({})

  useEffect(() => {
    Object.values(toasts).forEach((t) => {
      if (!t.visible) return
      if (shown.current[t.id || ""]) return

      const message = [t.title, typeof t.message === "string" ? t.message : ""]
        .filter(Boolean)
        .join(" — ")

      if (t.variant === "success") {
        sonnerToast.success(message || "")
      } else if (t.variant === "error") {
        sonnerToast.error(message || "")
      } else {
        sonnerToast(message || "")
      }

      shown.current[t.id || ""] = true
      // remove from our legacy context so we don't double-show
      removeToast(t.id || "")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toasts])

  // Render Sonner's Toaster with default shadcn design
  return <Toaster />
}

export default Toast
