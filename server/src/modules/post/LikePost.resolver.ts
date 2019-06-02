import { Resolver, UseMiddleware, Arg, Ctx, Mutation } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Post } from '../../entity/Post';
import { getUserId } from './CreatePost.resolver';
import { MyContext } from '../../types/MyContext';
import { PostLike } from '../../entity/PostLike';
import { Activity } from '../../entity/Activity';

@Resolver()
class LikePost {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async likePost(
    @Arg('postId') postId: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const userId = getUserId(ctx);
    if (!userId) throw new Error('You are not authenticated');
    const post = await Post.findOne(postId);
    if (!post) throw new Error("Post doesn't exist");

    const postIsAlreadyLiked = await PostLike.find({ userId, postId });
    if (postIsAlreadyLiked.length > 0) {
      // unlike the post
      await PostLike.delete({ userId, postId });
      await Post.update(
        {
          id: postId
        },
        {
          likeCount: post.likeCount - 1
        }
      );

      await Activity.create({
        userId: post.userId,
        senderId: userId,
        type: 'UnLike',
        postId: post.id
      }).save();
    } else {
      // like the post
      await PostLike.create({ userId, postId }).save();
      await Post.update(
        {
          id: postId
        },
        {
          likeCount: post.likeCount + 1
        }
      );

      await Activity.create({
        userId: post.userId,
        senderId: userId,
        type: 'Like',
        postId: post.id
      }).save();
    }

    return true;
  }
}
export default LikePost;
