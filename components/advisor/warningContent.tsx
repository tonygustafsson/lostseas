import { ReactNode } from "react"
import { FaCoins } from "react-icons/fa"
import {
  GiBandana,
  GiCannon,
  GiCargoCrate,
  GiShoonerSailboat,
} from "react-icons/gi"
import { PiMedalFill } from "react-icons/pi"
import { RiBankLine } from "react-icons/ri"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { getCargo } from "@/utils/cargo"
import { AdvisorWarningItem } from "@/utils/getAdvisorWarnings"
import { getSuppliesDays } from "@/utils/journey"
import { formatGold } from "@/utils/number"

export const getWarningContent = (
  { tip }: AdvisorWarningItem,
  player: Player,
  destination?: Town
): { icon: ReactNode; text: string } | null => {
  switch (tip) {
    case "TOO_MUCH_GOLD":
      return {
        icon: <FaCoins />,
        text: `Carrying ${formatGold(player.character.gold)}. Spend it or bank it to keep it safe from defeat at sea.`,
      }
    case "LOAN_BLOCKS_DEPOSIT":
      return {
        icon: <RiBankLine />,
        text: "Repay your bank loan before depositing gold.",
      }
    case "NO_SHIPS":
      return {
        icon: <GiShoonerSailboat />,
        text: "No ships. Buy one at the shipyard before sailing.",
      }
    case "DAMAGED_SHIPS":
      return {
        icon: <GiShoonerSailboat />,
        text: "Ships too damaged to sail. Visit the shipyard or use repair kits in Crew & Fleet > Equipment.",
      }
    case "SHIPS_NEED_REPAIRS":
      return {
        icon: <GiShoonerSailboat />,
        text: "Ships need repairs. Visit the shipyard or use repair kits in Crew & Fleet > Equipment, even at sea.",
      }
    case "NO_CREW":
      return {
        icon: <GiBandana />,
        text: "No crew. Recruit at the tavern.",
      }
    case "NOT_ENOUGH_CREW":
      return {
        icon: <GiBandana />,
        text: "Too few crew to sail. Recruit at the tavern or sell a ship at the shipyard.",
      }
    case "TOO_MANY_CREW":
      return {
        icon: <GiBandana />,
        text: "Too many crew to sail. Buy a ship at the shipyard or dismiss crew.",
      }
    case "CARGO_OVERLOADED":
      return {
        icon: <GiCargoCrate />,
        text: `Overloaded by ${getCargo(player).overload}. Sell goods at the shop or buy a ship at the shipyard before sailing.`,
      }
    case "ANGRY_CREW":
      return {
        icon: <GiBandana />,
        text: "Crew refuses to sail. Give them gold or treat them at the tavern.",
      }
    case "LOW_CREW_MOOD":
      return {
        icon: <GiBandana />,
        text: "Crew mood is low. Give them gold or treat them at the tavern.",
      }
    case "CREW_IS_ILL":
      return {
        icon: <GiBandana />,
        text: "Crew too ill to sail. Give them medicine or visit the apothecary at the market.",
      }
    case "LOW_CREW_HEALTH":
      return {
        icon: <GiBandana />,
        text: "Crew health is low. Give them medicine or visit the apothecary at the market before they are too ill to sail.",
      }
    case "NEED_MORE_FOOD":
      return {
        icon: <MerchandiseIcon item="food" />,
        text: `Not enough food to reach ${destination ?? "any port"}. Stock up at the shop.`,
      }
    case "NEED_MORE_WATER":
      return {
        icon: <MerchandiseIcon item="water" />,
        text: `Not enough water to reach ${destination ?? "any port"}. Stock up at the shop.`,
      }
    case "LIMITED_SUPPLIES": {
      const { days, limitedBy } = getSuppliesDays(player)

      return {
        icon: <MerchandiseIcon item={limitedBy} />,
        text: `Your ${limitedBy} limits you to ${days} ${days === 1 ? "day" : "days"} at sea. Buy more at the shop to reach every port.`,
      }
    }
    case "NO_CANNONS":
      return {
        icon: <GiCannon />,
        text: "No cannons: little chance in battle. Buy some at the shipyard.",
      }
    case "PROMOTION_AVAILABLE":
      return {
        icon: <PiMedalFill />,
        text: "Promotion earned! Claim your title and gold at City Hall.",
      }
    case "VENTURE_READY":
      return {
        icon: <RiBankLine />,
        text: "Word has reached the bank. One of your ventures has returned to port. Collect your share at any bank.",
      }
    default:
      return null
  }
}

export const getWarningVariant = ({
  tip,
  blocksTravel,
}: AdvisorWarningItem) => {
  if (blocksTravel) return "error"
  if (tip === "PROMOTION_AVAILABLE" || tip === "VENTURE_READY") return "success"

  return "warning"
}
