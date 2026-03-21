"use client"

import ChangeCharacterForm from "@/components/ChangeCharacterForm"
import { useModal } from "@/components/ui/Modal/context"

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
