import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react"

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

export interface State {
  modals: Record<string, ModalProps>
}

type Action =
  | {
      type: "SET_MODAL"
      modal: ModalProps
    }
  | {
      type: "OPEN_MODAL"
      id: string
    }
  | {
      type: "HIDE_MODAL"
      id: string
    }
  | {
      type: "REMOVE_MODAL"
      id: string
    }
  | {
      type: "HIDE_ALL_MODALS"
    }
  | {
      type: "REMOVE_ALL_MODALS"
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
    case "OPEN_MODAL": {
      const modals = {
        ...state.modals,
        [action.id]: { ...state.modals[action.id], open: true },
      }

      return {
        ...state,
        modals,
      }
    }
    case "HIDE_MODAL": {
      const modals = {
        ...state.modals,
        [action.id]: { ...state.modals[action.id], open: false },
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
    case "HIDE_ALL_MODALS": {
      return {
        ...state,
        modals: (Object.keys(state.modals) as ModalId[]).reduce(
          (acc, id) => {
            acc[id] = { ...state.modals[id], open: false }
            return acc
          },
          {} as Record<string, ModalProps>
        ),
      }
    }
    case "REMOVE_ALL_MODALS": {
      return {
        ...state,
        modals: {},
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

      setTimeout(() => {
        dispatch({
          type: "OPEN_MODAL",
          id: modal.id,
        })
      }, 0)
    },
    [dispatch]
  )

  const removeModal = useCallback(
    (id: string) => {
      state.modals[id]?.onClose?.()

      dispatch({
        type: "HIDE_MODAL",
        id,
      })

      setTimeout(() => {
        dispatch({
          type: "REMOVE_MODAL",
          id,
        })
      }, 300)
    },
    [state.modals]
  )

  const removeAllModals = useCallback(() => {
    if (!Object.keys(state.modals).length) return

    Object.keys(state.modals).forEach((id) => {
      state.modals[id]?.onClose?.()
    })

    dispatch({
      type: "HIDE_ALL_MODALS",
    })

    setTimeout(() => {
      dispatch({
        type: "REMOVE_ALL_MODALS",
      })
    }, 300)
  }, [state.modals])

  const value = useMemo(
    () => ({
      ...state,
      setModal,
      removeModal,
      removeAllModals,
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
    removeModal: (id: ModalId) => void
    removeAllModals: () => void
  }
}

export const ManagedModalContext = ({
  children,
}: {
  children: React.ReactNode
}) => <ModalProvider>{children}</ModalProvider>
