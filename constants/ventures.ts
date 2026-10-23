import { camelCaseToKebabCase } from "@/utils/string"

export type VentureRisk = "Low" | "Moderate" | "High" | "Very high"

export type VentureOutcome = {
  /** Chance in percent. The chances of a venture add up to 100. */
  chance: number
  returns: number
  message: string
}

export type Venture = {
  name: string
  origin: Town
  destination: Town
  description: string
  stake: number
  days: number
  risk: VentureRisk
  outcomes: VentureOutcome[]
}

export const VENTURES: Record<VentureId, Venture> = {
  sugarConvoy: {
    name: "The Barbados sugar convoy",
    origin: "Barbados",
    destination: "Charles Towne",
    description:
      "English merchantmen carry hogsheads of sugar and molasses north under the guns of a Royal Navy frigate.",
    stake: 500,
    days: 14,
    risk: "Low",
    outcomes: [
      {
        chance: 85,
        returns: 600,
        message:
          "Fair winds all the way. The sugar sold well in Charles Towne.",
      },
      {
        chance: 15,
        returns: 450,
        message:
          "Foul weather spoiled part of the cargo, but the convoy made port.",
      },
    ],
  },
  tobaccoRun: {
    name: "The Havana tobacco run",
    origin: "Havana",
    destination: "St. Eustatius",
    description:
      "A Spanish factor sends cured leaf to the Dutch free port, sailing under false colours while Spain and Holland are at war.",
    stake: 1500,
    days: 21,
    risk: "Moderate",
    outcomes: [
      {
        chance: 70,
        returns: 2400,
        message:
          "The Dutch paid a premium for Havana leaf, and no questions were asked.",
      },
      {
        chance: 20,
        returns: 1500,
        message:
          "Chased off by a Dutch man-of-war, the leaf was sold cheap in a quiet cove.",
      },
      {
        chance: 10,
        returns: 0,
        message: "Taken by privateers off Hispaniola. Nothing returns.",
      },
    ],
  },
  silkSmugglers: {
    name: "The Manila silk smugglers",
    origin: "Villa Hermosa",
    destination: "Curacao",
    description:
      "Silk and porcelain from the Manila galleon are slipped past the Spanish coastguard and sold to Dutch traders.",
    stake: 3000,
    days: 28,
    risk: "High",
    outcomes: [
      {
        chance: 55,
        returns: 6600,
        message:
          "The smugglers slipped past the coastguard, and the Dutch paid in silver.",
      },
      {
        chance: 25,
        returns: 3000,
        message:
          "Half the bales went overboard in a chase, but the rest were sold.",
      },
      {
        chance: 20,
        returns: 0,
        message: "Seized by the guarda costa. Nothing returns.",
      },
    ],
  },
  silverFleet: {
    name: "A share in the silver fleet",
    origin: "Panama",
    destination: "Havana",
    description:
      "A share of Peruvian silver carried by the treasure galleons to meet the fleet at Havana.",
    stake: 6000,
    days: 42,
    risk: "Very high",
    outcomes: [
      {
        chance: 40,
        returns: 24000,
        message:
          "The galleons rode safely into Havana harbour, heavy with silver.",
      },
      {
        chance: 20,
        returns: 6000,
        message:
          "Storms battered the fleet, but divers salvaged enough to repay your stake.",
      },
      {
        chance: 40,
        returns: 0,
        message:
          "The galleons were lost to a hurricane in the Florida Straits. Nothing returns.",
      },
    ],
  },
}

export const VENTURE_IDS = Object.keys(VENTURES) as VentureId[]

export const getVentureImage = (ventureId: VentureId) =>
  `/img/ventures/${camelCaseToKebabCase(ventureId)}.png`

/** The most a venture can return, shown to players as its best outcome. */
export const getBestReturns = (venture: Venture) =>
  Math.max(...venture.outcomes.map((outcome) => outcome.returns))

export const isVentureId = (id: unknown): id is VentureId =>
  typeof id === "string" && Object.hasOwn(VENTURES, id)
