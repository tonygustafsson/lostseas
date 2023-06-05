import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react"

export type ToastVariant = "info" | "success" | "warning" | "error"

export type ToastProps = {
  id?: string
  autoHideDuration?: number | null /* null never autocloses */
  buttonText?: string
  href?: string
  title?: string
  message?: string | JSX.Element
  variant?: ToastVariant
}

export interface State {
  toasts: ToastProps[]
}

type Action =
  | {
      type: "SET_TOAST"
      toast: ToastProps
    }
  | {
      type: "REMOVE_TOAST"
      id: string
    }

const initialState: State = {
  toasts: [],
}

export const ToastContext = createContext<State | any>(initialState)

ToastContext.displayName = "ToastContext"

const toastReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_TOAST": {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      }
    }
    case "REMOVE_TOAST": {
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      }
    }
  }
}

export const ToastProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  const setToast = useCallback(
    (toast: ToastProps) => {
      const id = crypto.randomUUID()

      dispatch({
        type: "SET_TOAST",
        toast: { ...toast, id },
      })

      if (toast.autoHideDuration) {
        setTimeout(() => {
          removeToast(id)
        }, toast.autoHideDuration)
      }
    },
    [dispatch]
  )
  const removeToast = useCallback(
    (id: string) =>
      dispatch({
        type: "REMOVE_TOAST",
        id,
      }),
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

  return context
}

export const ManagedToastContext = ({
  children,
}: {
  children: React.ReactNode
}) => <ToastProvider>{children}</ToastProvider>
