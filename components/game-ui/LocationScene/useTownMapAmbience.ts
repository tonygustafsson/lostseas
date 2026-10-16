import { RefObject, useEffect, useRef } from "react"

import {
  TOWN_MAP_DESKTOP_MEDIA,
  type TownMap as TownMapData,
} from "@/constants/townMaps"

import { createTownMapRenderer } from "./townMapShader"

const loadImage = (src: string) => {
  const image = new Image()
  image.src = src

  return image.decode().then(() => image)
}

// Rippling water, drifting clouds and seagulls drawn on the GPU, reusing the
// already loaded map image. Only animates while the map is on screen.
// Returns the ref for the canvas to draw on.
export const useTownMapAmbience = (
  map: TownMapData,
  imageRef: RefObject<HTMLImageElement | null>
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { waterMask: desktopWater, skyMask: desktopSky } = map.desktop
  const { waterMask: mobileWater, skyMask: mobileSky } = map.mobile

  useEffect(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (!canvas || !image || prefersReducedMotion) return

    const renderer = createTownMapRenderer(canvas)

    if (!renderer) return

    let isCancelled = false

    // Runs again when the picture switches between mobile and desktop
    const loadTextures = () => {
      if (!image.complete || !image.naturalWidth) return

      const isDesktop = window.matchMedia(TOWN_MAP_DESKTOP_MEDIA).matches

      Promise.all([
        loadImage(isDesktop ? desktopWater : mobileWater),
        loadImage(isDesktop ? desktopSky : mobileSky),
      ])
        .then(
          ([water, sky]) =>
            !isCancelled && renderer.setTextures({ image, water, sky })
        )
        .catch(() => undefined)
    }

    loadTextures()
    image.addEventListener("load", loadTextures)

    const observer = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? renderer.start() : renderer.stop()
    )
    observer.observe(canvas)

    return () => {
      isCancelled = true
      image.removeEventListener("load", loadTextures)
      observer.disconnect()
      renderer.stop()
    }
  }, [imageRef, desktopWater, desktopSky, mobileWater, mobileSky])

  return canvasRef
}
