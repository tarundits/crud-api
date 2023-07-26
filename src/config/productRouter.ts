import express from "express";

import { 
    getAllProducts,
    getProductById,
    addNewProduct,
    editProduct,
    deleteProduct
} from "../controllers/productController";

export const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", addNewProduct);
productRouter.put("/:id", editProduct);
productRouter.delete("/:id", deleteProduct);