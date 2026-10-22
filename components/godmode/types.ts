export type GodModeTabProps = {
  draft: Player
  /** Changes a copy of the draft. Mutate the draft inside the recipe. */
  update: (recipe: (draft: Player) => void) => void
}
