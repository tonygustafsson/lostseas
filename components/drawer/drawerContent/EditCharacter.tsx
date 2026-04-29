"use client"

import { GiQuillInk } from "react-icons/gi"
import { IoArrowBack } from "react-icons/io5"

import useDrawer from "@/app/stores/drawer"
import ChangeCharacterForm from "@/components/ChangeCharacterForm"
import { Button } from "@/components/ui/button"

const EditCharacterDrawer = () => {
  const { open: openDrawer } = useDrawer()

  return (
    <>
      <h1 className="mb-2 flex items-center gap-2 font-serif text-2xl">
        <GiQuillInk className="text-yellow-400" />
        Edit character
      </h1>

      <Button
        variant="secondary"
        className="mt-2 mb-8"
        onClick={() => openDrawer("status")}
      >
        <IoArrowBack />
        Back to Status
      </Button>

      <ChangeCharacterForm />
    </>
  )
}

export default EditCharacterDrawer
