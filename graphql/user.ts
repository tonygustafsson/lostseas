import { gql } from "graphql-request"

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`

export const GetFullUser = gql`
  query GetFullUser($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      name
      email
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
  mutation CreateNextUserByEmail(
    $name: String!
    $email: String!
    $password: String!
    $characterName: String!
    $characterAge: Int!
  ) {
    user: createNextUser(
      data: {
        name: $name
        email: $email
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
  mutation UpdateNextUserById(
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
