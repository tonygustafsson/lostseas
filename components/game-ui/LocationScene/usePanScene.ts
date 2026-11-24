import { PointerEvent, useEffect, useRef, useState } from "react"

// Pixels a finger has to move before it counts as a drag, so taps still work
const DRAG_THRESHOLD = 6
// A glide loses most of its speed in about this long, in ms
const GLIDE_TIME = 300
// Pixels per ms, slower than this and the glide stops
const MIN_GLIDE_SPEED = 0.02

// Lets the player drag a scene that is wider than the screen sideways, and
// glide on after letting go. The scene's layers are the elements marked with
// data-pan-layer, they move together on the compositor so the ambience on the
// canvases never lags behind the picture. The scene starts in the middle.
//
// Returns the ref for the scene's box, the pan in pixels from the left of the
// picture (for things that are measured on the box), whether there is anything
// to pan, whether the player has dragged yet, and the pointer handlers.
export const usePanScene = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const panRef = useRef(0)
  const maxPan = useRef(0)
  const velocity = useRef(0)
  const lastMove = useRef({ x: 0, time: 0 })
  const dragStart = useRef<number | null>(null)
  const isDragging = useRef(false)
  const glide = useRef(0)
  const [canPan, setCanPan] = useState(false)
  const [hasPanned, setHasPanned] = useState(false)

  const move = (pan: number) => {
    panRef.current = Math.min(Math.max(pan, 0), maxPan.current)

    rootRef.current
      ?.querySelectorAll<HTMLElement>("[data-pan-layer]")
      .forEach((layer) => {
        layer.style.transform = `translate3d(${-panRef.current}px, 0, 0)`
      })
  }

  useEffect(() => {
    const root = rootRef.current
    const layer = root?.querySelector<HTMLElement>("[data-pan-layer]")

    if (!root || !layer) {
      return
    }

    // Keeps the same part of the picture in view when the screen turns
    const measure = () => {
      const previous = maxPan.current

      maxPan.current = Math.max(layer.offsetWidth - root.clientWidth, 0)
      move(
        previous
          ? (panRef.current / previous) * maxPan.current
          : maxPan.current / 2
      )
      setCanPan(maxPan.current > 0)
    }
    const observer = new ResizeObserver(measure)

    observer.observe(root)
    observer.observe(layer)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(glide.current)
    }
  }, [])

  const startGlide = () => {
    let last = performance.now()

    const step = (now: number) => {
      const elapsed = now - last
      const before = panRef.current

      last = now
      move(before + velocity.current * elapsed)
      velocity.current *= Math.exp(-elapsed / GLIDE_TIME)

      // Stops at the edge of the picture too
      if (
        Math.abs(velocity.current) > MIN_GLIDE_SPEED &&
        panRef.current !== before
      ) {
        glide.current = requestAnimationFrame(step)
      }
    }

    glide.current = requestAnimationFrame(step)
  }

  const onPointerDown = (event: PointerEvent) => {
    cancelAnimationFrame(glide.current)

    if (maxPan.current > 0) {
      dragStart.current = event.clientX
      lastMove.current = { x: event.clientX, time: event.timeStamp }
      velocity.current = 0
      isDragging.current = false
    }
  }

  const onPointerMove = (event: PointerEvent) => {
    if (dragStart.current === null) {
      return
    }

    if (!isDragging.current) {
      if (Math.abs(event.clientX - dragStart.current) < DRAG_THRESHOLD) {
        return
      }

      // Taps on the buttons are left alone, as a capture would take their click
      isDragging.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      setHasPanned(true)
    }

    const { x, time } = lastMove.current
    const elapsed = Math.max(event.timeStamp - time, 1)

    velocity.current =
      0.7 * velocity.current + 0.3 * (-(event.clientX - x) / elapsed)
    lastMove.current = { x: event.clientX, time: event.timeStamp }
    move(panRef.current - (event.clientX - x))
  }

  const onPointerEnd = (event: PointerEvent) => {
    const wasDragging = isDragging.current
    // A finger that rested before lifting does not throw the picture
    const isFlick = event.timeStamp - lastMove.current.time < 80
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    dragStart.current = null
    isDragging.current = false

    if (
      wasDragging &&
      isFlick &&
      !prefersReducedMotion &&
      Math.abs(velocity.current) > MIN_GLIDE_SPEED
    ) {
      startGlide()
    }
  }

  return {
    rootRef,
    panRef,
    canPan,
    hasPanned,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
  }
}
