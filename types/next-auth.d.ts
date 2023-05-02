import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      characterName: string
      characterAge: number
    } & DefaultSession["user"]
  }
}
