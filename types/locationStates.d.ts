type MarketState = {
  visited: true | undefined | null
  items: LocationStateMarketItems
}

type TavernState = {
  visited: true | undefined | null
  noOfSailors: number
  isHostile: boolean
}

type SeaState = {
  shipMeeting: ShipMeetingState | undefined | null
  attackSuccessReport?: AttackSuccessReport
  attackFailureReport?: AttackFailureReport
}

type LocationStates = {
  market?: MarketState
  tavern?: TavernState
  sea?: SeaState
}

type AdvisorWarning =
  | "TOO_MUCH_GOLD"
  | "LOAN_BLOCKS_DEPOSIT"
  | "NO_SHIPS"
  | "DAMAGED_SHIPS"
  | "SHIPS_NEED_REPAIRS"
  | "NEED_MORE_FOOD"
  | "NEED_MORE_WATER"
  | "CREW_IS_ILL"
  | "LOW_CREW_HEALTH"
  | "NO_CREW"
  | "NOT_ENOUGH_CREW"
  | "TOO_MANY_CREW"
  | "ANGRY_CREW"
  | "LOW_CREW_MOOD"
  | "NO_CANNONS"
  | "PROMOTION_AVAILABLE"

/** @deprecated Use AdvisorWarning */
type LandingTip = AdvisorWarning

type JourneyValidation = {
  success: boolean
  errors: JourneyValidationError[]
  neededFood: number
  neededWater: number
  minCrew: number
  maxCrew: number
}

type JourneyValidationError =
  | "NO_PLAYER"
  | "NO_SHIPS"
  | "DAMAGED_SHIPS"
  | "NOT_ENOUGH_CREW_MEMBERS"
  | "TOO_MANY_CREW_MEMBERS"
  | "CREW_IS_ILL"
  | "ANGRY_CREW"
  | "NO_FOOD"
  | "NO_WATER"

type ShipMeetingState = {
  nation: Nation | "Pirate"
  shipType: ShipType
  crewMembers: number
  cannons: number
}

type LocationStateMarketItems = Record<
  keyof Inventory,
  Record<"quantity" | "price", number>
>
