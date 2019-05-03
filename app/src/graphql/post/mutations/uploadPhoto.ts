import { gql } from "apollo-boost";

export const UPLOAD_PHOTO = gql`
   mutation UploadPhoto($file: Upload!) {
      uploadPhoto(file: $file)
   }
`;
