import { Resolver, Query } from 'type-graphql';
import { Post } from '../../entity/Post';
import { getConnection } from 'typeorm';

@Resolver()
export default class Posts {
  @Query(() => [Post])
  async posts(): Promise<Post[] | []> {
    return getConnection()
      .getRepository(Post)
      .createQueryBuilder('p')
      .orderBy('created_at', 'DESC')
      .getMany();
    //  return Post.find();
  }
}
