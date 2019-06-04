import {
  InputType,
  Field,
  UseMiddleware,
  Arg,
  Ctx,
  Resolver,
  Mutation
} from 'type-graphql';
import { Upload } from '../../types/Upload';
import { GraphQLUpload } from 'graphql-upload';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../../types/MyContext';
import { getUserId, processFileUpload } from '../post/CreatePost.resolver';
import { User } from '../../entity/User';

@InputType()
export class EditProfileInput {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  bio: string;
  @Field(() => GraphQLUpload, { nullable: true })
  profilePicture?: Upload;

  photo?: string;
}

@Resolver()
class EditProfile {
  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async editProfile(
    @Arg('data') data: EditProfileInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const userId = getUserId(ctx);

    if (!userId) throw new Error('You are not authenticated to edit profile!');
    let photo = undefined;
    if (data.profilePicture) {
      const { createReadStream, filename } = await data.profilePicture;

      const response = await processFileUpload(filename, createReadStream);
      photo = `http://localhost:4000/images/${response!.imageName}`;
      data.photo = photo;
    }
    delete data.profilePicture;

    await User.update({ id: userId }, { ...data });
    const user = await User.findOne(userId);
    if (!user) throw new Error('user not found');
    return user;
  }
}

export default EditProfile;
