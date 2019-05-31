import { Request, Response } from 'express';
import { createUserLoader } from '../utilities/usersLoader';
import { createPostsLoader } from '../utilities/postLoader';

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  postLoader: ReturnType<typeof createPostsLoader>;
}
