import { gql } from "apollo-boost";

export const CREATE_POST_MUTATION = gql`
   mutation CreatePost($data: PostInput!) {
      createPost(data: $data) {
         description
         photoUrl
         created_at
         updated_at
         owner {
            id
            email
            name
         }
      }
   }
`;
