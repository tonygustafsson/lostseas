import {
  Anchor,
  BookMarked,
  Coins,
  Crown,
  Flag,
  Hammer,
  KeyRound,
  Landmark,
  type LucideIcon,
  MessagesSquare,
  Package,
  Sailboat,
  Swords,
  Users,
} from "lucide-react"

export type GuideChapterId =
  | "welcome"
  | "first-voyage"
  | "towns"
  | "trade"
  | "ships"
  | "crew"
  | "sailing"
  | "battles"
  | "nations"
  | "gold"
  | "townsfolk"
  | "account"
  | "records"

export type GuideChapterInfo = {
  id: GuideChapterId
  title: string
  icon: LucideIcon
}

export const GUIDE_GROUPS: { title: string; chapters: GuideChapterInfo[] }[] = [
  {
    title: "Playing the game",
    chapters: [
      { id: "welcome", title: "Welcome aboard", icon: Anchor },
      { id: "first-voyage", title: "Your first voyage", icon: Flag },
      { id: "towns", title: "Towns", icon: Landmark },
      { id: "trade", title: "Trade and supplies", icon: Package },
      { id: "ships", title: "Ships and cannons", icon: Hammer },
      { id: "crew", title: "Crew", icon: Users },
      { id: "sailing", title: "Sailing", icon: Sailboat },
      { id: "battles", title: "Sea battles", icon: Swords },
      { id: "nations", title: "Nations and titles", icon: Crown },
      { id: "gold", title: "Gold and banking", icon: Coins },
      { id: "townsfolk", title: "Townsfolk and quests", icon: MessagesSquare },
    ],
  },
  {
    title: "Using the app",
    chapters: [
      { id: "account", title: "Your account", icon: KeyRound },
      { id: "records", title: "Your records", icon: BookMarked },
    ],
  },
]

export const GUIDE_CHAPTERS = GUIDE_GROUPS.flatMap(({ chapters }) => chapters)

export const getGuideChapter = (id: GuideChapterId) =>
  GUIDE_CHAPTERS.find((chapter) => chapter.id === id)!
