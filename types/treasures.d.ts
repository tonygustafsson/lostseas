type TreasureName =
  | "Inca mask"
  | "Large diamond"
  | "Legendary dagger"
  | "Cursed star"
  | "Magical axe"
  | "Magical lamp"
  | "Potion of life"
  | "Key of souls"
  | "Golden hen"

type Treasure = {
  id: string
  name: TreasureName
  rewarder: Town
}
