import React from 'react';
import dotenv from "dotenv";
import { connectDB } from "../../util/database";
const { MongodbClient, ServerApiVersion } = require('mongodb');

dotenv.config();

export default async function ActionChipMain() {
    const client = await connectDB;
    const db = client.db("pbs");
    let result = await db.collection("actionchip").find().toArray();
    console.log(result);

    return (
        <div>
        {result.map((item, index) => (
            <React.Fragment key={index}>
            {JSON.stringify(item)}
            </React.Fragment>
        ))}
        </div>
    );
}

