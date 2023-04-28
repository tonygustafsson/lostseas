import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(process.env.HYGRAPH_ENDPOINT || "", {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      authorize: async (credentials) => {
        const { user } = (await client.request(GetUserByEmail, {
          email: credentials?.email,
        })) as any;

        if (!user) {
          const { newUser } = (await client.request(CreateNextUserByEmail, {
            email: credentials?.email,
            password: await hash(credentials?.password || "", 12),
          })) as any;

          return {
            id: newUser.id,
            username: credentials?.email,
            email: credentials?.email,
          };
        }

        const isValid = await compare(
          credentials?.password || "",
          user.password
        );

        if (!isValid) {
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
