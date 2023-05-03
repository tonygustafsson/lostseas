import { gql } from "graphql-request"

export const CreateShip = gql`
  mutation CreateShip($name: String!, $type: String!) {
    ship: createShip(data: { name: $name, type: $type }) {
      id
      name
      type
    }
  }
`
