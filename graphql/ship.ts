import { gql } from "graphql-request"

const USER_SHIP_RELATION_ID = process.env.HYGRAPH_USER_SHIP_RELATION_ID // TODO: Get dynamically?

export const CreateShip = gql`
  mutation CreateShip($name: String!, $type: ShipType!, $userId: ID!) {
    ship: createShip(data: { name: $name, type: $type, ${USER_SHIP_RELATION_ID}: { connect: { id: $userId } } }) {
      id
      name
      type
    }
  }
`

export const DeleteShip = gql`
  mutation DeleteShip($id: ID!) {
    deleteShip(where: { id: $id }) {
      id
    }
  }
`
