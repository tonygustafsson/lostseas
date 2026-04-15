"use client"

import { m as motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, useMemo, useState } from "react"

import useModal from "@/app/stores/modals"
import { TOWNS } from "@/constants/locations"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useSea } from "@/hooks/queries/useSea"
import { calculateDayPaths, getJourneyPath } from "@/utils/journeyWaypoints"

import Tooltip from "./Tooltip"

const mapWidth = 850
const mapHeight = 540

const colors = {
  lightBlue: "#3e9cbe",
  darkBlue: "#00435c",
  black: "#000",
}

type Props = {
  currentTown?: Town
}

const Map = ({ currentTown }: Props) => {
  const { data: player } = useGetPlayer()
  const { startJourney } = useSea()
  const { removeModal } = useModal()
  const router = useRouter()
  const pathname = usePathname()

  const [tooltipInfo, setTooltipInfo] = useState<{
    show: boolean
    top?: number
    left?: number
    destination?: Town
  }>({ show: false })

  const journey = player?.character.journey
  const journeyOrigin = journey?.origin || currentTown
  const isShipMeeting = !!player?.locationStates?.sea?.shipMeeting
  const isTraveling = !!journey

  // --- Journey animation state ---
  const { shipState, journeyPath } = useMemo(() => {
    if (!journey || !journeyOrigin) {
      return { shipState: null, journeyPath: [] }
    }

    const { destination, totalDays, day } = journey
    const dayPaths = calculateDayPaths(journeyOrigin, destination, totalDays)
    const path = getJourneyPath(journeyOrigin, destination)

    const currentDayIndex = Math.max(0, Math.min(day - 1, dayPaths.length - 1))
    const currentDayPath = dayPaths[currentDayIndex]

    if (!currentDayPath || currentDayPath.length === 0) {
      return { shipState: null, journeyPath: path }
    }

    const endPt = currentDayPath[currentDayPath.length - 1]
    const startPt = currentDayPath[0]
    const scaleX = endPt.x >= startPt.x ? 1 : -1
    const shipKey = `${journeyOrigin}-${destination}-${totalDays}`
    const originPos = TOWNS[journeyOrigin].map
    const freezePt = isShipMeeting ? startPt : null
    const xs = currentDayPath.map((p) => (freezePt ?? p).x - 10)
    const ys = currentDayPath.map((p) => (freezePt ?? p).y - 10)
    const times = currentDayPath.map((_, i) =>
      currentDayPath.length === 1 ? 0 : i / (currentDayPath.length - 1)
    )

    return {
      journeyPath: path,
      shipState: {
        shipKey,
        xs,
        ys,
        times,
        initialX: originPos.x - 10,
        initialY: originPos.y - 10,
        scaleX,
        currentDay: day,
        totalDays,
        duration: isShipMeeting ? 0 : 2,
      },
    }
  }, [journey, journeyOrigin, isShipMeeting])

  // --- Handlers (only active when not traveling) ---
  const handleStartJourney = (town: Town) => {
    removeModal("map")
    if (pathname !== "/") router.push("/")
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
    setTooltipInfo({
      show: true,
      top: e.clientY + 20,
      left: e.clientX + 20,
      destination: townName,
    })
  }

  const onMouseOutTown = () => setTooltipInfo({ show: false })

  return (
    <div className="mx-auto w-full overflow-x-auto opacity-80 lg:max-w-7xl">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        preserveAspectRatio="xMinYMin meet"
        className="w-250 lg:w-full lg:max-w-7xl"
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

        {/* Journey route line — only when traveling */}
        {isTraveling && journeyPath.length > 1 && (
          <polyline
            points={journeyPath.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="red"
            strokeWidth={2}
            strokeDasharray="4 3"
            strokeLinecap="round"
            opacity={0.8}
          />
        )}

        {Object.entries(TOWNS).map(([townName, town]) => {
          const isCurrentTown = townName === currentTown
          const isClickable = !isTraveling && !isCurrentTown

          return (
            <Fragment key={`sea-map-${townName}`}>
              <motion.image
                whileHover={{ scale: isClickable ? 1.1 : 1 }}
                width="20"
                height="20"
                x={town.map.x}
                y={town.map.y}
                xlinkHref="img/map/town.svg"
                className={`h-5 w-5 ${isClickable ? "cursor-pointer" : ""}`}
                onLoad={(e) => {
                  if (isCurrentTown)
                    onCurrentTownLoad(e.currentTarget as SVGImageElement)
                }}
                onClick={() =>
                  isClickable && handleStartJourney(townName as Town)
                }
                onMouseMove={
                  isClickable
                    ? (e) =>
                        onMouseOverTown(
                          e as React.MouseEvent<SVGImageElement>,
                          townName as Town
                        )
                    : undefined
                }
                onMouseOut={isClickable ? onMouseOutTown : undefined}
                opacity={isCurrentTown ? 0.9 : 0.6}
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
                fill="white"
                opacity={isCurrentTown ? 0.9 : 0.8}
                filter={isCurrentTown ? "url(#blue)" : "url(#black)"}
                style={{ userSelect: "none" }}
              >
                {`\u00a0${townName}\u00a0`}
              </text>
            </Fragment>
          )
        })}

        {/* Harbor ship — when not traveling */}
        {!isTraveling && currentTown && (
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

        {/* Animated ship box — when traveling */}
        {isTraveling &&
          shipState &&
          (() => {
            const shipTransition = {
              duration: shipState.duration,
              ease: "easeInOut" as const,
              times: shipState.times,
            }
            return (
              <>
                <motion.rect
                  key={`box-${shipState.shipKey}`}
                  fill={colors.lightBlue}
                  stroke={colors.black}
                  strokeWidth={0.75}
                  width={22}
                  height={22}
                  initial={{
                    x: shipState.initialX - 1,
                    y: shipState.initialY - 1,
                  }}
                  animate={{
                    x: shipState.xs.map((x) => x - 1),
                    y: shipState.ys.map((y) => y - 1),
                  }}
                  transition={shipTransition}
                />
                <motion.image
                  key={`ship-${shipState.shipKey}`}
                  initial={{ x: shipState.initialX, y: shipState.initialY }}
                  animate={{ x: shipState.xs, y: shipState.ys }}
                  transition={shipTransition}
                  style={{ scaleX: shipState.scaleX }}
                  width="20"
                  height="20"
                  xlinkHref="img/logo.svg"
                />
              </>
            )
          })()}
      </svg>

      {/* Tooltip — only when not traveling */}
      {!isTraveling && tooltipInfo.show && (
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
