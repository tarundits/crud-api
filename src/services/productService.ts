import { BaseProduct, Product } from "../interfaces/product.interface";
import { Products } from "../interfaces/products.interface";
import { getProductsCollection } from "../config/db";
import ProductMdl from "../models/product";
import { ObjectId } from "mongodb";

const findAll = async () => {
  const productsCollection = getProductsCollection();
  const products = await productsCollection.find({}).toArray();
  return products;
}

const find = async (id: string) => {
  const productsCollection = getProductsCollection();
  const query = { _id: new ObjectId(id) };
  const product = await productsCollection.findOne(query);

  return product;
};

const create = async (newItem: BaseProduct) => {
    const productsCollection = getProductsCollection();
    const newProduct = newItem as ProductMdl;
    const result = await productsCollection.insertOne(newProduct);
  
    return result;
};

const update = async (id: string, itemUpdate: BaseProduct) => {
    const productsCollection = getProductsCollection();
    const query = { _id: new ObjectId(id) };
    const result = await productsCollection.updateOne(query, { $set: itemUpdate });

    return result;
};

const remove = async (id: string) => {
    const productsCollection = getProductsCollection();
    const query = { _id: new ObjectId(id) };
    const result = await productsCollection.deleteOne(query);

    return result;
};

export {
  findAll,
  find,
  create,
  update,
  remove
}