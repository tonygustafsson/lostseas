import { create } from "zustand"

type UnsavedChangesState = {
  /** Set while a building holds changes that are lost when the player leaves. */
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: (value: boolean) => void
}

const useUnsavedChanges = create<UnsavedChangesState>((set) => ({
  hasUnsavedChanges: false,
  setHasUnsavedChanges: (hasUnsavedChanges) => set({ hasUnsavedChanges }),
}))

export default useUnsavedChanges
