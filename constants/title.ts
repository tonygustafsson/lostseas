export const TITLE_INFO: Record<
  Title,
  { title: Title; reward: number; maxShips: number }
> = {
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

export const getTitleInfoByScore = (score = 0) => {
  let titleInfo = TITLE_INFO.Pirate

  if (score >= 10 && score < 20) {
    titleInfo = TITLE_INFO.Ensign
  }

  if (score >= 20 && score < 30) {
    titleInfo = TITLE_INFO.Captain
  }

  if (score >= 30 && score < 40) {
    titleInfo = TITLE_INFO.Major
  }

  if (score >= 40 && score < 50) {
    titleInfo = TITLE_INFO.Colonel
  }

  if (score >= 50 && score < 65) {
    titleInfo = TITLE_INFO.Admiral
  }

  if (score >= 65 && score < 80) {
    titleInfo = TITLE_INFO.Baron
  }

  if (score >= 80 && score < 100) {
    titleInfo = TITLE_INFO.Count
  }

  if (score >= 100 && score < 120) {
    titleInfo = TITLE_INFO.Marquis
  }

  if (score >= 120) {
    titleInfo = TITLE_INFO.Duke
  }

  return titleInfo
}
