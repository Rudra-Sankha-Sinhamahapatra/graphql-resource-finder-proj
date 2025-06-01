import { gql } from "@apollo/client";


export const CREATE_RESOURCE = gql`
  mutation CreateResource($name: String!, $description: String!, $link: String!, $imageUrl: String!) {
    createResource(name: $name, description: $description, link: $link, imageUrl: $imageUrl) {
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
`;

export const GET_USER_RESOURCES = gql`
  query FindAllResourcesByUserId {
    findAllResourcesByUserId {
      id
      name
      description
      link
      imageUrl
      createdAt
      updatedAt
      userId
      user {
        id
        username
        email
      }
    }
  }
`;