const base = {
  acceptedDay: 120,
  pitch: "A small favour, for a fair price.",
}

export const deliveryQuest: Quest = {
  ...base,
  id: "quest-delivery",
  giverId: "st-georges-tavern-mavis-cartwright",
  type: "delivery",
  parcel: "a sealed letter",
  targetNpcId: "kingston-market-abraham-parry",
  reward: { gold: 250 },
}

export const procurementQuest: Quest = {
  ...base,
  id: "quest-procurement",
  giverId: "nassau-market-eliza-knowles",
  type: "procurement",
  item: "rum",
  quantity: 12,
  reward: { gold: 400 },
}

export const messageChainQuest: Quest = {
  ...base,
  id: "quest-chain",
  giverId: "st-georges-governor-randolph-ellis",
  type: "messageChain",
  stepNpcIds: [
    "nassau-tavern-hugh-palmer",
    "kingston-tavern-ursula-cole",
    "bridgetown-tavern-miles-barnes",
  ],
  step: 1,
  reward: { gold: 600 },
}

export const findPersonQuest: Quest = {
  ...base,
  id: "quest-find",
  giverId: "bridgetown-governor-eleanor-richardson",
  type: "findPerson",
  personName: "Jonas Whitlock",
  nation: "England",
  hiddenTown: "nassau",
  ruledOut: ["kingston", "bridgetown"],
  reward: { gold: 500 },
}

export const findPersonFoundQuest: Quest = {
  ...findPersonQuest,
  id: "quest-found",
  ruledOut: undefined,
  found: true,
}

export const itemRewardQuest: Quest = {
  ...deliveryQuest,
  id: "quest-item-reward",
  reward: { gold: 150, item: { name: "tea", quantity: 5 } },
}

export const quests: Record<string, Quest> = Object.fromEntries(
  [deliveryQuest, procurementQuest, messageChainQuest, findPersonQuest].map(
    (quest) => [quest.id, quest]
  )
)
