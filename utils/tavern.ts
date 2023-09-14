export const getCardsBet = (percentage: number, gold: number) => {
  if (percentage === 100) return gold

  return Math.floor((percentage / 100) * gold)
}
