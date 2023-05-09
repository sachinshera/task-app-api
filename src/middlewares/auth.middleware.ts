import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { AuthService } from '@/services/auth.service';
const getAuthorization = (req) => {
  let authFromHeader = req.headers.authorization;
  let token = authFromHeader;
  return token;
}

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {

    const token = getAuthorization(req);
    if (!token) throw new HttpException(401, 'Authentication token missing');
    // get user by token from auth service
    const auth = new AuthService();
    const user = await auth.getUserByToken(token);
    if (!user) throw new HttpException(401, 'Authentication token missing');
    req.user = user;
    next();

  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
