import mongoose from "mongoose";
import { logger } from "./logger";

async function connectMongoDB(): Promise<void> {
  const mongoUri: string = `${
    process.env.MONGO_URI || "mongodb://localhost:27017/ABE_Aflevering2"
  }`;

  await mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", (e) => {
    logger.error(e);
  });

  mongoose.connection.once("open", () => {
    logger.info(`MongoDB successfully connected to ${mongoUri}`);
  });
}

async function disconnectMongoDB() {
  mongoose.disconnect();
}

export { connectMongoDB, disconnectMongoDB };
