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
  }
  sea?: {
    shipMeeting: ShipMeetingState | undefined | null
    attackSuccessReport?: AttackSuccessReport
    attackFailureReport?: AttackFailureReport
  }
}

type JourneyValidation = {
  success: boolean
  errors: JourneyValidationError[]
  neededFood: number
  neededWater: number
}

type JourneyValidationError =
  | "NO_PLAYER"
  | "NO_SHIPS"
  | "NO_CREW"
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
