import { useEffect, useState } from "react"

import {
  type BuildingAreas,
  type Fire,
  getLocationFires,
  loadLocationAreas,
} from "@/utils/location"

import { BUILDING_AREA, drawAreaMask } from "./areaMask"
import {
  BUILDING_HEIGHT,
  BUILDING_WIDTH,
  drawLightMask,
  getDustSources,
} from "./lightMask"
import type { CanvasMask } from "./useAmbienceCanvas"

type Made = {
  town: Character["town"]
  location: Character["location"]
  fires: Fire[]
  areas: BuildingAreas | undefined
  masks: CanvasMask[]
}

// Every set of masks gets keys of its own, they say which canvases are which
let generation = 0

// The water, sky and light masks of a building, in the order the shader wants
// them. They are drawn in the browser from the sky and water polygons of the
// building and its fires, a building without any gets an empty mask, and are
// used as textures straight from the canvas. Undefined while the polygons are
// loaded, and when there is no town. Pass fires and areas to try ones that are
// not saved yet.
export const useBuildingMasks = (
  town: Character["town"],
  location: Character["location"],
  fires: Fire[] = getLocationFires(town, location),
  liveAreas?: BuildingAreas
) => {
  const [made, setMade] = useState<Made>()

  // Effect because the polygons are loaded on demand
  useEffect(() => {
    if (!town) {
      return
    }

    let isCancelled = false

    const make = async () => {
      const areas = (liveAreas ??
        (await loadLocationAreas(town, location))) || {
        sky: [],
        water: [],
      }

      if (isCancelled) {
        return
      }

      const id = ++generation
      const canvases = [
        drawAreaMask(
          BUILDING_WIDTH,
          BUILDING_HEIGHT,
          areas.water,
          BUILDING_AREA
        ),
        drawAreaMask(BUILDING_WIDTH, BUILDING_HEIGHT, areas.sky, BUILDING_AREA),
        drawLightMask(fires, getDustSources(areas)),
      ]

      setMade({
        town,
        location,
        fires,
        areas: liveAreas,
        masks: canvases.map((canvas, i) => ({
          key: `building-mask-${id}-${i}`,
          canvas,
        })),
      })
    }

    make()

    return () => {
      isCancelled = true
    }
  }, [town, location, fires, liveAreas])

  return made &&
    made.town === town &&
    made.location === location &&
    made.fires === fires &&
    made.areas === liveAreas
    ? made.masks
    : undefined
}
