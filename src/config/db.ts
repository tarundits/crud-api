// config/dbConnection.ts

import { Db, Collection, MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017'; // Change this to your MongoDB URI
const dbName = 'crud-api'; // Change this to your desired database name

let db: Db;
let productsCollection: Collection;

const getClient = async () => {
  try {
    const client = await MongoClient.connect(url);
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

const initializeDb = async () => {
  if (!db) {
    const client = await getClient();
    db = client.db(dbName);
    productsCollection = db.collection('products');
  }
};

const getProductsCollection = () => {
  initializeDb();
  if (!productsCollection) {
    throw new Error('Database not initialized. Call initializeDb first.');
  }
  return productsCollection;
};

export {
  initializeDb,
  getProductsCollection,
  getClient
}