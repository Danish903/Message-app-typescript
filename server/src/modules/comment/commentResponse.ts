import { ObjectType, Field } from 'type-graphql';
import { MutationType } from '../../types/MutationTypes';
import { Comment } from '../../entity/Comment';

@ObjectType()
export class CommentResponse {
  @Field({ nullable: true })
  node: Comment;
  @Field()
  mutation: MutationType;
}
