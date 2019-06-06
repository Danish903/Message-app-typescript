import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';

import cors from 'cors';
import http from 'http';
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
      likedUsersLoader: createLikePostLoader()
    })
  });

  const app = express();

  app.use('/images', express.static('images'));
  //   const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: 'http://127.0.0.1:19001'
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
