import { useSea } from "@/hooks/queries/useSea"

const PostAttackActions = () => {
  const { continueJourney } = useSea()

  const handleContinueJourney = () => {
    continueJourney()
  }

  return (
    <div className="bg-gray-900 rounded-b-lg pt-4 pb-8 flex items-center flex-col">
      <div className="flex flex-wrap mt-4 justify-center gap-2 lg:gap-0 lg:join">
        <button
          className={`btn btn-primary text-base join-item`}
          onClick={handleContinueJourney}
        >
          Continue journey
        </button>
      </div>
    </div>
  )
}

export default PostAttackActions
