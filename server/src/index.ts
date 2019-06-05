import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import http from 'http';

import { redis, pubSub } from './redis';
import { createSchema } from './utilities/createSchema';
import { createUserLoader } from './utilities/usersLoader';
import { createPostsLoader } from './utilities/postLoader';
import { createLikePostLoader } from './utilities/likedUsersLoader';

const PORT = process.env.PORT || 4000;

const main = async () => {
  await createConnection();
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
      userLoader: createUserLoader(),
      postLoader: createPostsLoader(),
      likedUsersLoader: createLikePostLoader(),
      pubSub
    })
  });

  const app = express();

  app.use('/images', express.static('images'));
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: 'http://127.0.0.1:19001'
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: `${process.env.REDIS_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  server.applyMiddleware({ app, cors: false });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${
        server.subscriptionsPath
      }`
    );
  });
};
main();
