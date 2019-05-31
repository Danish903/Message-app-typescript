import { Resolver, UseMiddleware, Arg, Ctx, Mutation } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Post } from '../../entity/Post';
import { getUserId } from './CreatePost.resolver';
import { MyContext } from '../../types/MyContext';
import { PostLike } from '../../entity/PostLike';

@Resolver()
class LikePost {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async LikePost(
    @Arg('postId') postId: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const userId = getUserId(ctx);
    if (!userId) throw new Error('You are not authenticated');
    const post = await Post.findOne(postId);
    if (!post) throw new Error("Post doesn't exist");
    await PostLike.create({ userId, postId }).save();
    await Post.update(
      {
        id: postId
      },
      {
        likeCount: post.likeCount + 1
      }
    );
    return true;
  }
}
export default LikePost;
