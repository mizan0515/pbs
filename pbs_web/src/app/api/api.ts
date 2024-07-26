import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { games?: mongoDB.Collection } = {}




export async function connectToDatabase () {
    dotenv.config();
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI as string);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    
    const gamesCollection: mongoDB.Collection = db.collection("pbs");
    
    collections.games = gamesCollection;
        
            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
    }


