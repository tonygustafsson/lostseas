import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react"

export type ModalId = "move" | "travel" | "qrscanner"

export type ModalProps = {
  id: ModalId
  title: string
  content: React.ReactNode
  onClose?: () => void
}

export interface State {
  modals: Record<string, ModalProps>
}

type Action =
  | {
      type: "SET_MODAL"
      modal: ModalProps
    }
  | {
      type: "REMOVE_MODAL"
      id: string
    }

const initialState: State = {
  modals: {},
}

export const ModalContext = createContext<State | any>(initialState)

ModalContext.displayName = "ModalContext"

const modalReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_MODAL": {
      const modals = {
        ...state.modals,
        [action.modal.id]: action.modal,
      }

      return {
        ...state,
        modals,
      }
    }
    case "REMOVE_MODAL": {
      const modals = { ...state.modals }
      delete modals[action.id]

      return {
        ...state,
        modals,
      }
    }
  }
}

export const ModalProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState)

  const setModal = useCallback(
    (modal: ModalProps) => {
      dispatch({
        type: "SET_MODAL",
        modal,
      })
    },
    [dispatch]
  )

  const removeModal = useCallback(
    (id: string) => {
      state.modals[id]?.onClose?.()

      dispatch({
        type: "REMOVE_MODAL",
        id,
      })
    },
    [state.modals]
  )

  const value = useMemo(
    () => ({
      ...state,
      setModal,
      removeModal,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return <ModalContext.Provider value={value} {...props} />
}

export const useModal = () => {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error(`useModal must be used within a ModalProvider`)
  }

  return context as State & {
    setModal: (modal: ModalProps) => void
    removeModal: (id: string) => void
  }
}

export const ManagedModalContext = ({
  children,
}: {
  children: React.ReactNode
}) => <ModalProvider>{children}</ModalProvider>
