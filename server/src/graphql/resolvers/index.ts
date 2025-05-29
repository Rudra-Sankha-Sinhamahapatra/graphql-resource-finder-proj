import { AuthResolver } from "./auth.resolvers";

export const resolvers = {
  Query: {
    ...AuthResolver.Query,
  },
  Mutation: {
    ...AuthResolver.Mutation,
  },
};
