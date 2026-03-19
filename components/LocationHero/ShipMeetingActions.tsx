import { useSea } from "@/hooks/queries/useSea"

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

      <div className="mt-4 flex flex-wrap justify-center gap-2 lg:join lg:gap-0">
        <button
          className={`btn btn-primary join-item text-base`}
          onClick={handleAttack}
        >
          Attack
        </button>

        <button
          className={`btn btn-secondary join-item text-base`}
          onClick={handleIgnore}
        >
          Ignore
        </button>
      </div>
    </div>
  )
}

export default ShipMeetingActions
