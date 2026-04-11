"use client"

import { m as motion } from "framer-motion"
import Image from "next/image"
import { FaCoins } from "react-icons/fa"
import { GiBandana, GiCannon, GiShoonerSailboat } from "react-icons/gi"
import { PiMedalFill } from "react-icons/pi"
import { RiBankLine } from "react-icons/ri"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"

import AdvisorTipItem from "./AdvisorTipItem"

type Props = {
  title: string
}

const AdvisorTips = ({ title }: Props) => {
  const { data: player } = useGetPlayer()

  const warnings = getAdvisorWarnings(player)

  if (!player || !warnings.length) return null

  const has = (tip: AdvisorWarning) => warnings.find((w) => w.tip === tip)

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
          initial={{
            translateX: -50,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            translateX: [-50, 0],
            opacity: [0, 1],
            scale: [0, 1],
          }}
          transition={{ delay: 0.5 }}
          className="max-w-full"
        >
          {title}
        </motion.div>
      </div>

      <ul className="flex flex-col gap-4">
        {has("TOO_MUCH_GOLD") && (
          <AdvisorTipItem
            icon={<FaCoins className="h-7 w-7" />}
            blocksTravel={has("TOO_MUCH_GOLD")!.blocksTravel}
          >
            You are carrying {player.character.gold} gold, it would be wise to
            spend it on something useful or save it in the bank so you
            won&apos;t lose it if you are defeated at sea.
          </AdvisorTipItem>
        )}

        {has("LOAN_BLOCKS_DEPOSIT") && (
          <AdvisorTipItem
            icon={<RiBankLine className="h-7 w-7" />}
            blocksTravel={has("LOAN_BLOCKS_DEPOSIT")!.blocksTravel}
          >
            You have an outstanding loan — you cannot deposit gold until the
            loan is repaid. Head to the bank to repay it.
          </AdvisorTipItem>
        )}

        {has("NO_SHIPS") && (
          <AdvisorTipItem
            icon={<GiShoonerSailboat className="h-7 w-7" />}
            blocksTravel={has("NO_SHIPS")!.blocksTravel}
          >
            You do not own any ships. Visit the shipyard to buy one before you
            can set sail.
          </AdvisorTipItem>
        )}

        {has("DAMAGED_SHIPS") && (
          <AdvisorTipItem
            icon={<GiShoonerSailboat className="h-7 w-7" />}
            blocksTravel={has("DAMAGED_SHIPS")!.blocksTravel}
          >
            Some of your ships are too damaged to continue traveling. Fix them
            in the shipyard.
          </AdvisorTipItem>
        )}

        {has("SHIPS_NEED_REPAIRS") && (
          <AdvisorTipItem
            icon={<GiShoonerSailboat className="h-7 w-7" />}
            blocksTravel={has("SHIPS_NEED_REPAIRS")!.blocksTravel}
          >
            Your ships have taken some damage. Consider repairing them at the
            shipyard before your next journey.
          </AdvisorTipItem>
        )}

        {has("NO_CREW") && (
          <AdvisorTipItem
            icon={<GiBandana className="h-7 w-7" />}
            blocksTravel={has("NO_CREW")!.blocksTravel}
          >
            You do not have any crew members. Recruit some at the tavern.
          </AdvisorTipItem>
        )}

        {has("NOT_ENOUGH_CREW") && (
          <AdvisorTipItem
            icon={<GiBandana className="h-7 w-7" />}
            blocksTravel={has("NOT_ENOUGH_CREW")!.blocksTravel}
          >
            You do not have enough crew members to sail your ships. Recruit more
            at the tavern or sell a ship at the shipyard.
          </AdvisorTipItem>
        )}

        {has("TOO_MANY_CREW") && (
          <AdvisorTipItem
            icon={<GiBandana className="h-7 w-7" />}
            blocksTravel={has("TOO_MANY_CREW")!.blocksTravel}
          >
            Your ships cannot carry this many crew members. Buy a new ship at
            the shipyard or dismiss some crew members.
          </AdvisorTipItem>
        )}

        {has("ANGRY_CREW") && (
          <AdvisorTipItem
            icon={<GiBandana className="h-7 w-7" />}
            blocksTravel={has("ANGRY_CREW")!.blocksTravel}
          >
            Your crew is furious and refuses to sail. Make them happy by giving
            them gold or taking them to the tavern.
          </AdvisorTipItem>
        )}

        {has("LOW_CREW_MOOD") && (
          <AdvisorTipItem
            icon={<GiBandana className="h-7 w-7" />}
            blocksTravel={has("LOW_CREW_MOOD")!.blocksTravel}
          >
            Your crew&apos;s mood is getting low. Give them gold or take them to
            the tavern before they refuse to sail.
          </AdvisorTipItem>
        )}

        {has("CREW_IS_ILL") && (
          <AdvisorTipItem
            icon={<GiBandana className="h-7 w-7" />}
            blocksTravel={has("CREW_IS_ILL")!.blocksTravel}
          >
            Your crew is too ill to travel. Give them medicine.
          </AdvisorTipItem>
        )}

        {has("LOW_CREW_HEALTH") && (
          <AdvisorTipItem
            icon={<GiBandana className="h-7 w-7" />}
            blocksTravel={has("LOW_CREW_HEALTH")!.blocksTravel}
          >
            Your crew&apos;s health is dangerously low. Give them medicine
            before they become too ill to travel.
          </AdvisorTipItem>
        )}

        {has("NEED_MORE_FOOD") && (
          <AdvisorTipItem
            icon={<MerchandiseIcon item="food" />}
            blocksTravel={has("NEED_MORE_FOOD")!.blocksTravel}
          >
            You will need more food in stock for the next journey. Stock up at
            the shop.
          </AdvisorTipItem>
        )}

        {has("NEED_MORE_WATER") && (
          <AdvisorTipItem
            icon={<MerchandiseIcon item="water" />}
            blocksTravel={has("NEED_MORE_WATER")!.blocksTravel}
          >
            You will need more water in stock for the next journey. Stock up at
            the shop.
          </AdvisorTipItem>
        )}

        {has("NO_CANNONS") && (
          <AdvisorTipItem
            icon={<GiCannon className="h-7 w-7" />}
            blocksTravel={has("NO_CANNONS")!.blocksTravel}
          >
            You have no cannons. Without them, you have little chance in a sea
            battle. Buy some at the shipyard.
          </AdvisorTipItem>
        )}

        {has("PROMOTION_AVAILABLE") && (
          <AdvisorTipItem
            icon={<PiMedalFill className="h-7 w-7" />}
            blocksTravel={has("PROMOTION_AVAILABLE")!.blocksTravel}
          >
            You have earned a promotion! Visit the City Hall to claim your new
            title and its gold reward.
          </AdvisorTipItem>
        )}
      </ul>
    </>
  )
}

export default AdvisorTips
