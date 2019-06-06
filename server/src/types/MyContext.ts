import { Request, Response } from 'express';
import { createUserLoader } from '../utilities/usersLoader';
import { createPostsLoader } from '../utilities/postLoader';
import { createLikePostLoader } from 'src/utilities/likedUsersLoader';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  postLoader: ReturnType<typeof createPostsLoader>;
  likedUsersLoader: ReturnType<typeof createLikePostLoader>;
  pubSub: RedisPubSub;
}
