import { create } from "zustand"

export type DrawerId = "inventory" | "status" | "fleet" | "settings" | "guide"

type DrawerStore = {
  active: DrawerId | null
  open: (drawer: DrawerId) => void
  close: () => void
}

const useDrawer = create<DrawerStore>((set) => ({
  active: null,
  open: (drawer) => set({ active: drawer }),
  close: () => set({ active: null }),
}))

export default useDrawer
