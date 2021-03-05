import express from "express";
import errorhandler from "errorhandler";
import http from "http";
import cookieParser from "cookie-parser";
import {
  ApolloServer,
  ApolloServerExpressConfig,
  ServerRegistration,
} from "apollo-server-express";
import { createTerminus } from "@godaddy/terminus";
import { disconnectMongoDB } from "./mongoose";
import { schema } from "../graphql/schema";
import { MongooseDataloaderFactory } from "graphql-dataloader-mongoose";
import { logger } from "./logger";

function runServer() {
  const app = express();
  const port = process.env.PORT;

  if (process.env.NODE_ENV === "development") {
    app.use(errorhandler());
  }

  app.use(cookieParser());

  applyApollo(app);

  const server = http.createServer(app);

  const cleanupOptions = {
    onSignal,
    onShutdown,
    timeout: 10000,
    signals: ["SIGINT", "SIGTERM"],
  };

  createTerminus(server, cleanupOptions);

  server.listen(port, () => {
    logger.info(`express server is listening port ${port}`);
  });
}

function applyApollo(app: any) {
  const apolloConfig: ApolloServerExpressConfig = {
    schema: schema,
    context: async (ctx: any) => {
      const dataloaderFactory = new MongooseDataloaderFactory();
      return { ...ctx, dataloaderFactory };
    },
    formatError: (error: any) => {
      logger.error(`[Graphql ERROR] ${error}`);
      return error;
    },
  };

  const apolloRegistration: ServerRegistration = {
    app,
    path: "/graphql",
    cors: true,
    bodyParserConfig: true,
  };

  const apollo = new ApolloServer(apolloConfig);
  apollo.applyMiddleware(apolloRegistration);
}

async function onSignal() {
  logger.info("server is starting cleanup");
  return Promise.all([disconnectMongoDB()]);
}

async function onShutdown() {
  logger.info("cleanup finished, server is shutting down");
}

export { runServer };
