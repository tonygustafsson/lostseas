import { getImageProps } from "next/image"
import { preload } from "react-dom"

import {
  TOWN_MAP_DESKTOP_MEDIA,
  type TownMap as TownMapData,
} from "@/constants/townMaps"

const TOWN_MAP_MOBILE_MEDIA = `not all and ${TOWN_MAP_DESKTOP_MEDIA}`

// Shared by the town map picture and its preload, so both ask for the same files
export const getTownMapImageProps = (map: TownMapData, alt: string) => {
  const { desktop, mobile } = map

  const { props: desktopProps } = getImageProps({
    src: desktop.src,
    width: desktop.width,
    height: desktop.height,
    sizes: "100vw",
    alt,
  })

  const { props: mobileProps } = getImageProps({
    src: mobile.src,
    width: mobile.width,
    height: mobile.height,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
    alt,
  })

  return { desktopProps, mobileProps }
}

// Starts loading the town map and its masks while still at sea, so the harbour
// shows up with its weather straight away. Only the version for this screen
// size is fetched.
export const preloadTownMap = (map: TownMapData) => {
  const { desktopProps, mobileProps } = getTownMapImageProps(map, "")

  const versions = [
    { props: desktopProps, masks: map.desktop, media: TOWN_MAP_DESKTOP_MEDIA },
    { props: mobileProps, masks: map.mobile, media: TOWN_MAP_MOBILE_MEDIA },
  ]

  versions.forEach(({ props, masks, media }) => {
    preload(props.src, {
      as: "image",
      imageSrcSet: props.srcSet,
      imageSizes: props.sizes,
      media,
    })

    preload(masks.waterMask, { as: "image", media })
    preload(masks.skyMask, { as: "image", media })
  })
}
