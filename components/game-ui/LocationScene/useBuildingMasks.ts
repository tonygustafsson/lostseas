import { useEffect, useState } from "react"

import {
  type DustSource,
  type Fire,
  getLocationAmbience,
  getLocationDust,
  getLocationFires,
} from "@/utils/location"

import { makeLightMaskUrl } from "./lightMask"

// The water, sky and light masks of a building, in the order the shader wants
// them. A building with fires or dust sources gets its light made from them in
// the browser and its light picture is not used. Undefined while that is made,
// and when there is no town. Pass fires and dust to try ones that are not saved
// yet.
export const useBuildingMasks = (
  town: Character["town"],
  location: Character["location"],
  fires: Fire[] = getLocationFires(town, location),
  dust: DustSource[] = getLocationDust(town, location)
) => {
  const ambience = getLocationAmbience(town, location)
  const hasLight = fires.length > 0 || dust.length > 0
  const [made, setMade] = useState<{
    fires: Fire[]
    dust: DustSource[]
    url: string
  }>()

  // Effect because the mask is made asynchronously on a canvas
  useEffect(() => {
    if (!hasLight) {
      return
    }

    let isCancelled = false
    let url: string | undefined

    makeLightMaskUrl(fires, dust).then((madeUrl) => {
      if (isCancelled) {
        URL.revokeObjectURL(madeUrl)

        return
      }

      url = madeUrl
      setMade({ fires, dust, url })
    })

    return () => {
      isCancelled = true

      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [hasLight, fires, dust])

  if (!ambience) {
    return undefined
  }

  if (!hasLight) {
    return [ambience.water, ambience.sky, ambience.light]
  }

  return made?.fires === fires && made.dust === dust
    ? [ambience.water, ambience.sky, made.url]
    : undefined
}
