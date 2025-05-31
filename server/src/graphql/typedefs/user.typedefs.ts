

export const userTypeDefs = `
 scalar DateTime

  type User {
   id: ID!
   username: String!
   email: String!
   createdAt: DateTime!
   updatedAt: DateTime!
  }

  type Query {
   getUserDetails: User
  }
`