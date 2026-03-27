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
                "h-[95vh]! max-w-[95vw]!": modal.fullWidth,
              }
            )}
          >
            <DialogTitle className="mb-6 text-center font-serif text-xl font-bold">
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
