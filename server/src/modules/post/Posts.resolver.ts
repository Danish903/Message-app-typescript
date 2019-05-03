import { Resolver, Query } from "type-graphql";
import { Post } from "../../entity/Post";

@Resolver()
export default class Posts {
   @Query(() => [Post])
   async posts(): Promise<Post[] | []> {
      return Post.find();
   }
}
