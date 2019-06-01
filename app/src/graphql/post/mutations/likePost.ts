import { gql } from 'apollo-boost';

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId)
  }
`;

// mutation {
//    LikePost(postId: "dfbfc61c-0c25-45bc-b914-c4b9d174e2be")
//  }
