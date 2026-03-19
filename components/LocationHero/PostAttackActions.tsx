import { useSea } from "@/hooks/queries/useSea"

const PostAttackActions = () => {
  const { continueJourney } = useSea()

  const handleContinueJourney = () => {
    continueJourney()
  }

  return (
    <div className="flex flex-col items-center rounded-b-lg bg-gray-900 pb-8 pt-4">
      <div className="mt-4 flex flex-wrap justify-center gap-2 lg:join lg:gap-0">
        <button
          className={`btn btn-primary join-item text-base`}
          onClick={handleContinueJourney}
        >
          Continue journey
        </button>
      </div>
    </div>
  )
}

export default PostAttackActions
