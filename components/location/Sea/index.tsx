import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const mapWidth = 850
const mapHeight = 540

type TownLocations = Record<Town, { x: number; y: number }>

const towns: TownLocations = {
  "Charles Towne": {
    x: 388,
    y: 47,
  },
  Barbados: {
    x: 779,
    y: 387,
  },
  "Port Royale": {
    x: 452,
    y: 306,
  },
  Belize: {
    x: 207,
    y: 303,
  },
  Tortuga: {
    x: 598,
    y: 262,
  },
  Leogane: {
    x: 537,
    y: 300,
  },
  Martinique: {
    x: 752,
    y: 353,
  },
  Biloxi: {
    x: 259,
    y: 68,
  },
  Panama: {
    x: 382,
    y: 459,
  },
  Havana: {
    x: 351,
    y: 204,
  },
  "Villa Hermosa": {
    x: 133,
    y: 303,
  },
  "San Juan": {
    x: 661,
    y: 283,
  },
  Bonaire: {
    x: 610,
    y: 429,
  },
  Curacao: {
    x: 558,
    y: 405,
  },
  "St. Martin": {
    x: 720,
    y: 301,
  },
  "St. Eustatius": {
    x: 741,
    y: 327,
  },
}

const Sea = () => {
  const { travel } = useCharacter()
  const { data: player } = useGetPlayer()

  const handleTravel = (town: Town) => {
    travel({ playerId: player?.id || "", town })
  }

  return (
    <div className="max-w-7xl mx-auto opacity-80">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <image
          width={mapWidth}
          height={mapHeight}
          xlinkHref="img/map/spanish-main.jpg"
        />

        {Object.entries(towns).map(([town, { x, y }]) => (
          <image
            key={`sea-map-${town}`}
            width="20"
            height="20"
            x={x}
            y={y}
            xlinkHref="img/map/town.svg"
            onClick={() => handleTravel(town as Town)}
          />
        ))}
      </svg>
    </div>
  )
}

export default Sea
