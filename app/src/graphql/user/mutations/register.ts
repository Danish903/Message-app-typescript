import { gql } from "apollo-boost";

export const REGISTER_MUTATION = gql`
   mutation RegisterMutation($data: RegisterInput!) {
      register(data: $data) {
         id
         name
         bio
         email
      }
   }
`;
