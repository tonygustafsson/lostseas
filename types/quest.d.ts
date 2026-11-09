type QuestType = "delivery" | "procurement" | "messageChain" | "findPerson"

type QuestReward = {
  gold: number
  item?: { name: keyof Inventory; quantity: number }
}

type Quest = {
  id: string
  giverId: string
  acceptedDay: number
  pitch: string
  reward: QuestReward
} & (
  | { type: "delivery"; parcel: string; targetNpcId: string }
  | { type: "procurement"; item: keyof Inventory; quantity: number }
  | { type: "messageChain"; stepNpcIds: string[]; step: number }
  | {
      type: "findPerson"
      personName: string
      nation: Nation
      hiddenTown: Town
      ruledOut?: Town[]
      found?: boolean
    }
)
