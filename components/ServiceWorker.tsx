"use client"

import { useEffect } from "react"
import { toast } from "sonner"

const OFFLINE_TOAST_ID = "offline"
const UPDATE_TOAST_ID = "update"

export default function ServiceWorker() {
  useEffect(() => {
    const handleOffline = () =>
      toast.error("You are offline. Reconnect to keep playing.", {
        id: OFFLINE_TOAST_ID,
        duration: Infinity,
      })
    const handleOnline = () => toast.dismiss(OFFLINE_TOAST_ID)

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    if (!navigator.onLine) handleOffline()

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    if (!("serviceWorker" in navigator)) return

    const promptUpdate = (worker: ServiceWorker) =>
      toast("A new version is available.", {
        id: UPDATE_TOAST_ID,
        duration: Infinity,
        action: {
          label: "Reload",
          onClick: () => {
            navigator.serviceWorker.addEventListener(
              "controllerchange",
              () => window.location.reload(),
              { once: true }
            )
            worker.postMessage("SKIP_WAITING")
          },
        },
      })

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        promptUpdate(registration.waiting)
      }

      registration.addEventListener("updatefound", () => {
        const worker = registration.installing

        worker?.addEventListener("statechange", () => {
          if (
            worker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            promptUpdate(worker)
          }
        })
      })
    })
  }, [])

  return null
}
