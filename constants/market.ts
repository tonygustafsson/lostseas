import { MERCHANDISE } from "./merchandise"

const MARKET_AVAILABLE_ITEMS = Object.keys(MERCHANDISE) as (keyof Inventory)[]

export { MARKET_AVAILABLE_ITEMS }
