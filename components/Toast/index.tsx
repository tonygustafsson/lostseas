import { useEffect, useRef } from "react"
import { toast as sonnerToast } from "sonner"

import { useToasts } from "@/app/stores/toasts"
import { Toaster } from "@/components/ui/sonner"

const Toast = () => {
  const toasts = useToasts((s) => s.toasts)
  const removeToast = useToasts((s) => s.removeToast)

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sonnerToast.dismiss()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return <Toaster position="top-right" closeButton />
}

export default Toast
