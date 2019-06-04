import { gql } from 'apollo-boost';

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($data: EditProfileInput!) {
    editProfile(data: $data) {
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
