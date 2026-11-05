import { create } from "zustand"

import { playSoundEffect } from "@/utils/sound"

export type DrawerId =
  | "inventory"
  | "status"
  | "fleet"
  | "settings"
  | "guide"
  | "advisor"
  | "logs"
  | "manageCrew"

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

    if (!!useDrawer.getState().active) {
      // Close and open it after 0.1 second so that you can animate a transition from one drawer to another
      useDrawer.getState().close()
      setTimeout(() => set({ active: drawer }), 100)
    } else {
      set({ active: drawer })
    }
  },
  close: () => set({ active: null }),
}))

export default useDrawer
