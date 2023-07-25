import { BaseProduct, Product } from "../interfaces/product.interface";
import { Products } from "../interfaces/products.interface";
import getDb from "../config/db";
import ProductMdl from "../models/product";
import { ObjectId } from "mongodb";

const findAll = async () => {
  const db = await getDb();
  const products = await db.collection("products").find({}).toArray();
  return products;
}

const find = async (id: string) => {
  const db = await getDb();
  const query = { _id: new ObjectId(id) };
  const product = await db.collection("products").findOne(query);

  return product;
};

const create = async (newItem: BaseProduct) => {
    const db = await getDb();
    const newProduct = newItem as ProductMdl;
    const result = await db.collection("products").insertOne(newProduct);
  
    return result;
};

const update = async (id: string, itemUpdate: BaseProduct) => {
    const db = await getDb();
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("products").updateOne(query, { $set: itemUpdate });

    return result;
};

const remove = async (id: string) => {
    const db = await getDb();
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("products").deleteOne(query);

    return result;
};

export {
  findAll,
  find,
  create,
  update,
  remove
}