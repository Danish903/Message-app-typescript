import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
class GetUser {
   @Query(() => User, { nullable: true })
   async getUser(@Arg("userId") userId: string): Promise<User | null> {
      const user = await User.findOne(userId);
      if (!user) return null;
      return user;
   }
}
export default GetUser;
