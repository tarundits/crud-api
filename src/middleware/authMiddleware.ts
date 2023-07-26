import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET as string;

// Define a custom interface to extend the Request interface
interface AuthenticatedRequest extends Request {
    user?: any; // Add the user property to the Request
}

// User must be authenticated.
const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;
  
    // Read JWT from the 'jwt' cookie
    token = req.headers["authorization"];
  
    if (token) {
      try {
        const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

        console.log('DEcoded', decoded);

        if(decoded.userId) {
            const authUser = await User.findById(decoded.userId).select('-password');
            console.log(authUser);
            req.user = authUser;
  
            next();
        } else {
            res.send(400).json({
                message: "Invalid Token"
            });
        }
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
};

export {
    protect
}