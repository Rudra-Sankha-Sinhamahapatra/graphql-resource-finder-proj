import { gql } from "@apollo/client";


export const GET_USER_DETAILS = gql`
  query GetUserDetails {
    getUserDetails {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`