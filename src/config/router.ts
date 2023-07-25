import express from "express";

import { 
    getAllProducts,
    getProductById,
    addNewProduct,
    editProduct,
    deleteProduct
} from "../controllers/productController";

export const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", addNewProduct);
productsRouter.put("/:id", editProduct);
productsRouter.delete("/:id", deleteProduct);