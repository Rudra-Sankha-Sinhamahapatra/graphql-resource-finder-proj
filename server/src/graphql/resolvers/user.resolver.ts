import { GraphQLError } from "graphql";
import UserModel from "../../db/models/userModel";
import type { Context } from "../../types";
import { AuthenticationError } from 'apollo-server-express';

export const userResolver = {
Query:{
 getUserDetails: async (_:any,__:any,context:Context) => {
    try {
        if(!context.user){
            throw new AuthenticationError("Unauthorized");
        }

        const user = await UserModel.findById(context.user.id).select('-password');;

        if(!user){
            throw new GraphQLError("User not found");
        }

        return user;
    } catch (error) {
        throw error;
    }
 }
}

}