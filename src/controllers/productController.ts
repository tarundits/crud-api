import express, { Request, Response } from "express";
import * as ProductService from "../services/productService";
import { BaseProduct, Product } from "../interfaces/product.interface";

// To fetch all the products.
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const items: Product[] = await ProductService.findAll();
    
        res.status(200).send(items);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

// To get the product details by id.
const getProductById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
        const item: Product = await ProductService.find(id);
  
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
    const id: number = parseInt(req.params.id, 10);
  
    try {
        const itemUpdate: Product = req.body;
    
        const existingItem: Product = await ProductService.find(id);
    
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
        const id: number = parseInt(req.params.id, 10);
        await ProductService.remove(id);
    
        res.sendStatus(204);
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