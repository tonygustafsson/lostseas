"use client"

import { CircleCheck } from "lucide-react"
import Image from "next/image"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"
import {
  AdvisorWarningItem,
  getAdvisorWarnings,
} from "@/utils/getAdvisorWarnings"

import { getWarningContent, getWarningVariant } from "./warningContent"

const iconClass = {
  error: "bg-error/15 text-error",
  warning: "bg-warning/15 text-warning",
  success: "bg-success/15 text-success",
}

type GroupProps = {
  label: string
  labelClassName: string
  warnings: AdvisorWarningItem[]
  player: Player
  destination?: Town
}

const WarningGroup = ({
  label,
  labelClassName,
  warnings,
  player,
  destination,
}: GroupProps) => {
  const items = warnings.flatMap((warning) => {
    const content = getWarningContent(warning, player, destination)

    return content ? [{ warning, content }] : []
  })

  if (!items.length) return null

  return (
    <section>
      <h3
        className={cn(
          "mb-2 text-xs font-semibold tracking-widest uppercase",
          labelClassName
        )}
      >
        {label}
      </h3>

      <ul className="divide-border divide-y">
        {items.map(({ warning, content }) => (
          <li
            key={warning.tip}
            className="flex items-center gap-4 py-2 text-sm leading-snug"
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full *:size-4",
                iconClass[getWarningVariant(warning)]
              )}
            >
              {content.icon}
            </span>

            {content.text}
          </li>
        ))}
      </ul>
    </section>
  )
}

type Props = {
  heading?: string
  title: string
  showAllClear?: boolean
  destination?: Town
}

const AdvisorTips = ({ heading, title, showAllClear, destination }: Props) => {
  const { data: player } = useGetPlayer()

  if (!player) return null

  const warnings = getAdvisorWarnings(player, destination)
  const goodNews = warnings.filter(
    (warning) => getWarningVariant(warning) === "success"
  )
  const blocking = warnings.filter(({ blocksTravel }) => blocksTravel)
  const advice = warnings.filter(
    (warning) => getWarningVariant(warning) === "warning"
  )

  if (!warnings.length && !showAllClear) return null

  return (
    <div className="bg-background/50 flex flex-col gap-6 rounded-lg border p-4 sm:p-6">
      <div className="flex items-center gap-4">
        <Image
          src="/img/parrot.svg"
          alt="Parrot"
          width={100}
          height={100}
          draggable={false}
          className="size-12 shrink-0 select-none"
        />

        <div>
          {heading && <h2 className="font-serif text-xl">{heading}</h2>}

          <p className="text-muted-foreground text-sm leading-snug italic">
            {title}
          </p>
        </div>
      </div>

      {warnings.length ? (
        <>
          <WarningGroup
            label="Good news"
            labelClassName="text-success"
            warnings={goodNews}
            player={player}
            destination={destination}
          />

          <WarningGroup
            label="Before you sail"
            labelClassName="text-error"
            warnings={blocking}
            player={player}
            destination={destination}
          />

          <WarningGroup
            label="Worth a look"
            labelClassName="text-gold"
            warnings={advice}
            player={player}
            destination={destination}
          />
        </>
      ) : (
        <p className="text-success flex items-center gap-2 text-sm">
          <CircleCheck className="size-5 shrink-0" />
          All shipshape. Ready to set sail!
        </p>
      )}
    </div>
  )
}

export default AdvisorTips
