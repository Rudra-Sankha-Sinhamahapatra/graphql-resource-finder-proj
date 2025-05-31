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
export const GET_ALL_RESOURCES = gql`
  query GetAllResources {
    findAllResources {
      id
      name
      description
      link
      imageUrl
      createdAt
      updatedAt
      user {
        id
        username
        email
      }
    }
  }
`