"use client"

import { m as motion } from "framer-motion"
import Image from "next/image"
import { ReactNode } from "react"
import { FaCoins } from "react-icons/fa"
import { GiBandana, GiCannon, GiShoonerSailboat } from "react-icons/gi"
import { PiMedalFill } from "react-icons/pi"
import { RiBankLine } from "react-icons/ri"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { AdvisorWarningItem } from "@/utils/getAdvisorWarnings"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"

import AdvisorTipItem from "./AdvisorTipItem"

type Props = {
  title: string
}

const getWarningContent = (
  { tip }: AdvisorWarningItem,
  player: Player
): { icon: ReactNode; text: string } | null => {
  switch (tip) {
    case "TOO_MUCH_GOLD":
      return {
        icon: <FaCoins className="h-7 w-7" />,
        text: `Carrying ${player.character.gold} gold. Spend it or bank it to keep it safe from defeat at sea.`,
      }
    case "LOAN_BLOCKS_DEPOSIT":
      return {
        icon: <RiBankLine className="h-7 w-7" />,
        text: "Repay your bank loan before depositing gold.",
      }
    case "NO_SHIPS":
      return {
        icon: <GiShoonerSailboat className="h-7 w-7" />,
        text: "No ships. Buy one at the shipyard before sailing.",
      }
    case "DAMAGED_SHIPS":
      return {
        icon: <GiShoonerSailboat className="h-7 w-7" />,
        text: "Ships too damaged to sail. Visit the shipyard or use repair kits in Crew & Fleet > Equipment.",
      }
    case "SHIPS_NEED_REPAIRS":
      return {
        icon: <GiShoonerSailboat className="h-7 w-7" />,
        text: "Ships need repairs. Visit the shipyard or use repair kits in Crew & Fleet > Equipment, even at sea.",
      }
    case "NO_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "No crew. Recruit at the tavern.",
      }
    case "NOT_ENOUGH_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Too few crew to sail. Recruit at the tavern or sell a ship at the shipyard.",
      }
    case "TOO_MANY_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Too many crew to sail. Buy a ship at the shipyard or dismiss crew.",
      }
    case "ANGRY_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Crew refuses to sail. Give them gold or treat them at the tavern.",
      }
    case "LOW_CREW_MOOD":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Crew mood is low. Give them gold or treat them at the tavern.",
      }
    case "CREW_IS_ILL":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Crew too ill to sail. Give them medicine.",
      }
    case "LOW_CREW_HEALTH":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Crew health is low. Give them medicine before they are too ill to sail.",
      }
    case "NEED_MORE_FOOD":
      return {
        icon: <MerchandiseIcon item="food" />,
        text: "Not enough food to sail. Stock up at the shop.",
      }
    case "NEED_MORE_WATER":
      return {
        icon: <MerchandiseIcon item="water" />,
        text: "Not enough water to sail. Stock up at the shop.",
      }
    case "NO_CANNONS":
      return {
        icon: <GiCannon className="h-7 w-7" />,
        text: "No cannons: little chance in battle. Buy some at the shipyard.",
      }
    case "PROMOTION_AVAILABLE":
      return {
        icon: <PiMedalFill className="h-7 w-7" />,
        text: "Promotion earned! Claim your title and gold at City Hall.",
      }
    default:
      return null
  }
}

const AdvisorTips = ({ title }: Props) => {
  const { data: player } = useGetPlayer()

  const warnings = getAdvisorWarnings(player)

  if (!player || !warnings.length) return null

  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <Image
          src="/img/parrot.svg"
          alt="Parrot"
          width={100}
          height={100}
          draggable={false}
          className="size-8 shrink-0 select-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 350,
            damping: 15,
          }}
          className="text-muted-foreground text-sm leading-snug italic"
        >
          {title}
        </motion.div>
      </div>

      <ul className="flex flex-col gap-1">
        {warnings.map((warning) => {
          const content = getWarningContent(warning, player)

          if (!content) return null

          return (
            <AdvisorTipItem
              key={warning.tip}
              icon={content.icon}
              blocksTravel={warning.blocksTravel}
              variant={warning.blocksTravel ? "error" : undefined}
            >
              {content.text}
            </AdvisorTipItem>
          )
        })}
      </ul>
    </>
  )
}

export default AdvisorTips
