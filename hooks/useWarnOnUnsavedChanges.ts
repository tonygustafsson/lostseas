import { useEffect } from "react"

import useUnsavedChanges from "@/app/stores/unsavedChanges"

/**
 * Flags that leaving would lose changes, so the "Back to town" button can
 * ask first. Closing or reloading the tab gets the browser's own prompt.
 */
export const useWarnOnUnsavedChanges = (hasChanges: boolean) => {
  const setHasUnsavedChanges = useUnsavedChanges((s) => s.setHasUnsavedChanges)

  useEffect(() => {
    setHasUnsavedChanges(hasChanges)

    if (!hasChanges) {
      return
    }

    const warn = (event: BeforeUnloadEvent) => event.preventDefault()

    window.addEventListener("beforeunload", warn)

    return () => {
      window.removeEventListener("beforeunload", warn)
      setHasUnsavedChanges(false)
    }
  }, [hasChanges, setHasUnsavedChanges])
}
