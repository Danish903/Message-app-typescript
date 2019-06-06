import { gql } from 'apollo-boost';

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: String!, $text: String!) {
    createComment(postId: $postId, text: $text)
  }
`;
