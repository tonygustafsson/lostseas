// Map units. The height follows the shape of the map art.
export const MAP_WIDTH = 995
export const MAP_HEIGHT = 622
// The zoom is fitted to an 850 by 540 view, the shape of the map's frame, not
// to the whole map, so the map is shown at the same size whatever it covers.
export const MAP_VIEW_WIDTH = 850
export const MAP_VIEW_HEIGHT = 540
export const MAP_ZOOM = 1.3125
// Zoom steps the player can pick, relative to MAP_ZOOM. Zooming out stops
// earlier if the map would no longer cover the view.
export const MAP_ZOOM_LEVELS = [0.75, 1, 1.25, 1.5, 2]
export const DEFAULT_MAP_ZOOM_LEVEL = MAP_ZOOM_LEVELS.indexOf(1)
// Small screens get the last step too, since the towns are tiny on them
export const MAX_DESKTOP_MAP_ZOOM_LEVEL = MAP_ZOOM_LEVELS.indexOf(1.5)
// Towns, the ship, fish and routes are drawn in map units, so they grow with
// the zoom. Their sizes were made for a zoom of 1.5 and are scaled by this to
// show at three quarters of that size on screen.
export const MAP_DETAIL_SCALE = (1.5 / MAP_ZOOM) * 0.75
export const TOWN_ANCHOR_SIZE = 20
export const TOWN_ICON_SIZE = 16 * MAP_DETAIL_SCALE

// Pixel sizes of the map art
export const MAP_IMAGE_WIDTH = 3000
export const MAP_IMAGE_HEIGHT = 1876
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
