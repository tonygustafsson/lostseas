"use client"

import Image from "next/image"

import useDrawer from "@/app/stores/drawer"
import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"

type Props = {
  onClick?: () => void
}

const AdvisorDrawerTrigger = ({ onClick }: Props) => {
  const { data: player } = useGetPlayer()
  const { open } = useDrawer()

  const warnings = getAdvisorWarnings(player)

  if (!warnings.length) return null

  return (
    <Button
      variant="secondary"
      onClick={onClick ?? (() => open("advisor"))}
      aria-label="Talk to advisor"
    >
      <Image
        src="/img/parrot.svg"
        alt="Parrot advisor"
        width={20}
        height={20}
        draggable={false}
        className="size-5 select-none"
      />
      Advisor
    </Button>
  )
}

export default AdvisorDrawerTrigger
