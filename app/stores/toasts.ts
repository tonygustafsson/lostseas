import { create } from "zustand"

export type ToastProps = {
  id?: string
  visible?: boolean
  buttonText?: string
  href?: string
  title?: string
  message?: string | React.ReactNode
  variant?: "success" | "error"
}

const AUTOHIDE_DURATION = 5000
const TRANSITION_DURATION = 300

type ToastState = {
  toasts: Record<string, ToastProps>
  setToast: (toast: ToastProps) => void
  showToast: (id: string) => void
  hideToast: (id: string) => void
  removeToast: (id: string) => void
}

const timers = new Map<string, ReturnType<typeof setTimeout>[]>()

export const useToasts = create<ToastState>((set: any, get: any) => ({
  toasts: {},
  setToast: (toast) => {
    const id = toast.id ?? crypto.randomUUID()

    set((s: any) => ({
      toasts: {
        ...s.toasts,
        [id]: { ...toast, id, visible: false },
      },
    }))

    // schedule show/hide/remove
    const show = setTimeout(() => {
      set((s: any) => ({
        toasts: {
          ...s.toasts,
          [id]: { ...s.toasts[id], visible: true },
        },
      }))
    }, 25)

    const hide = setTimeout(() => {
      set((s: any) => ({
        toasts: {
          ...s.toasts,
          [id]: { ...s.toasts[id], visible: false },
        },
      }))
    }, AUTOHIDE_DURATION - TRANSITION_DURATION)

    const remove = setTimeout(() => {
      set((s: any) => {
        const copy = { ...s.toasts }
        delete copy[id]
        return { toasts: copy }
      })
      timers.delete(id)
    }, AUTOHIDE_DURATION)

    timers.set(id, [show, hide, remove])
  },
  showToast: (id: any) => {
    set((s: any) => ({
      toasts: {
        ...s.toasts,
        [id]: { ...s.toasts[id], visible: true },
      },
    }))
  },
  hideToast: (id: any) => {
    // clear scheduled timers
    const t = timers.get(id)
    if (t) {
      t.forEach(clearTimeout)
      timers.delete(id)
    }

    set((s: any) => ({
      toasts: {
        ...s.toasts,
        [id]: { ...s.toasts[id], visible: false },
      },
    }))

    // remove after transition
    setTimeout(() => {
      set((s: any) => {
        const copy = { ...s.toasts }
        delete copy[id]
        return { toasts: copy }
      })
    }, TRANSITION_DURATION)
  },
  removeToast: (id: any) => {
    // same as hide
    get().hideToast(id)
  },
}))
