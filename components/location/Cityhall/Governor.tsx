import { TOWNS } from "@/constants/locations"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Governor = () => {
  const { data: player } = useGetPlayer()

  const townNation = player?.character.town
    ? TOWNS[player?.character.town]?.nation
    : null
  const isInHomeNation = player?.character.nationality === townNation

  return (
    <>
      <h2 className="text-2xl">Governor</h2>

      {isInHomeNation && <p>Welcome {player.character.name}.</p>}
    </>
  )
}

export default Governor
