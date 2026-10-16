import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCharacter } from "@/hooks/queries/useCharacter"

const BackToTown = () => {
  const { move } = useCharacter()

  return (
    <div className="mt-6 flex justify-center">
      <Button
        variant="highlight"
        size="lg"
        className="w-full gap-2 px-6 font-serif text-lg font-normal! sm:w-auto!"
        onClick={() => move({ location: "Harbor" })}
      >
        <ArrowLeft className="size-5!" />
        Back to town
      </Button>
    </div>
  )
}

export default BackToTown
