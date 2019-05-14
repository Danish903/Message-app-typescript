import {
   Resolver,
   Mutation,
   InputType,
   Field,
   Arg,
   Ctx,
   UseMiddleware
} from "type-graphql";
import shortid from "shortid";
import { GraphQLUpload } from "graphql-upload";
import { Stream } from "stream";
import { createWriteStream } from "fs";

import { Post } from "../../entity/Post";
import { Upload } from "../..//types/Upload";
import { MyContext } from "src/types/MyContext";
import { isAuth } from "../middleware/isAuth";

export const processFileUpload = async (
   filename: string,
   createReadStream: () => Stream
): Promise<{ id: string; path: string; imageName: string } | null> => {
   const id = shortid.generate();
   const imageName = `${id}-${filename}`;
   const path = __dirname + `/../../../images/${imageName}`;
   return new Promise(async (res, rej) =>
      createReadStream()
         .pipe(createWriteStream(path))
         .on("finish", () => res({ id, path, imageName }))
         .on("error", () => rej(null))
   );
};

@InputType()
export class PostInput {
   @Field()
   description: string;
   @Field({ nullable: true })
   photoUrl?: string;
   @Field(() => GraphQLUpload, { nullable: true })
   file: Upload;
}

@Resolver()
class CreatePost {
   @UseMiddleware(isAuth)
   @Mutation(() => Post)
   async createPost(
      @Arg("data") data: PostInput,
      @Ctx() ctx: MyContext
   ): Promise<Post | null> {
      const userId = ctx.req.session!.userId;

      const post = await Post.create({
         photoUrl: data.photoUrl,
         description: data.description,
         userId
      }).save();

      return post;
   }
}
export default CreatePost;
