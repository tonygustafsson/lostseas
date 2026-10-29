export const MAP_WIDTH = 850
export const MAP_HEIGHT = 540
export const MAP_ZOOM = 1.5
export const TOWN_ANCHOR_SIZE = 20

// Names of CSS variables. The canvas can't resolve var(), so it reads these
// from the page when drawing.
export const mapColorVariables = {
  shipGlow: "--color-black",
  currentTownLabel: "--color-sky-900",
  townLabel: "--color-black",
  outOfReachTownLabel: "--color-gold-dark",
  trail: "--destructive",
  trailTravelled: "--color-neutral-700",
}
