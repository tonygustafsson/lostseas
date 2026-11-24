import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { useCharacter } from "@/hooks/queries/useCharacter"

const BackToTown = ({ children }: { children?: ReactNode }) => {
  const { move } = useCharacter()

  return (
    <div className="mt-6 flex items-center gap-2 sm:justify-center">
      <Button
        size="lg"
        className="flex-1 gap-2 px-4 font-serif text-base font-normal! sm:flex-none sm:px-6 sm:text-lg"
        onClick={() => move({ location: "Harbor" })}
      >
        <ArrowLeft className="size-5!" />
        Back to town
      </Button>

      {children}
    </div>
  )
}

export default BackToTown
