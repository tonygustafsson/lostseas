import { MERCHANDISE } from "./merchandise"

// TODO: Add cannons
const MARKET_AVAILABLE_ITEMS = Object.keys(MERCHANDISE) as (keyof Inventory)[]

export { MARKET_AVAILABLE_ITEMS }
