import { useEffect } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useModal } from "./context"

const Modal = () => {
  const { modals, removeModal, removeAllModals } = useModal()
  const modalEntries = Object.values(modals)

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

  useEffect(() => {
    if (!modalEntries.length) return

    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = overflow
    }
  }, [modalEntries.length])

  if (!modalEntries.length) return null

  return (
    <>
      {modalEntries.map((modal, index) => (
        <div
          key={`modal-${modal.id}`}
          aria-hidden={!modal.open}
          aria-labelledby={`modal-title-${modal.id}`}
          aria-modal="true"
          role="dialog"
          className={cn(
            "fixed inset-0 flex items-center justify-center p-2 transition-opacity duration-300 lg:p-6",
            modal.open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          )}
          style={{ zIndex: 50 + index }}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/70 transition-opacity duration-300 supports-backdrop-filter:backdrop-blur-sm",
              modal.open ? "opacity-100" : "opacity-0"
            )}
            onClick={() => removeModal(modal.id || "")}
          />

          <div
            className={cn(
              "relative z-10 max-h-[calc(100vh-1rem)] w-full overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900/95 px-2 pt-4 pb-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-black/30 transition-all duration-300 lg:max-h-[calc(100vh-3rem)] lg:px-6",
              modal.fullWidth ? "max-w-none" : "max-w-2xl",
              modal.open
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-95 opacity-0"
            )}
          >
            <h3
              id={`modal-title-${modal.id}`}
              className="mb-6 px-10 text-center font-serif text-xl font-bold"
            >
              {modal.title}
            </h3>

            {modal.content}

            <Button
              size="icon-sm"
              variant="ghost"
              className="absolute top-3 right-3 rounded-full border-none bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => removeModal(modal.id || "")}
            >
              <AiOutlineCloseCircle className="h-7 w-7" />
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Modal
