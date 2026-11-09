export type TitleInfo = {
  title: Title
  /** Level needed for the title. Each step needs one more victory than the one before. */
  minLevel: number
  reward: number
  maxShips: number
  higherThan: Title[]
}

export const TITLE_INFO: Record<Title, TitleInfo> = {
  Pirate: {
    title: "Pirate",
    minLevel: 0,
    reward: 0,
    maxShips: 3,
    higherThan: [],
  },
  Ensign: {
    title: "Ensign",
    minLevel: 3,
    reward: 500,
    maxShips: 5,
    higherThan: ["Pirate"],
  },
  Captain: {
    title: "Captain",
    minLevel: 7,
    reward: 1200,
    maxShips: 6,
    higherThan: ["Pirate", "Ensign"],
  },
  Major: {
    title: "Major",
    minLevel: 12,
    reward: 2000,
    maxShips: 7,
    higherThan: ["Pirate", "Ensign", "Captain"],
  },
  Colonel: {
    title: "Colonel",
    minLevel: 18,
    reward: 3000,
    maxShips: 8,
    higherThan: ["Pirate", "Ensign", "Captain", "Major"],
  },
  Admiral: {
    title: "Admiral",
    minLevel: 25,
    reward: 4000,
    maxShips: 10,
    higherThan: ["Pirate", "Ensign", "Captain", "Major", "Colonel"],
  },
  Baron: {
    title: "Baron",
    minLevel: 33,
    reward: 5000,
    maxShips: 11,
    higherThan: ["Pirate", "Ensign", "Captain", "Major", "Colonel", "Admiral"],
  },
  Count: {
    title: "Count",
    minLevel: 42,
    reward: 7500,
    maxShips: 12,
    higherThan: [
      "Pirate",
      "Ensign",
      "Captain",
      "Major",
      "Colonel",
      "Admiral",
      "Baron",
    ],
  },
  Marquis: {
    title: "Marquis",
    minLevel: 52,
    reward: 10000,
    maxShips: 13,
    higherThan: [
      "Pirate",
      "Ensign",
      "Captain",
      "Major",
      "Colonel",
      "Admiral",
      "Baron",
      "Count",
    ],
  },
  Duke: {
    title: "Duke",
    minLevel: 63,
    reward: 17500,
    maxShips: 15,
    higherThan: [
      "Pirate",
      "Ensign",
      "Captain",
      "Major",
      "Colonel",
      "Admiral",
      "Baron",
      "Count",
      "Marquis",
    ],
  },
}
