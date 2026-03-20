import { useEffect } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { Button } from "@/components/ui/button"

import { useModal } from "./context"

const Modal = () => {
  const { modals, removeModal, removeAllModals } = useModal()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        removeAllModals()
      }
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [removeAllModals])

  if (!Object.values(modals).length) return null

  return (
    <>
      {Object.values(modals).map((modal) => (
        <dialog
          key={`modal-${modal.id}`}
          className={`modal ${modal.fullWidth ? "px-2 lg:px-8" : ""} ${
            modal.open ? "modal-open" : ""
          }`}
        >
          <div
            className={`modal-box px-2 lg:px-6 ${
              modal.fullWidth ? "w-full max-w-none" : ""
            } pt-4`}
          >
            <h3 className="mb-6 text-center font-serif text-xl font-bold">
              {modal.title}
            </h3>

            {modal.content}

            <div className="modal-action">
              <Button
                size="sm"
                className="close absolute top-3 right-1 border-none bg-transparent hover:bg-gray-800"
                onClick={() => removeModal(modal.id || "")}
              >
                <AiOutlineCloseCircle className="h-7 w-7" />
              </Button>
            </div>
          </div>
        </dialog>
      ))}
    </>
  )
}

export default Modal
