import Image from "next/image"

import { capitalize } from "@/utils/string"

import { useModal } from "./ui/Modal/context"

const Screenshots = () => {
  const { setModal } = useModal()

  const imageZoom = (imgId: string) => {
    setModal({
      id: "screenshot",
      title: capitalize(imgId),
      fullWidth: true,
      content: (
        <div className="min-h-screen overflow-auto">
          <Image
            src={`/img/screenshots/${imgId}.png`}
            width={1700}
            height={1162}
            alt={`Screenshot of ${imgId}`}
            className="object-cover max-w-none"
          />
        </div>
      ),
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <button onClick={() => imageZoom("harbor")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/harbor.png"
          alt="Screenshot of the harbor"
          className="h-full"
        />
      </button>

      <button onClick={() => imageZoom("map")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/map.png"
          alt="Screenshot of the map"
          className="h-full"
        />
      </button>

      <button onClick={() => imageZoom("status")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/status.png"
          alt="Screenshot of the status"
          className="h-full"
        />
      </button>

      <button onClick={() => imageZoom("crew")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/crew.png"
          alt="Screenshot of the crew members"
          className="h-full"
        />
      </button>

      <button onClick={() => imageZoom("battle")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/battle.png"
          alt="Screenshot of the a ship meeting"
          className="h-full"
        />
      </button>

      <button onClick={() => imageZoom("battle-won")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/battle-won.png"
          alt="Screenshot of a battle won"
          className="h-full"
        />
      </button>

      <button onClick={() => imageZoom("inventory")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/inventory.png"
          alt="Screenshot of the inventory"
          className="h-full"
        />
      </button>

      <button onClick={() => imageZoom("shop")}>
        <Image
          width={200}
          height={137}
          src="/img/screenshots/shop.png"
          alt="Screenshot of the shop"
          className="h-full"
        />
      </button>
    </div>
  )
}

export default Screenshots
