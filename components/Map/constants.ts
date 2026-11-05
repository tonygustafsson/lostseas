export const MAP_WIDTH = 850
export const MAP_HEIGHT = 540
export const MAP_ZOOM = 1.5
export const TOWN_ANCHOR_SIZE = 20
export const TOWN_ICON_SIZE = 16

// Pixel sizes of the map art. Passed to Next.js so it doesn't shrink the
// images before the map is zoomed in.
export const MAP_IMAGE_WIDTH = 1586
export const MAP_IMAGE_HEIGHT = 992
export const TOWN_IMAGE_WIDTH = 696
export const TOWN_IMAGE_HEIGHT = 663

// Names of CSS variables. The canvas can't resolve var(), so it reads these
// from the page when drawing.
export const mapColorVariables = {
  shipGlow: "--sea",
  currentTownLabel: "--sea-dark",
  townLabel: "--color-black",
  outOfReachTownLabel: "--muted-foreground",
  trail: "--destructive",
  trailTravelled: "--color-neutral-700",
  fish: "--color-black",
  blueFish: "--sea-dark",
  fishSplash: "--foreground",
}
