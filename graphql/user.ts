import { gql } from "graphql-request"

export const GetAuthUser = gql`
  query GetAuthUser($username: String!) {
    user: nextUser(where: { username: $username }, stage: DRAFT) {
      id
      password
    }
  }
`

export const GetFullUser = gql`
  query GetFullUser($username: String!) {
    user: nextUser(where: { username: $username }, stage: DRAFT) {
      id
      name
      username
      characterName
      characterAge
      ships(last: 100) {
        id
        name
        type
      }
    }
  }
`

export const CreateNextUser = gql`
  mutation CreateNextUser(
    $name: String!
    $username: String!
    $password: String!
    $characterName: String!
    $characterAge: Int!
  ) {
    user: createNextUser(
      data: {
        name: $name
        username: $username
        password: $password
        characterName: $characterName
        characterAge: $characterAge
      }
    ) {
      id
    }
  }
`

export const UpdateNextUser = gql`
  mutation UpdateNextUser(
    $id: ID!
    $name: String!
    $characterName: String!
    $characterAge: Int!
  ) {
    user: updateNextUser(
      where: { id: $id }
      data: {
        name: $name
        characterName: $characterName
        characterAge: $characterAge
      }
    ) {
      id
    }
  }
`
