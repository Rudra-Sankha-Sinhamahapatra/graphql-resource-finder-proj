import { GraphQLError } from "graphql";
import type { SigninArgs, SignupArgs } from "../../interfaces";
import { logger, token as passwordToken, password as passwordUtils } from "../../utils";
import { authValidation } from "../../validations/auth";
import UserModel from "../../db/models/userModel";
import type { Context } from "../../types";
import { checkAuth } from "../../context";

export const AuthResolver = {
    Query: {
        hello: () => "Hello from GraphQL!",
    me: (_: any, __: any, context: Context) => {
      const user = checkAuth(context);
      return user;
    }
    },
    Mutation: {
        signup: async (_:any,args: SignupArgs) => {
            try {
                const { email,username,password } = args;

                try {
                    authValidation.signup.parse({email,username,password})
                } catch (error:any) {
                    logger.error("Validation failed during signup",error);
                    throw new GraphQLError("Validation failed", {
                        extensions: {
                            code:"BAD_USER_INPUT",
                            fieldErrors: [
                                {field: error.field || "general",message:error.message}
                            ],
                        },
                    });
                }

             const existingUser = await UserModel.findOne({ email });
             if(existingUser) {
                throw new GraphQLError("Email is already in use", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        fieldErrors: [
                            { field:"email", message: "Email is already in use"}
                        ],
                    },
                });
             }

             const existingUsername = await UserModel.findOne({ username });
             if(existingUser) {
                throw new GraphQLError("Username is already taken", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        fieldErrors: [
                            { field:"username", message: "Username is already taken"}
                        ],
                    },
                });
             }

             const hashedPassword = await passwordUtils.hash(password);
             const user = await UserModel.create({
                username,
                email,
                password: hashedPassword,
             });

             const token = await passwordToken.generate(user.id);

             return {
                data: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    createdAt: user.createdAt
                },
                token
             };

            } catch (error) {
                logger.error("Error during user signup: ",error);

                if(error instanceof GraphQLError) {
                    throw error;
                }

                throw new GraphQLError("Internal Server Error", {
                    extensions: { code: "INTERNAL_SERVER_ERROR" },
                });
            }
        },

        signin: async(_:any, args: SigninArgs) => {
            try {
                const { email,password } = args;

                try {
                    authValidation.signin.parse({email,password});
                } catch (error:any) {
                    throw new GraphQLError("Validation failed", {
                        extensions: {
                            code:"BAD_USER_INPUT",
                            fieldErrors: [
                                {field: error.field || "general",message:error.message}
                            ],
                        },
                    });
                }

                const existingUser = await UserModel.findOne({ email });
                if(!existingUser) {
                   throw new GraphQLError("User doesn't exists", {
                       extensions: {
                           code: "BAD_USER_INPUT",
                           fieldErrors: [
                               { field:"email", message: "User doesn't exists"}
                           ],
                       },
                   });
                }

                const comparePassword = await passwordUtils.compare(password,existingUser.password);
                if(!comparePassword) {
                    throw new GraphQLError("Password doesn't match", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            fieldErrors: [
                                { field:"password", message: "Password doesn't match"}
                            ],
                        },
                    });
                }

                const token = await passwordToken.generate(existingUser.id);

                return {
                    data: {
                        id: existingUser.id,
                        email: existingUser.email,
                        username: existingUser.username,
                        createdAt: existingUser.createdAt
                    },
                    token
                }
            } catch (error) {
                logger.error("Error during user signup: ",error);

                if(error instanceof GraphQLError) {
                    throw error;
                }

                throw new GraphQLError("Internal Server Error", {
                    extensions: { code: "INTERNAL_SERVER_ERROR" },
                });
            }
        },

    }
}