const { MongodbClient, ServerApiVersion } = require('mongodb');
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB(){

const dbClient = 
    await MongoClient.connect(process.env.MONGO_URI, {useNewUrlParser: true});
    const db = dbClient.db("pbs")
}

