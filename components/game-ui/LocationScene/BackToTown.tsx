import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCharacter } from "@/hooks/queries/useCharacter"

const BackToTown = () => {
  const { move } = useCharacter()

  return (
    <div className="flex justify-center px-4 py-5 sm:px-6 sm:py-6">
      <Button
        variant="outline"
        size="lg"
        className="gap-2 px-6 font-serif text-lg font-normal!"
        onClick={() => move({ location: "Harbor" })}
      >
        <ArrowLeft className="size-5!" />
        Back to town
      </Button>
    </div>
  )
}

export default BackToTown
