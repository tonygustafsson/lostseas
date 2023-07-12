import { useEffect } from "react"

import { useSound } from "./context"

const Sound = () => {
  const { musicOn } = useSound()

  useEffect(() => {
    if (musicOn) {
      const musicPlayer = new Audio("music/song1.opus")
      musicPlayer.play()
    }
  }, [musicOn])

  return null
}

export default Sound
