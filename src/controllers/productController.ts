import express, { Request, Response } from "express";
import * as ProductService from "../services/productService";
import { BaseProduct, Product } from "../interfaces/product.interface";

// To fetch all the products.
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const items = await ProductService.findAll();
    
        res.status(200).send(items);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

// To get the product details by id.
const getProductById = async (req: Request, res: Response) => {
    const id = req?.params?.id;
  
    try {
        const item = await ProductService.find(id);
  
        if (item) {
            return res.status(200).send(item);
        }
  
        res.status(404).send("item not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

// To create new product.
const addNewProduct = async (req: Request, res: Response) => {
    try {
        const item: BaseProduct = req.body;
    
        const newItem = await ProductService.create(item);
    
        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

// To update the product by id.
const editProduct = async (req: Request, res: Response) => {
    const id = req?.params?.id;
  
    try {
        const itemUpdate = req.body;
    
        const existingItem = await ProductService.find(id);
    
        if (existingItem) {
            const updatedItem = await ProductService.update(id, itemUpdate);
            return res.status(200).json(updatedItem);
        }
    
        const newItem = await ProductService.create(itemUpdate);
    
        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

// To delete the product.
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id;
        const result = await ProductService.remove(id);
    
        // res.sendStatus(204);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed product with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove product with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Product with id ${id} does not exist`);
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

export {
    getAllProducts,
    getProductById,
    addNewProduct,
    editProduct,
    deleteProduct
}