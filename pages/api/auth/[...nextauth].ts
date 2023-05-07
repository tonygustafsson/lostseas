import { compare } from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import client from "@/graphql/client"
import { GetAuthUser, GetFullUser } from "@/graphql/user"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const { user } = (await client.request(GetAuthUser, {
          username: credentials?.username,
        })) as { user: User }

        const isValid = await compare(
          credentials?.password || "",
          user?.password || ""
        )

        if (!user || !isValid) {
          throw new Error("Wrong credentials. Try again.")
        }

        return {
          id: user.id,
          email: credentials?.username, // Next Auth requires an email
        }
      },
      credentials: {
        username: {
          label: "Username",
          type: "username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { user } = (await client.request(GetFullUser, {
        username: session?.user?.email, // Next Auth requires an email
      })) as { user: User }

      return { ...session, user: { ...session.user, ...user } }
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
})
