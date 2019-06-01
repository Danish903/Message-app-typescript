import { gql } from 'apollo-boost';

export const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      id
      description
      photoUrl
      city
      created_at
      updated_at
      owner {
        id
        firstName
        email
      }
      likedUsers {
        id
      }
    }
  }
`;
