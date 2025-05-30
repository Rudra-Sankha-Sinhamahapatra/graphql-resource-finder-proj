import { AuthResolver } from "./auth.resolvers";
import { ResourceResolver } from "./resources.resolver";

export const resolvers = {
  Resource:{
   ...ResourceResolver.Resource
  },
  Query: {
    ...AuthResolver.Query,
    ...ResourceResolver.Query,
  },
  Mutation: {
    ...AuthResolver.Mutation,
    ...ResourceResolver.Mutation,
  },
};
