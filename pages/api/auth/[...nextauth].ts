import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import client from "@/graphql/client";
import { GetFullUser, GetUserByEmail } from "@/graphql/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const { user } = (await client.request(GetUserByEmail, {
          email: credentials?.email,
        })) as any;

        const isValid = await compare(
          credentials?.password || "",
          user?.password || ""
        );

        if (!user || !isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return {
          id: user.id,
          username: credentials?.email,
          email: credentials?.email,
        };
      },
      credentials: {
        email: {
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
        email: session?.user?.email,
      })) as any;

      return { ...session, user: { ...session.user, ...user } };
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
});
