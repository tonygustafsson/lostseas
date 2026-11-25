import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"

import useModal from "@/app/stores/modals"
import useUnsavedChanges from "@/app/stores/unsavedChanges"
import { Button } from "@/components/ui/button"
import { useCharacter } from "@/hooks/queries/useCharacter"

const BackToTown = ({ children }: { children?: ReactNode }) => {
  const { move } = useCharacter()
  const { setModal, removeModal } = useModal()
  const hasUnsavedChanges = useUnsavedChanges((s) => s.hasUnsavedChanges)

  const leave = () => {
    removeModal("leaveBuilding")
    move({ location: "Harbor" })
  }

  const handleClick = () => {
    if (!hasUnsavedChanges) {
      move({ location: "Harbor" })
      return
    }

    setModal({
      id: "leaveBuilding",
      title: "Leave without saving?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            You have changes that are not saved yet. If you leave now, they are
            lost.
          </p>

          <div className="flex gap-2">
            <Button size="sm" onClick={leave}>
              Yes, leave
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeModal("leaveBuilding")}
            >
              No, stay
            </Button>
          </div>
        </div>
      ),
    })
  }

  return (
    <div className="mt-6 flex items-center gap-2 sm:justify-center">
      <Button
        size="lg"
        className="flex-1 gap-2 px-4 font-serif text-base font-normal! sm:flex-none sm:px-6 sm:text-lg"
        onClick={handleClick}
      >
        <ArrowLeft className="size-5!" />
        Back to town
      </Button>

      {children}
    </div>
  )
}

export default BackToTown
