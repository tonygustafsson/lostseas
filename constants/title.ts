export type TitleInfo = { title: Title; reward: number; maxShips: number }

export const TITLE_INFO: Record<Title, TitleInfo> = {
  Pirate: {
    title: "Pirate",
    reward: 0,
    maxShips: 3,
  },
  Ensign: {
    title: "Ensign",
    reward: 1000,
    maxShips: 5,
  },
  Captain: {
    title: "Captain",
    reward: 2500,
    maxShips: 6,
  },
  Major: {
    title: "Major",
    reward: 4000,
    maxShips: 7,
  },
  Colonel: {
    title: "Colonel",
    reward: 6000,
    maxShips: 8,
  },
  Admiral: {
    title: "Admiral",
    reward: 8000,
    maxShips: 10,
  },
  Baron: {
    title: "Baron",
    reward: 10000,
    maxShips: 11,
  },
  Count: {
    title: "Count",
    reward: 15000,
    maxShips: 12,
  },
  Marquis: {
    title: "Marquis",
    reward: 20000,
    maxShips: 13,
  },
  Duke: {
    title: "Duke",
    reward: 35000,
    maxShips: 15,
  },
}
