import { gql } from "graphql-request"

export const GetUserShips = gql`
  query GetUserShips($userId: String!) {
    ships: ships(where: { userId: $userId }, stage: DRAFT) {
      id
      name
      type
    }
  }
`

export const CreateShip = gql`
  mutation CreateShip($name: String!, $type: ShipType!, $userId: String!) {
    ship: createShip(data: { name: $name, type: $type, userId: $userId }) {
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
