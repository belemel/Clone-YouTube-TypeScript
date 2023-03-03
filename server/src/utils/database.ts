import mongoose from "mongoose";
import logger from "./logger"

//const DB_CONNECTION_STRING = 
  //process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/project-typescript";

let VAR: string;
VAR = "mongodb+srv://lukasbelemel:542443338*@cluster0.fhqlgm0.mongodb.net/?retryWrites=true&w=majority"
  
export async function connectionToDatabase() {
    try {
        await mongoose.connect(VAR); 
        logger.info("Connect to database"); 
    } catch (e) {
        logger.error(e, "Failed to connect to database.")
        process.exit(1);
    }
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close(); 

    logger.info("Disconnect from database");

    return;
} 

