import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import { logger } from "./utils/logger";
import type { Context } from "./types/context";
import { ApolloServer } from "@apollo/server";
import express from "express";
import type { Application } from "express";
import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import { mongoConnect as connectDB } from "./db/db";
import { createContext } from "./context";
import { config } from "./config/config";

async function Main() {
  const app: Application = express();

  await connectDB();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  await server.start();


  app.get("/api/health", (req, res) => {
    logger.info("Health check pinged");
    res.status(200).json({
      success: true,
      message: "Server is up and running 🚀",
    });
  });

  app.use(
    "/graphql",
    expressMiddleware<Context>(server, {
      context: createContext
    })
  );

  const PORT = config.PORT || 4000;
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT} 🚀`);
  });
}

Main().catch((error) => {
  logger.error('Server startup error:', error);
  process.exit(1);
});