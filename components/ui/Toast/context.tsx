import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react"

export type ToastProps = {
  id?: string
  visible?: boolean
  buttonText?: string
  href?: string
  title?: string
  message?: string | JSX.Element
  variant?: "success" | "error"
}

export interface State {
  toasts: Record<string, ToastProps>
}

type Action =
  | {
      type: "SET_TOAST"
      toast: Omit<ToastProps, "id"> & { id: string }
    }
  | {
      type: "SHOW_TOAST"
      id: string
    }
  | {
      type: "HIDE_TOAST"
      id: string
    }
  | {
      type: "REMOVE_TOAST"
      id: string
    }

const initialState: State = {
  toasts: {},
}

const AUTOHIDE_DURATION = 5000
const TRANSITION_DURATION = 300

export const ToastContext = createContext<State | any>(initialState)

ToastContext.displayName = "ToastContext"

const toastReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_TOAST": {
      const toasts = {
        ...state.toasts,
        [action.toast.id]: action.toast,
      }

      return {
        ...state,
        toasts,
      }
    }
    case "SHOW_TOAST": {
      return {
        ...state,
        toasts: {
          ...state.toasts,
          [action.id]: { ...state.toasts[action.id], visible: true },
        },
      }
    }
    case "HIDE_TOAST": {
      return {
        ...state,
        toasts: {
          ...state.toasts,
          [action.id]: { ...state.toasts[action.id], visible: false },
        },
      }
    }
    case "REMOVE_TOAST": {
      const toasts = { ...state.toasts }
      delete toasts[action.id]

      return {
        ...state,
        toasts,
      }
    }
  }
}

export const ToastProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  const setToast = useCallback(
    (toast: ToastProps) => {
      const id = crypto.randomUUID()

      // Create it, won't show yet
      dispatch({
        type: "SET_TOAST",
        toast: { ...toast, id },
      })

      // Show it afterwards to give animation a chance
      setTimeout(() => {
        dispatch({
          type: "SHOW_TOAST",
          id,
        })
      }, 25)

      // Hide it after a while
      setTimeout(() => {
        dispatch({
          type: "HIDE_TOAST",
          id,
        })
      }, AUTOHIDE_DURATION - TRANSITION_DURATION)

      // Remove it after the animation is done
      setTimeout(() => {
        dispatch({
          type: "REMOVE_TOAST",
          id,
        })
      }, AUTOHIDE_DURATION)
    },
    [dispatch]
  )

  const removeToast = useCallback(
    (id: string) => {
      dispatch({
        type: "HIDE_TOAST",
        id,
      })

      setTimeout(() => {
        dispatch({
          type: "REMOVE_TOAST",
          id,
        })
      }, AUTOHIDE_DURATION)
    },
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      setToast,
      removeToast,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return <ToastContext.Provider value={value} {...props} />
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error(`useToast must be used within a ToastProvider`)
  }

  return context as State & {
    setToast: (toast: ToastProps) => void
    hideToast: (id: string) => void
    removeToast: (id: string) => void
  }
}

export const ManagedToastContext = ({
  children,
}: {
  children: React.ReactNode
}) => <ToastProvider>{children}</ToastProvider>
