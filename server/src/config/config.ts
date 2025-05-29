import dotenv from "dotenv/config";

export const config = {
jwtSecret: process.env.JWT_SECRET || "jwtSecret",
mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/graphql-apollo-project",
}