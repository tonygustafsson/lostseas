import { useEffect } from "react"

import { useModal } from "./context"

const Modal = () => {
  const { modals, removeModal } = useModal()

  useEffect(() => {
    console.log({ modals })
  }, [modals])

  if (!Object.values(modals).length) return null

  return (
    <>
      {Object.values(modals).map((modal) => (
        <dialog
          key={`modal-${modal.id}`}
          className={`modal ${modal.open ? "modal-open" : ""}`}
        >
          <div className="modal-box pt-4">
            <h3 className="font-bold text-xl mb-6 text-center">
              {modal.title}
            </h3>

            {modal.content}

            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2 close"
                onClick={() => removeModal(modal.id || "")}
              >
                ✕
              </button>
            </div>
          </div>
        </dialog>
      ))}
    </>
  )
}

export default Modal
