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
  { tip, blocksTravel }: AdvisorWarningItem,
  player: Player
): { icon: ReactNode; text: string } | null => {
  switch (tip) {
    case "TOO_MUCH_GOLD":
      return {
        icon: <FaCoins className="h-7 w-7" />,
        text: `You are carrying ${player.character.gold} gold, it would be wise to spend it on something useful or save it in the bank so you won't lose it if you are defeated at sea.`,
      }
    case "LOAN_BLOCKS_DEPOSIT":
      return {
        icon: <RiBankLine className="h-7 w-7" />,
        text: "You have an outstanding loan — you cannot deposit gold until the loan is repaid. Head to the bank to repay it.",
      }
    case "NO_SHIPS":
      return {
        icon: <GiShoonerSailboat className="h-7 w-7" />,
        text: "You do not own any ships. Visit the shipyard to buy one before you can set sail.",
      }
    case "DAMAGED_SHIPS":
      return {
        icon: <GiShoonerSailboat className="h-7 w-7" />,
        text: "Some of your ships are too damaged to continue traveling. Fix them in the shipyard.",
      }
    case "SHIPS_NEED_REPAIRS":
      return {
        icon: <GiShoonerSailboat className="h-7 w-7" />,
        text: "Your ships have taken some damage. Consider repairing them at the shipyard before your next journey.",
      }
    case "NO_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "You do not have any crew members. Recruit some at the tavern.",
      }
    case "NOT_ENOUGH_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "You do not have enough crew members to sail your ships. Recruit more at the tavern or sell a ship at the shipyard.",
      }
    case "TOO_MANY_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Your ships cannot carry this many crew members. Buy a new ship at the shipyard or dismiss some crew members.",
      }
    case "ANGRY_CREW":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Your crew is furious and refuses to sail. Make them happy by giving them gold or taking them to the tavern.",
      }
    case "LOW_CREW_MOOD":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Your crew's mood is getting low. Give them gold or take them to the tavern before they refuse to sail.",
      }
    case "CREW_IS_ILL":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Your crew is too ill to travel. Give them medicine.",
      }
    case "LOW_CREW_HEALTH":
      return {
        icon: <GiBandana className="h-7 w-7" />,
        text: "Your crew's health is dangerously low. Give them medicine before they become too ill to travel.",
      }
    case "NEED_MORE_FOOD":
      return {
        icon: <MerchandiseIcon item="food" />,
        text: "You will need more food in stock for the next journey. Stock up at the shop.",
      }
    case "NEED_MORE_WATER":
      return {
        icon: <MerchandiseIcon item="water" />,
        text: "You will need more water in stock for the next journey. Stock up at the shop.",
      }
    case "NO_CANNONS":
      return {
        icon: <GiCannon className="h-7 w-7" />,
        text: "You have no cannons. Without them, you have little chance in a sea battle. Buy some at the shipyard.",
      }
    case "PROMOTION_AVAILABLE":
      return {
        icon: <PiMedalFill className="h-7 w-7" />,
        text: "You have earned a promotion! Visit the City Hall to claim your new title and its gold reward.",
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
      <div className="flex items-start gap-2">
        <Image
          src="/img/parrot.svg"
          alt="Parrot"
          width={100}
          height={100}
          draggable={false}
          className="mx-4 mt-1 shrink-0 select-none"
        />

        <motion.div
          initial={{ translateX: -50, opacity: 0, scale: 0 }}
          animate={{ translateX: [-50, 0], opacity: [0, 1], scale: [0, 1] }}
          transition={{ delay: 0.5 }}
          className="max-w-full"
        >
          {title}
        </motion.div>
      </div>

      <ul className="flex flex-col gap-4">
        {warnings.map((warning) => {
          const content = getWarningContent(warning, player)
          if (!content) return null
          return (
            <AdvisorTipItem
              key={warning.tip}
              icon={content.icon}
              blocksTravel={warning.blocksTravel}
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

