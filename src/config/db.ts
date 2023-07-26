// config/db.ts
import mongoose from 'mongoose';

import * as dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_CONN_STRING as string;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e: any) {
        console.log(`Error: ${e.message}`);
        process.exit(1);
    }
}

export default connectDB;