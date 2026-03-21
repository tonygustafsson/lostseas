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
    <div className="flex flex-col items-center rounded-b-lg bg-gray-900 p-4 pb-8">
      <span className="font-serif text-xl">What do you want to do?</span>

      <div className="lg:join mt-4 flex flex-wrap justify-center gap-2 lg:gap-0">
        <Button className="join-item text-base" onClick={handleAttack}>
          Attack
        </Button>

        <Button
          variant="secondary"
          className="join-item text-base"
          onClick={handleIgnore}
        >
          Ignore
        </Button>
      </div>
    </div>
  )
}

export default ShipMeetingActions
