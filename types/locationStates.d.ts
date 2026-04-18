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
  justMetAShip?: boolean | null
}

type HarborState = {
  lastHarborReason?: "arrived" | "blocked" | null
}

type LocationStates = {
  market?: MarketState
  tavern?: TavernState
  sea?: SeaState
  harbor?: HarborState
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
