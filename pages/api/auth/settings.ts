import { UpdateNextUser } from "@/graphql/user";
import client from "@/graphql/client";

export default async function handler(req: any, res: any) {
  const requestJson = {
    id: req.body.id,
    name: req.body.name,
    characterName: req.body.characterName,
    characterAge: parseInt(req.body.characterAge),
  };

  const { updateUser } = (await client.request(
    UpdateNextUser,
    requestJson
  )) as any;

  res.status(200).json({ id: updateUser.id });
}
