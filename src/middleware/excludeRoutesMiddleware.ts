import { Request, Response, NextFunction } from 'express';
import { protect } from './authMiddleware';

const excludedRoutes = ['/login', '/register'];

const excludeRoutesMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (excludedRoutes.includes(req.path)) {
    // If the current path is in the excludedRoutes array, skip the protect middleware and proceed to the next route handler.
    return next();
  }
  return protect(req, res, next);
};

export {
	excludeRoutesMiddleware
}