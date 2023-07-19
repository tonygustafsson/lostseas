export type TitleInfo = {
  title: Title
  reward: number
  maxShips: number
  higherThan: Title[]
}

export const TITLE_INFO: Record<Title, TitleInfo> = {
  Pirate: {
    title: "Pirate",
    reward: 0,
    maxShips: 3,
    higherThan: [],
  },
  Ensign: {
    title: "Ensign",
    reward: 1000,
    maxShips: 5,
    higherThan: ["Pirate"],
  },
  Captain: {
    title: "Captain",
    reward: 2500,
    maxShips: 6,
    higherThan: ["Pirate", "Ensign"],
  },
  Major: {
    title: "Major",
    reward: 4000,
    maxShips: 7,
    higherThan: ["Pirate", "Ensign", "Captain"],
  },
  Colonel: {
    title: "Colonel",
    reward: 6000,
    maxShips: 8,
    higherThan: ["Pirate", "Ensign", "Captain", "Major"],
  },
  Admiral: {
    title: "Admiral",
    reward: 8000,
    maxShips: 10,
    higherThan: ["Pirate", "Ensign", "Captain", "Major", "Colonel"],
  },
  Baron: {
    title: "Baron",
    reward: 10000,
    maxShips: 11,
    higherThan: ["Pirate", "Ensign", "Captain", "Major", "Colonel", "Admiral"],
  },
  Count: {
    title: "Count",
    reward: 15000,
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
    reward: 20000,
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
    reward: 35000,
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
