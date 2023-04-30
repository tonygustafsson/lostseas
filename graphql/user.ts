import { gql } from "graphql-request";

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

export const GetFullUser = gql`
  query GetFullUser($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      name
      email
    }
  }
`;

export const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail(
    $name: String!
    $email: String!
    $password: String!
  ) {
    newUser: createNextUser(
      data: { name: $name, email: $email, password: $password }
    ) {
      id
    }
  }
`;
