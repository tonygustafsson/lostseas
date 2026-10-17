import { useEffect, useState } from "react"
import { flushSync } from "react-dom"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

export type SceneLocation = {
  town: Character["town"]
  location: Character["location"] | undefined
}

// Holds back location changes until the browser has captured the old scene,
// so moving between harbour, buildings and sea can crossfade with a view
// transition.
export const useSceneLocation = () => {
  const { data: player } = useGetPlayer()
  const town = player?.character.town
  const location = player?.character.location

  const [scene, setScene] = useState<SceneLocation>({ town, location })

  const canAnimate =
    typeof document !== "undefined" && !!document.startViewTransition
  const hasChanged = location !== scene.location || town !== scene.town

  // The first location, and every change in browsers without view
  // transitions, is shown straight away
  if (location && hasChanged && (!scene.location || !canAnimate)) {
    setScene({ town, location })
  }

  useEffect(() => {
    if (!location || !scene.location || !document.startViewTransition) return
    if (location === scene.location && town === scene.town) return

    document.startViewTransition(() =>
      flushSync(() => setScene({ town, location }))
    )
  }, [town, location, scene.town, scene.location])

  // Start every new scene at the top of the page. Runs inside the view
  // transition's flushSync, so the new snapshot is already scrolled up.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [scene.town, scene.location])

  return scene
}
