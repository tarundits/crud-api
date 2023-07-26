import { Response } from "express";
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET as string;

const generateToken = (res: Response, userId: string) => {
    const token = jwt.sign({ userId }, jwt_secret, {
      expiresIn: '30d',
    });
  
    // Set JWT as an HTTP-Only cookie
    /*
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    */

    return token;
};

export  {
    generateToken
}