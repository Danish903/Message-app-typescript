import { Comment } from '../../entity/Comment';

import { MutationType } from '../../types/MutationTypes';

export interface NewCommentPayload {
  node: Comment;
  mutation: MutationType;
}
