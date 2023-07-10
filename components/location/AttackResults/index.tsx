import { useGetPlayer } from "@/hooks/queries/usePlayer"

const ShopBuy = () => {
  const { data: player } = useGetPlayer()

  const results = player?.locationStates?.sea?.attackResults

  return (
    <>
      <h2 className="text-3xl font-serif mb-4">Report</h2>

      <ul className="list-disc list-inside">
        {results?.crewHealthLoss && (
          <li className="list-item">
            Your crew lost {results?.crewHealthLoss}% health, and now has a
            health of {results?.newCrewHealth}%
          </li>
        )}
      </ul>
    </>
  )
}

export default ShopBuy
