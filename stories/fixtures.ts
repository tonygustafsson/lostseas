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
