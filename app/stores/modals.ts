import { create } from "zustand"

export type ModalId =
  | "map"
  | "move"
  | "qrScanner"
  | "editCharacter"
  | "renameShip"
  | "welcome"
  | "sellBarterGoods"
  | "buyNecesseties"
  | "removeShip"
  | "dismissCrewMembers"
  | "screenshot"

export type ModalProps = {
  id: ModalId
  title: string
  content: React.ReactNode
  open?: boolean
  fullWidth?: boolean
  onClose?: () => void
}

const TRANSITION_DURATION = 300

type ModalState = {
  modals: Record<string, ModalProps>
  setModal: (modal: ModalProps) => void
  showModal: (id: string) => void
  hideModal: (id: string) => void
  removeModal: (id: string) => void
  removeAllModals: () => void
}

const timers = new Map<string, ReturnType<typeof setTimeout>[]>()

export const useModal = create<ModalState>((set: any, get: any) => ({
  modals: {},
  setModal: (modal: ModalProps) => {
    const id = modal.id

    set((s: any) => ({
      modals: {
        ...s.modals,
        [id]: { ...modal, id, open: false },
      },
    }))

    const show = setTimeout(() => {
      set((s: any) => ({
        modals: {
          ...s.modals,
          [id]: { ...s.modals[id], open: true },
        },
      }))
    }, 0)

    timers.set(id, [show])
  },
  showModal: (id: string) => {
    set((s: any) => ({
      modals: {
        ...s.modals,
        [id]: { ...s.modals[id], open: true },
      },
    }))
  },
  hideModal: (id: string) => {
    // clear scheduled timers
    const t = timers.get(id)
    if (t) {
      t.forEach(clearTimeout)
      timers.delete(id)
    }

    set((s: any) => ({
      modals: {
        ...s.modals,
        [id]: { ...s.modals[id], open: false },
      },
    }))

    setTimeout(() => {
      set((s: any) => {
        const copy = { ...s.modals }
        delete copy[id]
        return { modals: copy }
      })
    }, TRANSITION_DURATION)
  },
  removeModal: (id: string) => {
    const modal = get().modals[id]
    modal?.onClose?.()
    get().hideModal(id)
  },
  removeAllModals: () => {
    const state = get()
    if (!Object.keys(state.modals).length) return

    Object.keys(state.modals).forEach((id) => {
      state.modals[id]?.onClose?.()
    })

    set((s: any) => ({
      modals: (Object.keys(s.modals) as string[]).reduce(
        (acc, id) => {
          acc[id] = { ...s.modals[id], open: false }
          return acc
        },
        {} as Record<string, ModalProps>
      ),
    }))

    setTimeout(() => {
      set(() => ({ modals: {} }))
    }, TRANSITION_DURATION)
  },
}))

export default useModal
