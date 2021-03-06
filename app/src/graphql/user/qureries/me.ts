import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  query ME {
    me {
      id
      email
      bio
      name
      firstName
      lastName
      photo
      favoritePosts {
        id
      }
    }
  }
`;
