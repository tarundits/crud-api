import mongoose, { Document, Model } from 'mongoose';
import bcrypt from "bcrypt";

// Define a custom interface to extend the Document
interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  created: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Add the matchPassword method to the userSchema
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password || '');
};

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
