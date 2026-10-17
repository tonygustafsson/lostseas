export const getCardsBet = (percentage: number, gold: number) => {
  if (percentage === 100) return gold

  return Math.floor((percentage / 100) * gold)
}

/** A treatment needs a crew and must raise their health or mood. */
export const canTreatCrew = (
  crewMembers: CrewMembers,
  {
    healthIncrease,
    moodIncrease,
  }: { healthIncrease: number; moodIncrease: number }
) =>
  crewMembers.count > 0 &&
  ((healthIncrease > 0 && crewMembers.health < 100) ||
    (moodIncrease > 0 && crewMembers.mood < 100))
