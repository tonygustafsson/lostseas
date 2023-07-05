import { m as motion } from "framer-motion"
import { Fragment, useEffect } from "react"
import { renderToString } from "react-dom/server"

import Flag from "@/components/icons/Flag"
import { useCharacter } from "@/hooks/queries/useCharacter"

import { useModal } from "./ui/Modal/context"

const mapWidth = 850
const mapHeight = 540

type TownLocations = Record<
  Town,
  { nation: Nation; x: number; y: number; textAlign?: "bottom" | "right" }
>

const TOWNS: TownLocations = {
  "Charles Towne": {
    nation: "England",
    x: 388,
    y: 47,
    textAlign: "bottom",
  },
  Barbados: {
    nation: "England",
    x: 779,
    y: 387,
  },
  "Port Royale": {
    nation: "England",
    x: 452,
    y: 306,
  },
  Belize: {
    nation: "England",
    x: 207,
    y: 303,
    textAlign: "right",
  },
  Tortuga: {
    nation: "France",
    x: 598,
    y: 262,
  },
  Leogane: {
    nation: "France",
    x: 537,
    y: 300,
  },
  Martinique: {
    nation: "France",
    x: 752,
    y: 353,
    textAlign: "right",
  },
  Biloxi: {
    nation: "France",
    x: 259,
    y: 68,
  },
  Panama: {
    nation: "Spain",
    x: 382,
    y: 459,
  },
  Havana: {
    nation: "Spain",
    x: 351,
    y: 204,
  },
  "Villa Hermosa": {
    nation: "Spain",
    x: 133,
    y: 303,
  },
  "San Juan": {
    nation: "Spain",
    x: 661,
    y: 283,
  },
  Bonaire: {
    nation: "Holland",
    x: 610,
    y: 429,
  },
  Curacao: {
    nation: "Holland",
    x: 558,
    y: 405,
  },
  "St. Martin": {
    nation: "Holland",
    x: 720,
    y: 301,
    textAlign: "right",
  },
  "St. Eustatius": {
    nation: "Holland",
    x: 741,
    y: 327,
    textAlign: "right",
  },
}

type Props = {
  currentTown?: Town
}

const Map = ({ currentTown }: Props) => {
  const { startJourney } = useCharacter()
  const { removeModal } = useModal()

  const handleStartJourney = (town: Town) => {
    removeModal("map")
    startJourney({ town })
  }

  const onMouseOverTown = (e: React.MouseEvent<SVGImageElement>) => {
    // Create tooltip with town name
    const element = e.target as SVGImageElement
    const townName = element.getAttribute("data-town") as Town
    const townInfo = TOWNS[townName]
    const mouse = { x: e.pageX, y: e.pageY }

    const tooltip = document.createElement("div")
    tooltip.classList.add(
      "tooltip",
      "bg-slate-800",
      "text-white",
      "py-1",
      "px-4",
      "z-50"
    )
    tooltip.style.position = "absolute"
    tooltip.style.top = `${mouse.y + 20}px`
    tooltip.style.left = `${mouse.x + 20}px`

    const flag = <Flag nation={townInfo.nation} className="w-5 h-5" />
    tooltip.innerHTML = `<div class="flex items-center gap-2">${renderToString(
      flag
    )}<div>Visit ${townName}</div></div>`

    document.body.appendChild(tooltip)
  }

  const onMouseOutTown = () => {
    // Remove tooltip
    const tooltip = document.querySelector(".tooltip")
    if (tooltip) {
      document.body.removeChild(tooltip)
    }
  }

  useEffect(() => () => onMouseOutTown(), [])

  return (
    <div className="lg:max-w-7xl overflow-x-auto mx-auto opacity-80">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        preserveAspectRatio="xMinYMin meet"
        className="w-[850px] lg:w-full lg:max-w-7xl"
      >
        <defs>
          <filter x="0" y="0" width="1" height="1" id="black">
            <feFlood floodColor="black" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter x="0" y="0" width="1" height="1" id="blue">
            <feFlood floodColor="#003e91" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <image
          width={mapWidth}
          height={mapHeight}
          xlinkHref="img/map/spanish-main.jpg"
        />

        {Object.entries(TOWNS).map(([town, { x, y, textAlign = "bottom" }]) => {
          const isCurrentTown = town === currentTown

          return (
            <Fragment key={`sea-map-${town}`}>
              <motion.image
                key={`sea-map-town-${town}`}
                whileHover={{
                  scale: !isCurrentTown ? 1.1 : 1,
                }}
                width="20"
                height="20"
                x={x}
                y={y}
                xlinkHref="img/map/town.svg"
                className={`w-5 h-5 ${!isCurrentTown ? "cursor-pointer" : ""}`}
                onClick={() =>
                  !isCurrentTown && handleStartJourney(town as Town)
                }
                data-town={town}
                onMouseOver={!isCurrentTown ? onMouseOverTown : undefined}
                onMouseOut={onMouseOutTown}
              />

              <text
                x={textAlign === "bottom" ? x - town.length * 2 : x + 26}
                y={textAlign === "bottom" ? y + 34 : y + 15}
                fontSize="10px"
                fontFamily="monospace"
                className="bg-white"
                fill="white"
                opacity={0.8}
                filter={town === currentTown ? "url(#blue)" : "url(#black)"}
                style={{ userSelect: "none" }}
                dangerouslySetInnerHTML={{ __html: `&nbsp;${town}&nbsp;` }}
              />
            </Fragment>
          )
        })}

        {currentTown && (
          <image
            width="20"
            height="20"
            filter="url(#blue)"
            x={TOWNS[currentTown].x - 23}
            y={TOWNS[currentTown].y + 1}
            xlinkHref="img/map/ship.svg"
          />
        )}
      </svg>
    </div>
  )
}

export default Map
