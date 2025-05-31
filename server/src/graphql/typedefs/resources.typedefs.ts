import { gql } from "graphql-tag";

export const ResourceTypeDefs = gql`

  scalar DateTime
  
  # Types
  type Resource {
    id: ID!
    name: String!
    description: String!
    link: String!
    imageUrl: String!
    userId: ID!
    user: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Queries
  extend type Query {
    healthcheck: String!
    findAllResourcesByUserId: [Resource!]!
    findAllResourcesById(id: ID!): Resource!
  }

  # Mutations
  extend type Mutation {
    createResource(
      name: String!
      description: String!
      link: String!
      imageUrl: String!
    ): Resource!

    updateResource(
      id: ID!
      name: String!
      description: String!
      link: String!
      imageUrl: String!
    ): Resource!
  }
`;

