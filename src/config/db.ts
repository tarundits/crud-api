// config/db.ts

import { MongoClient, MongoClientOptions } from 'mongodb';

const url = 'mongodb://localhost:27017'; // Change this to your MongoDB URI
const dbName = 'crud-api'; // Change this to your desired database name

const getClient = async () => {
  try {
    const client = await MongoClient.connect(url);
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

const getDb = async () => {
  const client = await getClient();
  return client.db(dbName);
};

export default getDb;