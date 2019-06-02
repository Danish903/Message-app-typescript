import { Resolver, Query, Ctx } from 'type-graphql';
import { Activity } from '../../entity/Activity';
import { getUserId } from '../post/CreatePost.resolver';
import { MyContext } from '../../types/MyContext';

@Resolver()
export default class ActivityQuery {
  @Query(() => [Activity])
  async activities(@Ctx() ctx: MyContext): Promise<Activity[]> {
    const userId = getUserId(ctx);

    const activities = await Activity.find({
      where: { userId },
      relations: ['sender', 'post']
    });

    return activities;
  }
}
