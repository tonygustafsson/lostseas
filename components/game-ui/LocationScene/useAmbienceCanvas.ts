import { RefObject, useEffect, useRef } from "react"

import { TOWN_MAP_DESKTOP_MEDIA } from "@/constants/townMaps"

import { type AmbienceRenderer, loadImage } from "./ambienceRenderer"

// Mask paths never contain this, so a list of them can be a stable effect
// dependency
const SEPARATOR = "|"

// Draws an animated scene on the GPU over an already loaded image, using the
// given masks as textures after the image. Pass mobile masks when the image
// switches with TOWN_MAP_DESKTOP_MEDIA. Only animates while on screen.
// Returns the ref for the element to draw in.
//
// Each run gets its own canvas, because a canvas whose context has been
// released can never draw again (Strict Mode runs effects twice).
export const useAmbienceCanvas = (
  imageRef: RefObject<HTMLImageElement | null>,
  createRenderer: (canvas: HTMLCanvasElement) => AmbienceRenderer | null,
  masks: string[] | undefined,
  mobileMasks?: string[]
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const masksKey = masks?.join(SEPARATOR)
  const mobileMasksKey = mobileMasks?.join(SEPARATOR)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (!container || !image || !masksKey || prefersReducedMotion) return

    const canvas = document.createElement("canvas")
    canvas.className = "size-full"
    container.append(canvas)

    const renderer = createRenderer(canvas)

    if (!renderer) {
      canvas.remove()
      return
    }

    let isCancelled = false
    let latestLoad = 0

    // Runs again when the picture switches between mobile and desktop. Only
    // the latest load is used, an earlier one finishing late would put the
    // masks on the wrong image.
    const loadTextures = () => {
      if (!image.complete || !image.naturalWidth) return

      const load = ++latestLoad
      const isDesktop = window.matchMedia(TOWN_MAP_DESKTOP_MEDIA).matches
      const sources = (
        !isDesktop && mobileMasksKey ? mobileMasksKey : masksKey
      ).split(SEPARATOR)

      Promise.all(sources.map(loadImage))
        .then((textures) => {
          if (!isCancelled && load === latestLoad) {
            renderer.setTextures([image, ...textures])
          }
        })
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
      renderer.destroy()
      canvas.remove()
    }
  }, [imageRef, createRenderer, masksKey, mobileMasksKey])

  return containerRef
}
