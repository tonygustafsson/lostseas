import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useEffect } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { useModal } from "@/components/Modal/context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
        <DialogPrimitive.Root
          key={`modal-${modal.id}`}
          open={!!modal.open}
          onOpenChange={(open) => {
            if (!open) removeModal(modal.id || "")
          }}
        >
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 transition-opacity duration-300 supports-backdrop-filter:backdrop-blur-sm" />

            <DialogPrimitive.Content
              className={cn(
                "fixed top-1/2 left-1/2 z-50 max-h-[calc(100vh-1rem)] w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900/95 px-2 pt-4 pb-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-black/30 transition-all duration-300 lg:max-h-[calc(100vh-3rem)] lg:px-6",
                modal.fullWidth ? "max-w-none" : "max-w-2xl",
                modal.open ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
              style={{ zIndex: 50 + index }}
              aria-describedby={`modal-desc-${modal.id}`}
            >
              <DialogPrimitive.Title className="mb-6 px-10 text-center font-serif text-xl font-bold text-white">
                {modal.title || "Dialog"}
              </DialogPrimitive.Title>

              <DialogPrimitive.Description
                id={`modal-desc-${modal.id}`}
                className="sr-only"
              >
                {modal.title}
              </DialogPrimitive.Description>

              {modal.content}

              <DialogPrimitive.Close asChild>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="absolute top-3 right-3 rounded-full border-none bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
                  onClick={() => removeModal(modal.id || "")}
                >
                  <AiOutlineCloseCircle className="h-7 w-7" />
                </Button>
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      ))}
    </>
  )
}

export default Modal
