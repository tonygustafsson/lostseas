import { useEffect, useMemo } from "react"

import { useSound } from "./context"

const Sound = () => {
  const { musicOn } = useSound()

  const musicPlayer = useMemo(
    () => typeof Audio !== "undefined" && new Audio(),
    []
  )

  useEffect(() => {
    if (!musicPlayer) return

    if (musicOn && !musicPlayer.src) {
      musicPlayer.src = "music/song1.opus"
      musicPlayer.play()
    } else if (musicOn && musicPlayer.src) {
      musicPlayer.play()
    } else {
      musicPlayer.pause()
    }
  }, [musicOn, musicPlayer])

  return null
}

export default Sound
