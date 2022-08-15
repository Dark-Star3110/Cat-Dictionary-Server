import { Request, Response, NextFunction } from 'express';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['token'];
  req.user = token;
  next();
}
