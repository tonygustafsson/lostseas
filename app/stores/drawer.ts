import { create } from "zustand"

import { playSoundEffect } from "@/utils/sound"

export type DrawerId =
  "inventory" | "status" | "fleet" | "settings" | "advisor" | "logs"

type DrawerStore = {
  active: DrawerId | null
  open: (drawer: DrawerId) => void
  close: () => void
}

const useDrawer = create<DrawerStore>((set) => ({
  active: null,
  open: (drawer) => {
    if (drawer === "advisor") {
      playSoundEffect("parrot")
    }

    set({ active: drawer })
  },
  close: () => set({ active: null }),
}))

export default useDrawer
