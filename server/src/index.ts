import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";
import { createSchema } from "./utilities/createSchema";
import { createUserLoader } from "./utilities/usersLoader";

const main = async () => {
   await createConnection();

   const schema = await createSchema();

   const server = new ApolloServer({
      schema,
      context: ({ req, res }: any) => ({
         req,
         res,
         userLoader: createUserLoader()
      })
   });

   const app = express();

   app.use("/images", express.static("images"));
   const RedisStore = connectRedis(session);
   app.use(
      cors({
         credentials: true,
         origin: "http://localhost:3000"
      })
   );

   app.use(
      session({
         store: new RedisStore({
            client: redis as any
         }),
         name: "qid",
         secret: `${process.env.REDIS_SECRET}`,
         resave: false,
         saveUninitialized: false,
         cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
         }
      })
   );

   server.applyMiddleware({ app, cors: false });

   app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
         `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
   );
};
main();
