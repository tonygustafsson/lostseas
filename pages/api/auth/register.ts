import { CreateNextUserByEmail } from "@/graphql/user";
import { hash } from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(process.env.HYGRAPH_ENDPOINT || "", {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});

export default async function handler(req: any, res: any) {
  const { newUser } = (await client.request(CreateNextUserByEmail, {
    name: req.body.name,
    email: req.body.email,
    password: await hash(req.body.password || "", 12),
  })) as any;

  res.status(200).json({ id: newUser.id });
}
