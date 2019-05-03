import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { processFileUpload } from "./CreatePost.resolver";

@Resolver()
export class UploadPhotoResolver {
   @Mutation(() => String)
   async uploadPhoto(@Arg("file", () => GraphQLUpload)
   {
      createReadStream,
      filename
   }: Upload): Promise<string> {
      const response = await processFileUpload(filename, createReadStream);
      return `http://localhost:4000/images/${response!.imageName}`;
   }
}
