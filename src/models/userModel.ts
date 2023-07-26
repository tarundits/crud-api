import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import moment from 'moment';

// Define a custom interface to extend the Document
interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: number;
  updatedAt?: number;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
  _id: {
    type: String,
    default: () => nanoid(), 
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  // created: {
  //   type: Number, // Use the Number type to store Unix timestamps.
  //   default: () => moment().unix(), // Set the default value to the current Unix timestamp.
  // },
},
{
  timestamps: true,
});

// Pre-save hook to set createdAt and updatedAt to Unix epoch time
userSchema.pre<UserDocument>('save', function (next) {
  const now = moment().unix();
  console.log(now);
  if (!this.createdAt) {
    this.createdAt = now;
  }
  //this.updatedAt = now;
  next();
});

// Pre-update hook to set updatedAt to Unix epoch time
// userSchema.pre<UserDocument>('updateOne', function (next) {
//   const now = moment().unix();
//   if (!this.updatedAt) {
//     this.updatedAt = now;
//   }
//   this.updatedAt = now;
//   next();
// });

// Add the matchPassword method to the userSchema
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password || '');
};

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
