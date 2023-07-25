import express, { Request, Response } from "express";
import * as ProductService from "../services/productService";
import { BaseProduct, Product } from "../interfaces/product.interface";

function responseInterceptor(res: Response, status: number, data = {}, error = {}) {
  return res.status(status).json({ data });
}

// To fetch all the products.
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const items = await ProductService.findAll();

    return responseInterceptor(res, 200, { items }, {});
  } catch (e: any) {
    return responseInterceptor(res, 500, {}, e.message);
  }
};

// To get the product details by id.
const getProductById = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const item = await ProductService.find(id);

    if (item) {
        return responseInterceptor(res, 200, { item }, {});
    }
    
  } catch (e: any) {
    return responseInterceptor(res, 500, {}, e.message);
  }
};

// To create new product.
const addNewProduct = async (req: Request, res: Response) => {
  try {
    const item: BaseProduct = req.body;

    const newItem = await ProductService.create(item);
    return responseInterceptor(res, 201, newItem);
  } catch (e: any) {
    return responseInterceptor(res, 500, {}, e.message);
  }
};

// To update the product by id.
const editProduct = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const itemUpdate = req.body;

    const existingItem = await ProductService.find(id);

    if (existingItem) {
      const updatedItem = await ProductService.update(id, itemUpdate);
      return responseInterceptor(res, 201, { updatedItem });
    }

    const newItem = await ProductService.create(itemUpdate);

    return responseInterceptor(res, 201, { newItem });
  } catch (e: any) {
    return responseInterceptor(res, 500, {}, e.message);
  }
};

// To delete the product.
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const result = await ProductService.remove(id);

    if (result && result.deletedCount) {
      return responseInterceptor(res, 202, `Successfully removed product with id ${id}`);
    } else if (!result) {
      return responseInterceptor(res, 400, `Failed to remove product with id ${id}`);
    } else if (!result.deletedCount) {
      return responseInterceptor(res, 404, `Product with id ${id} does not exist`);
    }
  } catch (e: any) {
    return responseInterceptor(res, 500, {}, e.message);
  }
};

export {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct,
};
