"use client"

import { useIsFetching } from "@tanstack/react-query"

export default function PageSpinner() {
  const isFetching = useIsFetching({
    predicate: (query) => {
      if ((query.state.data as Player)?.character?.journey) {
        // Prevent loading screen while on journey
        return false
      }

      return true
    },
  })

  if (!isFetching) {
    return null
  }

  return (
    <div className="global-loading-indicator">
      <div className="spinner"></div>
    </div>
  )
}
