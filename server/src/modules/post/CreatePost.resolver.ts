import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  Ctx,
  UseMiddleware
} from 'type-graphql';
import shortid from 'shortid';
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from 'stream';
import { createWriteStream } from 'fs';
import jwt from 'jsonwebtoken';

import { Post } from '../../entity/Post';
import { Upload } from '../..//types/Upload';
import { MyContext } from 'src/types/MyContext';
import { isAuth } from '../middleware/isAuth';
import { JWT_SECRET } from '../user/Login.resolver';
type decodedType = {
  userId: string;
};
export const getUserId = (context: MyContext): string | null => {
  const header = context.req.headers.authorization || '';
  //   console.log(header);
  if (!header) {
    throw new Error('You must be authenticated!');
  }
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as decodedType;
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
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
      .on('finish', () => res({ id, path, imageName }))
      .on('error', () => rej(null))
  );
};

@InputType()
export class PostInput {
  @Field()
  description: string;
  @Field()
  city: string;
  @Field({ nullable: true })
  photoUrl?: string;
  @Field(() => GraphQLUpload, { nullable: true })
  file: Upload;
}

@Resolver()
class CreatePost {
  @UseMiddleware(isAuth)
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg('data') data: PostInput,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    const userId = getUserId(ctx);
    if (!userId) throw new Error('You are not authenticated');
    const post = await Post.create({
      photoUrl: data.photoUrl,
      description: data.description,
      userId
    }).save();

    return post;
  }
}
export default CreatePost;
