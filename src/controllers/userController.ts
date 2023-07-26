import express, { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { responseInterceptor } from "../utils/responseInterceptor";
import { generateToken } from "../utils/generateToken";

dotenv.config();

interface myRequest{
    name: string;
    email: string;
    password: string;
}

const jwt_str = process.env.JWT_SECRET as string;

const register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      // Check if the email is already registered in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // If the email already exists, return a 400 Bad Request response.
        return responseInterceptor(res, 400, { message: "Duplicate email. Please enter another one." });
      }
  
      const newUser = new User({ name, email, password: bcrypt.hashSync(password, 10) });
      await newUser.save();
  
      if (newUser) {
        generateToken(res, newUser._id);
        return responseInterceptor(res, 200, { newUser });
      } else {
        return responseInterceptor(res, 500, { message: "Error in saving the user." });
      }
    } catch (error: any) {
      return responseInterceptor(res, 500, {}, error.message);
    }
  };
  

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(user && await user.matchPassword(password)) {
            let jwt_token = generateToken(res, user._id);

            return responseInterceptor(res, 200, {
                _id: user._id,
                email: user.email,
                name: user.name,
                token: jwt_token
            });

        } else {
            let error_message = {
                message: "Authentication failed. Invalid user or password."
            }

            return responseInterceptor(res, 500, error_message);
        }

    } catch (error: any) {
        return responseInterceptor(res, 500, error.message);
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});

        if (users.length === 0) {
            return responseInterceptor(res, 404, { message: 'No records found.' });
        }

        return responseInterceptor(res, 200, { users });
    } catch (error: any) {
        return responseInterceptor(res, 500, error.message);
    }
}

export {
    register,
    login,
    getAllUsers
}