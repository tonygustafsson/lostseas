"use client"

import { useModal } from "@/app/stores/modals"
import ChangeCharacterForm from "@/components/ChangeCharacterForm"

import { Button } from "../ui/button"

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
    <Button onClick={openCharacterEditModal} variant="secondary">
      Change
    </Button>
  )
}

export default ChangeCharacterButton
