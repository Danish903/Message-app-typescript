import {
  Resolver,
  Mutation,
  //   UseMiddleware,
  Arg,
  Ctx,
  Query,
  Subscription,
  Root,
  ResolverFilterData,
  Args,
  PubSub,
  Publisher
} from 'type-graphql';
// import { isAuth } from '../middleware/isAuth';
import { getUserId } from '../post/CreatePost.resolver';
import { MyContext } from '../../types/MyContext';
import { Post } from '../../entity/Post';
import { Comment } from '../../entity/Comment';
import { NewCommentPayload } from './newComment.interface';
import { MutationType } from '../../types/MutationTypes';
import { CommentResponse } from './commentResponse';
import { NewCommentsArgs } from './comment.resolver.args';

const NEW_COMMENT = 'NEW_COMMENT';

@Resolver()
export class CommentResolver {
  @Mutation(() => Boolean)
  async createComment(
    @Arg('postId') postId: string,
    @Arg('text') text: string,
    @Ctx() ctx: MyContext,
    @PubSub(NEW_COMMENT) notifyAboutNewComment: Publisher<NewCommentPayload>
  ): Promise<Boolean> {
    const userId = getUserId(ctx);
    if (!userId) throw new Error('You are not authenticated');
    const post = await Post.findOne({ id: postId });

    if (!post) throw new Error("Post don't exists to comment!");
    const node = await Comment.create({ text, postId, userId }).save();

    await notifyAboutNewComment({
      node,
      mutation: MutationType.CREATED
    });
    return true;
  }

  // read
  @Query(() => [Comment])
  async getComments(@Arg('postId') postId: string): Promise<Comment[]> {
    const post = await Post.findOne({ id: postId });
    if (!post) throw new Error('Post not found ');
    return Comment.find({ where: { postId } });
  }

  @Subscription(() => CommentResponse, {
    topics: NEW_COMMENT,
    filter: ({
      payload,
      args
    }: ResolverFilterData<NewCommentPayload, NewCommentsArgs>) =>
      payload.node.postId === args.postId
  })
  async newCommentNotification(
    @Root() comment: NewCommentPayload,
    //@ts-ignore
    @Args() { postId }: NewCommentsArgs
  ): Promise<NewCommentPayload> {
    console.log(comment);
    return comment;
  }
}

export default CommentResolver;
