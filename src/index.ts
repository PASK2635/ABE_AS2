import { connectMongoDB } from "./app/mongoose";
import { runServer } from "./app/apolloExpress";

connectMongoDB();
runServer();
