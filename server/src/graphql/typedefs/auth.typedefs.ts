import { gql } from "graphql-tag"

export const AuthTypeDefs = gql`
# Types
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type UserData {
    id: ID!
    email: String!
    username: String!
    createdAt: String!
  }

  type AuthResponse {
   token: String!
   data: UserData!
  }

  # Input Types
  input SignupInput {
   username: String!
   email: String!
   password: String!
  }

  input SigninInput {
   email: String!
   password: String!
  }

    # Add Query type
  type Query {
    me: User              # Current user query
    hello: String         # Simple test query
  }

  # Mutations
  type Mutation {
  signup(
   username: String!
   email: String!
   password: String!
  ): AuthResponse!

  signin(
    email: String!
    password: String!
  ): AuthResponse!
  }
`