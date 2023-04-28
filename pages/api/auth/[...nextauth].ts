import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      authorize: async (credentials) => {
        const user = { id: 1, name: "Jamie" };
        return null;
      },
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jamie@hygraph.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
    }),
  ],
});
