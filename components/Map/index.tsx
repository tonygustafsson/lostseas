import { m as motion } from "framer-motion"
import { Fragment, useEffect } from "react"
import { renderToString } from "react-dom/server"

import { TOWN_INFO } from "@/constants/locations"
import { useSea } from "@/hooks/queries/useSea"

import { useModal } from "../ui/Modal/context"
import Tooltip from "./Tooltip"

const mapWidth = 850
const mapHeight = 540

type Props = {
  currentTown: Town | undefined
}

const Map = ({ currentTown }: Props) => {
  const { startJourney } = useSea()
  const { removeModal } = useModal()

  const handleStartJourney = (town: Town) => {
    removeModal("map")
    startJourney({ town })
  }

  const onMouseOverTown = (
    e: React.MouseEvent<SVGImageElement>,
    currentTown: Props["currentTown"]
  ) => {
    // Create tooltip with town name
    const element = e.target as SVGImageElement
    const townName = element.getAttribute("data-town") as Town
    const locationInfo = currentTown ? TOWN_INFO[currentTown] : undefined
    const distance = currentTown ? locationInfo?.distanceTo?.[townName] : 0
    const mouse = { x: e.pageX, y: e.pageY }

    const tooltip = document.createElement("div")
    tooltip.classList.add("tooltip")
    tooltip.style.position = "absolute"
    tooltip.style.top = `${mouse.y + 20}px`
    tooltip.style.left = `${mouse.x + 20}px`

    const tooltipContent = <Tooltip townName={townName} distance={distance} />
    tooltip.innerHTML = renderToString(tooltipContent)

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

        {Object.entries(TOWN_INFO).map(
          ([town, { x, y, textAlign = "bottom" }]) => {
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
                  className={`w-5 h-5 ${
                    !isCurrentTown ? "cursor-pointer" : ""
                  }`}
                  onClick={() =>
                    !isCurrentTown && handleStartJourney(town as Town)
                  }
                  data-town={town}
                  onMouseOver={
                    !isCurrentTown
                      ? (e) => onMouseOverTown(e, currentTown)
                      : undefined
                  }
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
          }
        )}

        {currentTown && (
          <image
            width="20"
            height="20"
            filter="url(#blue)"
            x={TOWN_INFO[currentTown].x - 23}
            y={TOWN_INFO[currentTown].y + 1}
            xlinkHref="img/map/ship.svg"
          />
        )}
      </svg>
    </div>
  )
}

export default Map
