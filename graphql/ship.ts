import { gql } from "graphql-request"

export const CreateShip = gql`
  mutation CreateShip($name: String!, $type: ShipType!) {
    ship: createShip(data: { name: $name, type: $type }) {
      id
      name
      type
    }
  }
`
