import { m as motion } from "framer-motion"
import { useRouter } from "next/router"
import { Fragment, useState } from "react"

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
  const router = useRouter()

  const [tooltipInfo, setTooltipInfo] = useState<{
    show: boolean
    top?: number
    left?: number
    destination?: Town
  }>({ show: false })

  const handleStartJourney = (town: Town) => {
    removeModal("map")

    if (router.pathname !== "/") {
      router.push("/")
    }

    startJourney({ town })
  }

  const onCurrentTownLoad = (townImage: SVGImageElement) =>
    setTimeout(() => {
      townImage?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }, 100)

  const onMouseOverTown = (
    e: React.MouseEvent<SVGImageElement>,
    townName: Town
  ) => {
    const mouse = { x: e.clientX, y: e.clientY }

    setTooltipInfo({
      ...tooltipInfo,
      show: true,
      top: mouse.y + 20,
      left: mouse.x + 20,
      destination: townName,
    })
  }

  const onMouseOutTown = () => {
    setTooltipInfo({ show: false })
  }

  return (
    <div className="lg:max-w-7xl overflow-x-auto mx-auto opacity-80">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        preserveAspectRatio="xMinYMin meet"
        className="w-[1000px] lg:w-full lg:max-w-7xl"
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
            <feFlood floodColor="#00435c" result="bg" />
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
          ([townName, { x, y, textAlign = "bottom" }]) => {
            const isCurrentTown = townName === currentTown

            return (
              <Fragment key={`sea-map-${townName}`}>
                <motion.image
                  key={`sea-map-town-${townName}`}
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
                  onLoad={(e) => {
                    if (isCurrentTown) {
                      onCurrentTownLoad(e.currentTarget)
                    }
                  }}
                  onClick={() =>
                    !isCurrentTown && handleStartJourney(townName as Town)
                  }
                  onMouseMove={
                    !isCurrentTown
                      ? (e) => onMouseOverTown(e, townName as Town)
                      : undefined
                  }
                  onMouseOut={onMouseOutTown}
                />

                <text
                  x={textAlign === "bottom" ? x - townName.length * 2 : x + 26}
                  y={textAlign === "bottom" ? y + 34 : y + 15}
                  fontSize="10px"
                  fontFamily="monospace"
                  className="bg-white"
                  fill="white"
                  opacity={isCurrentTown ? 0.9 : 0.8}
                  filter={isCurrentTown ? "url(#blue)" : "url(#black)"}
                  style={{ userSelect: "none" }}
                  dangerouslySetInnerHTML={{
                    __html: `&nbsp;${townName}&nbsp;`,
                  }}
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

      {tooltipInfo && (
        <Tooltip
          show={tooltipInfo.show}
          currentTown={currentTown}
          destination={tooltipInfo.destination}
          top={tooltipInfo.top}
          left={tooltipInfo.left}
        />
      )}
    </div>
  )
}

export default Map
