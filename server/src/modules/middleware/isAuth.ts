import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { MyContext } from '../../types/MyContext';
import { JWT_SECRET } from '../user/Login.resolver';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const header = context.req.headers.authorization || '';
  //   console.log(header);
  if (!header) {
    throw new Error('You must be authenticated!');
  }
  const token = header.replace('Bearer ', '');
  try {
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    throw new Error(error);
  }

  // throw new Error("You must be authenticated!");
};
