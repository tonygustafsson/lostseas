import { getImageProps } from "next/image"
import { preload } from "react-dom"

import { getLocationBackground, loadLocationAreas } from "@/utils/location"

import { warmUpBuildingSceneShader } from "./buildingSceneShader"

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

  // The water, sky and light are drawn in the browser from the polygons of the
  // town, so those are what to get ready. The browser keeps the loaded file.
  loadLocationAreas(town, location)

  // And the shader that draws them, which the first building takes a while to
  // build
  warmUpBuildingSceneShader()
}
