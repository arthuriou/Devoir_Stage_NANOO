import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtutils';
import { HTTP_STATUS } from '../utils/error_message';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Token invalide ou expiré' });
  }

  (req as any).user = decoded; 
  next();
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Token invalide ou expiré' });
  }

  (req as any).user = decoded; 
  next();
};

