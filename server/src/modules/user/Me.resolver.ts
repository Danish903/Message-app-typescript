import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import { getUserId } from '../post/CreatePost.resolver';

@Resolver(User)
class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    // console.log("UserId: ", !ctx.req.session!.userId);
    const userId = getUserId(ctx);
    if (!userId) {
      return undefined;
    }
    return User.findOne({ where: { id: userId } });
  }
}

export { MeResolver as default };
