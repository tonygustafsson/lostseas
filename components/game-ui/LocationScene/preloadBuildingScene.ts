import { getImageProps } from "next/image"
import { preload } from "react-dom"

import { getLocationAmbience, getLocationBackground } from "@/utils/location"

// Starts loading a building's picture and masks before the player walks in,
// so the scene shows up with its weather straight away. The image props must
// match the Image in BuildingScene, or the browser fetches a different file.
export const preloadBuildingScene = (
  town: Character["town"],
  location: TownLocation
) => {
  const { props } = getImageProps({
    src: getLocationBackground(town, location),
    fill: true,
    alt: "",
  })

  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
  })

  const ambience = getLocationAmbience(town, location)

  if (ambience) {
    Object.values(ambience).forEach((src) => preload(src, { as: "image" }))
  }
}
