import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { loginDto } from '@/dtos/auth.dto';
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when  prototyping or testing an API.
*/
export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // @ts-ignore
    // @ts-expect-error
    this.router.post('/signup', ValidationMiddleware(CreateUserDto, 'body'), this.auth.signUp);
    // @ts-ignore
    this.router.post('/login', ValidationMiddleware(loginDto,'body'), this.auth.logIn);
    this.router.post('/logout', AuthMiddleware, this.auth.logOut);

    // veryfy token

    this.router.get('/verify', AuthMiddleware, this.auth.verifyToken);
  }
}
