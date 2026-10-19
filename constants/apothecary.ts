export const APOTHECARY_PRICE_PER_POINT = 0.6

export type Remedy =
  | "willow-bark-tea"
  | "comfrey-poultice"
  | "jesuits-bark-tonic"
  | "theriac-draught"

export const APOTHECARY_REMEDIES: Record<
  Remedy,
  { label: string; healthIncrease: number; description: string }
> = {
  "willow-bark-tea": {
    label: "Willow bark tea",
    healthIncrease: 25,
    description:
      "A bitter brew of willow bark that eases aches and fevers after a hard voyage.",
  },
  "comfrey-poultice": {
    label: "Comfrey poultice",
    healthIncrease: 50,
    description:
      "Crushed comfrey leaves bound over cuts and bruises to help them knit.",
  },
  "jesuits-bark-tonic": {
    label: "Jesuit's bark tonic",
    healthIncrease: 75,
    description:
      "Ground cinchona bark from Peru steeped in wine, the surest cure for the fevers of the islands.",
  },
  "theriac-draught": {
    label: "Theriac draught",
    healthIncrease: 100,
    description:
      "The apothecary's prized mixture of herbs, honey and spices, said to cure almost anything.",
  },
}

export const isRemedy = (value: unknown): value is Remedy =>
  typeof value === "string" && Object.hasOwn(APOTHECARY_REMEDIES, value)
