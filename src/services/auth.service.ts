import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import {nanoid}  from 'nanoid';
import { loginDto } from '@/dtos/auth.dto';
import { AuthModel } from '@/models/auth.model';
const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
}

const createCookie = (tokenData: TokenData): string => {
  return tokenData.token;
}
@Service()
export class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.Users.create({ id:nanoid(20),...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: loginDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password not matching");

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);
   await this.storeAuthToken(findUser,tokenData.token);

    return { cookie, findUser };
  }

  public async logout(token:string): Promise<any> {
    //  delete token from db
    const deleteToken = await this.deleteAuthToken(token);
    return deleteToken;
  }

  // store auth token in db

  protected async storeAuthToken(userData: User, token: string): Promise<any> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    let expire_at = (Date.now() + 60 * 60 * 1000).toString();
    console.log(expire_at);
    
    const authToken = await AuthModel.create({id:nanoid(),user_id:findUser.id,token:token,expire_at:expire_at});
    return authToken;
  }

  // verify auth token in db

  public async verifyAuthToken(token: string): Promise<any> {
    const findToken: any = await AuthModel.findOne({ where: { token: token } });
    if (!findToken) throw new HttpException(409, "Token doesn't exist");
    return findToken;
  }

  // delete auth token in db

  protected async deleteAuthToken(token: string): Promise<any> {
    const findToken: any = await AuthModel.findOne({ where: { token: token } });
    if (!findToken) throw new HttpException(409, "Token doesn't exist");
    const deleteToken = await AuthModel.destroy({ where: { token: token } });
    return deleteToken;
  }

  // get user by token

  public async getUserByToken(token: string): Promise<any> {
    const findToken: any = await AuthModel.findOne({ where: { token: token } });
    if (!findToken) throw new HttpException(409, "Token doesn't exist");
    const findUser: User = await DB.Users.findOne({ where: { id: findToken.user_id } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser;
  }

}
