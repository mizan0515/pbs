import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const url: string = process.env.MONGO_URI as string;

let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
      global._mongo = new MongoClient(url).connect();
    }
    connectDB = global._mongo;
  } else {
    connectDB = new MongoClient(url).connect();
  }

export { connectDB };

