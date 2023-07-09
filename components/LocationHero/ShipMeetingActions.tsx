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
    <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col pb-8">
      <span className="text-xl font-serif">What do you want to do?</span>

      <div className="flex flex-wrap mt-4 justify-center gap-2 lg:gap-0 lg:join">
        <button
          className={`btn btn-primary text-base join-item`}
          onClick={handleAttack}
        >
          Attack
        </button>

        <button
          className={`btn btn-secondary text-base join-item`}
          onClick={handleIgnore}
        >
          Ignore
        </button>
      </div>
    </div>
  )
}

export default ShipMeetingActions
