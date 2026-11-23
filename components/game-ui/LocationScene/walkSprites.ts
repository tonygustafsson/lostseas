// The layout of public/img/town-walkers.png, made by
// scripts/generate-walker-sprites. Every sprite has a cell of the same size,
// sprites face right and stand on the same row, so one lookup in the shader
// serves a person, a cat and a rat. Keep in sync with the script.
export const WALKER_SHEET = {
  url: "/img/town-walkers.png",
  cellWidth: 12,
  cellHeight: 26,
  // Poses in a row of the sheet (a person has three, a cat and a rat four)
  columns: 4,
  // Rows of the sheet
  looks: 12,
  cats: 2,
  rats: 1,
  // The cell row the feet stand on, the same for everybody
  feetRow: 23,
} as const

// Where the middle of a sprite is in its cell, in sprite pixels
export const WALKER_ANCHOR = {
  person: 6.5,
  cat: 6,
  rat: 6,
} as const

// First sheet row of each kind
export const WALKER_ROWS = {
  person: 0,
  cat: WALKER_SHEET.looks,
  rat: WALKER_SHEET.looks + WALKER_SHEET.cats,
} as const

export const WALKER_SHEET_ROWS =
  WALKER_SHEET.looks + WALKER_SHEET.cats + WALKER_SHEET.rats
