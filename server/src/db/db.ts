import mongoose from "mongoose";
import { config } from "../config/config";

const MONGODB_URI = config.mongoURI;

if(!MONGODB_URI) {
    console.error("MONGO URI is not defined");
    process.exit(1);
}

export const mongoConnect = ():void => {
 mongoose.connect(MONGODB_URI).then(() => {
  console.log("DATABASE Connected");
 }).catch((error) => {
    console.error("Error connecting to Database ",error);
 });
}
