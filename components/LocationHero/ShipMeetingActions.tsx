import { useSea } from "@/hooks/queries/useSea"

import { Button } from "../ui/button"

const ShipMeetingActions = () => {
  const { attackShip, ignoreShip } = useSea()

  const handleAttack = () => {
    attackShip()
  }

  const handleIgnore = () => {
    ignoreShip()
  }

  return (
    <div className="flex flex-col items-center px-4 py-5 sm:px-6 sm:py-6">
      <span className="font-serif text-xl text-stone-100">
        What do you want to do?
      </span>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Button
          className="min-w-[8rem] rounded-full px-5 text-base"
          onClick={handleAttack}
        >
          Attack
        </Button>

        <Button
          variant="secondary"
          className="min-w-[8rem] rounded-full px-5 text-base"
          onClick={handleIgnore}
        >
          Ignore
        </Button>
      </div>
    </div>
  )
}

export default ShipMeetingActions
