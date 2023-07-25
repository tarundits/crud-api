/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { productsRouter } from "./config/router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { getClient } from "./config/db";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/catalog/product", productsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

async function main() {
    try {
      const db = await getClient();
      console.log('Connected to MongoDB!');
      // Your MongoDB-related code here
      // For example, you can fetch data, insert documents, etc.
    } catch (err) {
      console.error('Error:', err);
    }
}

main();

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});