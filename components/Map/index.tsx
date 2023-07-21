import { m as motion } from "framer-motion"
import { useRouter } from "next/router"
import { Fragment, useState } from "react"

import { TOWNS } from "@/constants/locations"
import { useSea } from "@/hooks/queries/useSea"

import { useModal } from "../ui/Modal/context"
import Tooltip from "./Tooltip"

const mapWidth = 850
const mapHeight = 540

const colors = {
  lightBlue: "#3e9cbe",
  darkBlue: "#00435c",
  black: "#000",
}

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
    }, 250)

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
            <feFlood floodColor={colors.black} result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter x="0" y="0" width="1" height="1" id="blue">
            <feFlood floodColor={colors.darkBlue} result="bg" />
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

        {Object.entries(TOWNS).map(([townName, town]) => {
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
                x={town.map.x}
                y={town.map.y}
                xlinkHref="img/map/town.svg"
                className={`w-5 h-5 ${!isCurrentTown ? "cursor-pointer" : ""}`}
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
                x={
                  town.map.textAlign === "right"
                    ? town.map.x + 26
                    : town.map.x - townName.length * 2
                }
                y={
                  town.map.textAlign === "right"
                    ? town.map.y + 15
                    : town.map.y + 34
                }
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
        })}

        {currentTown && (
          <>
            <rect
              fill={colors.lightBlue}
              stroke={colors.black}
              strokeWidth={0.75}
              width={22}
              height={22}
              x={TOWNS[currentTown].map.x - 24}
              y={TOWNS[currentTown].map.y}
            />
            <motion.image
              animate={{
                rotate: [0, 3, 0, -3, 0],
                translateY: [0, -0.5, 0, 0.5, 0],
                transition: { duration: 1.5, repeat: Infinity },
              }}
              width={20}
              height={20}
              x={TOWNS[currentTown].map.x - 23}
              y={TOWNS[currentTown].map.y + 1}
              xlinkHref="img/logo.svg"
            />
          </>
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
