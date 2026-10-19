import { MERCHANDISE } from "./merchandise"

const MARKET_AVAILABLE_ITEMS = Object.keys(MERCHANDISE) as (keyof Inventory)[]

const MARKET_MAX_OFFERS = 6

export { MARKET_AVAILABLE_ITEMS, MARKET_MAX_OFFERS }
