import { AuthResolver } from "./auth.resolvers";
import { ResourceResolver } from "./resources.resolver";
import { userResolver } from "./user.resolver";

export const resolvers = {
  Resource:{
   ...ResourceResolver.Resource
  },
  Query: {
    ...AuthResolver.Query,
    ...ResourceResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...AuthResolver.Mutation,
    ...ResourceResolver.Mutation,
  },
};
