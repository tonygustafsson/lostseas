"use client"

import { IoArrowBack } from "react-icons/io5"
import { MdGroups } from "react-icons/md"

import useDrawer from "@/app/stores/drawer"
import DismissCrewMembers from "@/components/crew/DismissCrewMembers"
import GiveGold from "@/components/crew/GiveGold"
import GiveMedicine from "@/components/crew/GiveMedicine"
import { Button } from "@/components/ui/button"

const ManageCrewDrawer = () => {
  const { open: openDrawer } = useDrawer()

  return (
    <>
      <h1 className="mb-2 flex items-center gap-2 font-serif text-2xl">
        <MdGroups className="text-yellow-400" />
        Manage Crew
      </h1>

      <Button
        variant="secondary"
        className="mt-2 mb-8"
        onClick={() => openDrawer("fleet")}
      >
        <IoArrowBack />
        Back to Fleet
      </Button>

      <div className="flex flex-col gap-4">
        <GiveMedicine />
        <GiveGold />
        <DismissCrewMembers />
      </div>
    </>
  )
}

export default ManageCrewDrawer
