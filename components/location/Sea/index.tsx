import Map from "@/components/Map"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Sea = () => {
  const { data: player } = useGetPlayer()

  if (player?.character.journey?.destination) {
    return null
  }

  return <Map />
}

export default Sea
