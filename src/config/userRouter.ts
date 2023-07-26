import express from "express";

import {
    login,
    register,
    getAllUsers
} from '../controllers/userController';

import { protect } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/allusers', protect, getAllUsers);

export {
    userRouter
}

