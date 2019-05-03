import { ApolloClient } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
   link: createUploadLink({ uri: "http://localhost:4000/graphql" }),
   cache: new InMemoryCache()
});

export default client;
