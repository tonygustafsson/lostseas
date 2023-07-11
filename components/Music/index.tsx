import { getCookie } from "cookies-next"
import { useEffect } from "react"

import { MUSIC_STATE_COOKIE_NAME } from "@/constants/system"

const Music = () => {
  useEffect(() => {
    const musicCookieValue = getCookie(MUSIC_STATE_COOKIE_NAME)

    if (typeof musicCookieValue !== "undefined" && Boolean(musicCookieValue)) {
      const musicPlayer = new Audio("music/song1.opus")
      musicPlayer.play()
    }
  }, [])

  return null
}

export default Music
