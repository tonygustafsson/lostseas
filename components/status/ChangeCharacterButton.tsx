"use client"

import ChangeCharacterForm from "@/components/ChangeCharacterForm"
import { useModal } from "@/components/ui/Modal/context"

const ChangeCharacterButton = () => {
  const { setModal } = useModal()

  const openCharacterEditModal = () => {
    setModal({
      id: "editCharacter",
      title: "Change your character",
      content: <ChangeCharacterForm />,
    })
  }

  return (
    <button onClick={openCharacterEditModal} className="btn btn-secondary">
      Change
    </button>
  )
}

export default ChangeCharacterButton
