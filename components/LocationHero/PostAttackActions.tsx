import { useSea } from "@/hooks/queries/useSea"

const PostAttackActions = () => {
  const { continueJourney } = useSea()

  const handleContinueJourney = () => {
    continueJourney()
  }

  return (
    <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col pb-8">
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
