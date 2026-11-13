import type { StatisticsEntry } from "@/firebase/db"

export const player = {
  id: "storybook-captain",
  createdDate: 1704067200000,
  character: {
    characterId: "mateo-salazar",
    name: "Morgan Reed",
    nationality: "England",
    title: "Captain",
    town: "Port Royale",
    location: "Shop",
    gold: 2500,
    account: 1200,
    loan: 0,
    day: 12,
    weather: "sunny",
  },
  ships: {
    endeavour: {
      id: "endeavour",
      name: "Endeavour",
      type: "Brig",
      health: 85,
      createdDay: 1,
    },
  },
  crewMembers: { count: 40, health: 85, mood: 75 },
  inventory: { food: 100, water: 160, cannons: 8, medicine: 12, rum: 20 },
} satisfies Player

/** Six snapshots of a captain's progress, for the charts */
export const statistics: StatisticsEntry[] = [1, 3, 6, 8, 11, 14].map(
  (day, index) => ({
    day,
    timestamp: 1704067200000 + index * 86400000,
    score: [31, 53, 105, 159, 232, 268][index],
    netWorth: [500, 800, 650, 1200, 1800, 3200][index],
    scoreTitle: [0, 0, 50, 50, 100, 100][index],
    scoreWealth: [1, 3, 5, 9, 12, 18][index],
    scoreShips: [10, 10, 10, 20, 20, 30][index],
    scoreCannons: [20, 40, 40, 80, 100, 120][index],
    mannedCannons: [2, 4, 4, 8, 10, 12][index],
    cannons: [4, 4, 10, 10, 16, 16][index],
    battlesWon: [0, 1, 3, 4, 7, 9][index],
    battlesLost: [0, 0, 1, 1, 1, 2][index],
  })
)
