import mongoose, { Document, Model } from 'mongoose';
import { nanoid } from 'nanoid';

interface ProductDocument extends Document {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const productSchema = new mongoose.Schema<ProductDocument>({
    _id: {
      type: String,
      default: () => nanoid(), 
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      trim: true,
      required: true
    },
    description: {
      type: String
    },
    image: {
      type: String,
    }
});

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;