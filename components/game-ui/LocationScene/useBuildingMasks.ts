import { useEffect, useState } from "react"

import {
  type Fire,
  getLocationAmbience,
  getLocationFires,
} from "@/utils/location"

import { makeFireMaskUrl } from "./fireMask"

// The water, sky and light masks of a building, in the order the shader wants
// them. A building with fires gets its light made from them in the browser
// and its light picture is not used. Undefined while that is made, and when
// there is no town. Pass fires to try ones that are not saved yet.
export const useBuildingMasks = (
  town: Character["town"],
  location: Character["location"],
  fires: Fire[] = getLocationFires(town, location)
) => {
  const ambience = getLocationAmbience(town, location)
  const [made, setMade] = useState<{ fires: Fire[]; url: string }>()

  // Effect because the mask is made asynchronously on a canvas
  useEffect(() => {
    if (!fires.length) {
      return
    }

    let isCancelled = false
    let url: string | undefined

    makeFireMaskUrl(fires).then((madeUrl) => {
      if (isCancelled) {
        URL.revokeObjectURL(madeUrl)

        return
      }

      url = madeUrl
      setMade({ fires, url })
    })

    return () => {
      isCancelled = true

      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [fires])

  if (!ambience) {
    return undefined
  }

  if (!fires.length) {
    return [ambience.water, ambience.sky, ambience.light]
  }

  return made?.fires === fires
    ? [ambience.water, ambience.sky, made.url]
    : undefined
}
