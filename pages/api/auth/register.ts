import { CreateNextUserByEmail } from "@/graphql/user";
import { hash } from "bcrypt";
import client from "@/graphql/client";

export default async function handler(req: any, res: any) {
  const { newUser } = (await client.request(CreateNextUserByEmail, {
    name: req.body.name,
    email: req.body.email,
    password: await hash(req.body.password || "", 12),
  })) as any;

  res.status(200).json({ id: newUser.id });
}
