"use client"

import { useIsFetching } from "@tanstack/react-query"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

export default function PageSpinner() {
  const isFetchingCount = useIsFetching({
    predicate: (query) => {
      if ((query.state.data as Player)?.character?.journey) {
        // Prevent loading screen while on journey
        return false
      }

      return true
    },
  })

  return (
    <Dialog open={isFetchingCount > 0}>
      <DialogContent
        showCloseButton={false}
        className="w-auto max-w-none justify-center gap-0 overflow-hidden bg-transparent p-0 ring-0"
        aria-describedby="page-spinner-desc"
      >
        <DialogTitle className="sr-only">Loading...</DialogTitle>
        <p id="page-spinner-desc" className="sr-only">
          Loading
        </p>
        <Spinner className="size-16" />
      </DialogContent>
    </Dialog>
  )
}
