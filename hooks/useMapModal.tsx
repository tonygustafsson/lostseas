import useModal from "@/app/stores/modals"
import Map from "@/components/Map"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { playSoundEffect } from "@/utils/sound"

export const useMapModal = () => {
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()

  const showMap = () => {
    playSoundEffect("open-map")

    setModal({
      id: "map",
      title: "Pick your destination",
      fullWidth: true,
      content: <Map currentTown={player?.character.town} />,
    })
  }

  return { showMap, canTravel: !player?.character.journey }
}
