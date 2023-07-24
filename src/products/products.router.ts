/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ProductService from "./products.service";
import { BaseProduct, Product } from "./product.interface";

/**
 * Router Definition
 */
export const productsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET products
productsRouter.get("/", async (req: Request, res: Response) => {
    try {
      const items: Product[] = await ProductService.findAll();
  
      res.status(200).send(items);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// GET products/:id
productsRouter.get("/:id", async (req: Request, res: Response) => {
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
});

// POST products
productsRouter.post("/", async (req: Request, res: Response) => {
    try {
      const item: BaseProduct = req.body;
  
      const newItem = await ProductService.create(item);
  
      res.status(201).json(newItem);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// PUT products/:id
productsRouter.put("/:id", async (req: Request, res: Response) => {
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
});

// DELETE products/:id
productsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await ProductService.remove(id);
  
      res.sendStatus(204);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});