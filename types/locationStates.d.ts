type LocationStates = {
  market?: {
    visited: true | undefined | null
    items: LocationStateMarketItems
  }
  tavern?: {
    visited: true | undefined | null
    noOfSailors: number
    isHostile: boolean
  }
  harbor?: {
    journeyValidation?: JourneyValidation
    landingTips?: LandingTip[]
  }
  sea?: {
    shipMeeting: ShipMeetingState | undefined | null
    attackSuccessReport?: AttackSuccessReport
    attackFailureReport?: AttackFailureReport
  }
}

type LandingTip =
  | "TOO_MUCH_GOLD"
  | "NEED_MORE_FOOD"
  | "NEED_MORE_WATER"
  | "CREW_IS_ILL"
  | "DAMAGED_SHIPS"
  | "NO_CREW"
  | "ANGRY_CREW"

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
