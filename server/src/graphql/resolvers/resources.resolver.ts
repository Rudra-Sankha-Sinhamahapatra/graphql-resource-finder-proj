import { GraphQLError } from "graphql";
import type { CreateResourceArgs, ResourceByIdArgs, UpdateResourceArgs } from "../../interfaces";
import { logger } from "../../utils";
import { resourceValidation } from "../../validations/resource";
import ResourceModel from "../../db/models/resourceModel";
import { checkAuth } from "../../context";
import type { Context } from "../../types";
import UserModel from "../../db/models/userModel";

export const ResourceResolver = {
  Resource: {
    user: async (parent: { userId: string }) => {
      try {        
        const user = await UserModel.findById(parent.userId);
        
        if (!user) {
            console.log('No user found');
            return null;
        }
        
        const formattedUser = {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        console.log('Returning formatted user:', formattedUser);
        
        return formattedUser;
    } catch (error) {
        console.error("Error in user resolver:", error);
        logger.error("Error fetching user in Resource resolver:", error);
        return null;
    }
  }
  },
  Query: {
    healthcheck: () => "Health OK",
    findAllResourcesByUserId: async (
      _:any,
      __:any,
      context: Context
    ) => {
      try {
        const user = checkAuth(context);
        if (!user) {
          throw new GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }


        try {
          const existingUser = await UserModel.find({id:user.id})

          if(!existingUser) {
            logger.error("User Doesn;t Exists");
    
            throw new GraphQLError("User Doesn't Exists", {
              extensions: { code: "NOT_FOUND" },
            });
          }
        } catch (error) {
          logger.error("User Doesn;t Exists: ", error);

          if (error instanceof GraphQLError) {
            throw error;
          }
  
          throw new GraphQLError("User Doesn't Exists", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        const resources = await ResourceModel.find({userId: user.id});

        return resources
      } catch (error) {
        logger.error("Error during Resource finding by UserId : ", error);

        if (error instanceof GraphQLError) {
          throw error;
        }

        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    findAllResourcesById: async (
      _:any,
      args: ResourceByIdArgs,
      context: Context
    ) => {
      try {
        const user = checkAuth(context);
        if (!user) {
          throw new GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }

        const {id} = args;

        try {
          resourceValidation.ResourceById.parse({
            id
          })
        } catch (error:any) {
          logger.error("Validation failed during resource finding by id ", error);
          throw new GraphQLError("Validation failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              fieldErrors: [
                { field: error.field || "general", message: error.message },
              ],
            },
          });
        }

        const resource = await ResourceModel.findById(id);

        if (!resource) {
          throw new GraphQLError("Resource not found", {
              extensions: { code: "NOT_FOUND" },
          });
      }

        return resource
      } catch (error) {
        logger.error("Error during Resource finding by UserId : ", error);

        if (error instanceof GraphQLError) {
          throw error;
        }

        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    findAllResources: async (
      _:any,
      __:any,
      context: Context
    ) => {
      try {
        const user = checkAuth(context);
        if(!user) {
          throw new GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
  
        const resources = await ResourceModel.find({});
        return resources;
      } catch (error) {
        logger.error("Error during Resources fetching: ", error);

        if (error instanceof GraphQLError) {
          throw error;
        }

        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
  Mutation: {
    createResource: async (
      _: any,
      args: CreateResourceArgs,
      context: Context
    ) => {
      try {
        const user = checkAuth(context);
        if (!user) {
          throw new GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
        const { name, description, link, imageUrl } = args;

        try {
          resourceValidation.create.parse({
            name,
            description,
            link,
            imageUrl,
          });
        } catch (error: any) {
          logger.error("Validation failed during resource creation ", error);
          throw new GraphQLError("Validation failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              fieldErrors: [
                { field: error.field || "general", message: error.message },
              ],
            },
          });
        }

        const resource = await ResourceModel.create({
          name,
          description,
          link,
          imageUrl,
          userId: user.id,
        });

        return resource;
      } catch (error) {
        logger.error("Error during Resource Creation: ", error);

        if (error instanceof GraphQLError) {
          throw error;
        }

        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    updateResource: async (
      _:any,
      args: UpdateResourceArgs,
      context: Context
    ) => {
      try {
      const user = checkAuth(context);
      if(!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { id,name,description,link,imageUrl } = args;

      try {
        resourceValidation.update.parse({
          id,
          name,
          description,
          link,
          imageUrl
        });
      } catch (error:any) {
        logger.error("Validation failed during resource updation ", error);
        throw new GraphQLError("Validation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            fieldErrors: [
              { field: error.field || "general", message: error.message },
            ],
          },
        });
      }

      const findResource = await ResourceModel.findById(id);

      if(!findResource) {
        throw new GraphQLError("Resource not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (findResource.userId.toString() !== user.id) {
        throw new GraphQLError("Not authorized to update this resource", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const updatedResource = await ResourceModel.findByIdAndUpdate(
        id,
        {
          name,
          description,
          link,
          imageUrl,
          updatedAt: new Date().toISOString(),
        },
        { new: true } 
      );

      return updatedResource;
    }
    catch (error) {
      logger.error("Error during Resource Updation: ", error);

        if (error instanceof GraphQLError) {
          throw error;
        }

        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
    }
  }
  },
};
