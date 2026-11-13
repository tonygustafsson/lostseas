import { RefObject, useEffect, useRef } from "react"

import { TOWN_MAP_DESKTOP_MEDIA } from "@/constants/townMaps"

import {
  type AmbienceRenderer,
  type AmbienceUniforms,
  loadImage,
} from "./ambienceRenderer"

// Mask paths never contain this, so a list of them can be a stable effect
// dependency
const SEPARATOR = "|"

type Options = {
  mobileMasks?: string[]
  // Undefined until known, like the weather before the player has loaded
  uniforms: AmbienceUniforms | undefined
}

// Draws an animated scene on the GPU over an already loaded image, using the
// given masks as textures after the image. Pass mobile masks when the image
// switches with TOWN_MAP_DESKTOP_MEDIA. Nothing is drawn until the uniforms
// are known, so the scene never starts with the wrong weather. Changed
// uniforms fade in on the same renderer. Only animates while on screen.
// Returns the ref for the element to draw in.
//
// Each run gets its own canvas, because a canvas whose context has been
// released can never draw again (Strict Mode runs effects twice).
export const useAmbienceCanvas = (
  imageRef: RefObject<HTMLImageElement | null>,
  createRenderer: (canvas: HTMLCanvasElement) => AmbienceRenderer | null,
  masks: string[] | undefined,
  { mobileMasks, uniforms }: Options
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<AmbienceRenderer | null>(null)
  const masksKey = masks?.join(SEPARATOR)
  const mobileMasksKey = mobileMasks?.join(SEPARATOR)
  const hasUniforms = !!uniforms

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (
      !container ||
      !image ||
      !masksKey ||
      !hasUniforms ||
      prefersReducedMotion
    ) {
      return
    }

    const canvas = document.createElement("canvas")
    canvas.className = "size-full"
    container.append(canvas)

    const renderer = createRenderer(canvas)

    if (!renderer) {
      canvas.remove()
      return
    }

    rendererRef.current = renderer

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

      // The shown image's naturalWidth is divided by the srcset density, a
      // fresh copy of the same file has its real size
      Promise.all([image.currentSrc, ...sources].map(loadImage))
        .then(([picture, ...textures]) => {
          if (!isCancelled && load === latestLoad) {
            renderer.setTextures([picture, ...textures])
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
      rendererRef.current = null
    }
  }, [imageRef, createRenderer, masksKey, mobileMasksKey, hasUniforms])

  // Runs after the effect above, and again for every new renderer it makes.
  // Uniforms should be a stable object, like one from a constant table.
  useEffect(() => {
    if (uniforms) {
      rendererRef.current?.setUniforms(uniforms)
    }
  }, [uniforms, createRenderer, masksKey, mobileMasksKey, hasUniforms])

  return containerRef
}
