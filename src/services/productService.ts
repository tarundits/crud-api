import { BaseProduct } from "../interfaces/product.interface";
import { Products } from "../interfaces/products.interface";
import Product from "../models/productModel";
import ProductMdl from "../models/product";
import { ObjectId } from "mongodb";

const findAll = async () => {
  const products = await Product.find({});
  return products;
}


const find = async (id: string) => {
  const product = Product.findById(id);

  return product;
};

const create = async (newItem: BaseProduct) => {
    const newProduct = new Product(newItem);
    await newProduct.save();

    return newProduct;
};

const update = async (id: string, itemUpdate: BaseProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, itemUpdate, { new: true });

  return updatedProduct;
};

const remove = async (id: string) => {
    const result = await Product.deleteOne({ _id: id });

    return result;
};

export {
  findAll,
  find,
  create,
  update,
  remove
}