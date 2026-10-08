import useModal from "@/app/stores/modals"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const Modal = () => {
  const { modals, removeModal } = useModal()
  const modalEntries = Object.values(modals)

  return (
    <>
      {modalEntries.map((modal) => (
        <Dialog
          key={`modal-${modal.id}`}
          open={!!modal.open}
          onOpenChange={(open) => {
            if (!open) removeModal(modal.id || "")
          }}
        >
          <DialogContent
            aria-describedby={undefined}
            className={cn(
              "max-h-[90vh] max-w-2xl overflow-auto border border-gray-900",
              {
                "gap-4 p-4 sm:max-w-lg": modal.compact,
                "h-[95vh]! max-w-[95vw]!": modal.fullWidth,
              }
            )}
          >
            <DialogTitle
              className={cn(
                "font-serif font-bold",
                modal.compact ? "pr-8 text-lg" : "mb-6 text-center text-xl"
              )}
            >
              {modal.title}
            </DialogTitle>

            {modal.content}
          </DialogContent>
        </Dialog>
      ))}
    </>
  )
}

export default Modal
