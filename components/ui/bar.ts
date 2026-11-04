// Colours for striped bars, shared by Progress and Slider
export const barColors = {
  default: "bar-sea",
  success: "bar-success",
  error: "bar-error",
  warning: "bar-warning",
  info: "bar-info",
} as const

export type BarVariant = keyof typeof barColors
