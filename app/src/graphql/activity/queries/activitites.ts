import { gql } from 'apollo-boost';
export const ACTIVITIETS_QUERY = gql`
  query AcitivityQuery {
    activities {
      id
      type
      post {
        id
        photoUrl
      }
      sender {
        id
        name
      }
      created_at
    }
  }
`;
